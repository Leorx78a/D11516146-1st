#!/usr/bin/env node
/**
 * 匯出工作坊完成登記
 *
 * 讀取本 repo 中帶有 `completion` label 的 issue(由完成登記表產生),
 * 解析成結構化資料,並且:
 *   1. 產出 out/completions.csv  —— 每位學員一列,可直接用 Excel 開
 *   2. 產出 out/SHOWCASE.md      —— 學員成果牆(僅限勾選公開展示授權者)
 *   3. 在終端機印出統計:認證人數、通關漏斗、逐題答對率、卡關排行、滿意度
 *
 * 需求:GitHub CLI(gh)已安裝並登入。
 *
 * 用法:
 *   node scripts/export-completions.mjs
 *   node scripts/export-completions.mjs --label 2026-09-15
 *   node scripts/export-completions.mjs --repo owner/name
 *   node scripts/export-completions.mjs --no-enrich      # 跳過抓取學員 repo 狀態(快很多)
 *   node scripts/export-completions.mjs --from-json dump.json --no-enrich   # 離線模式
 */

import { execFileSync } from 'node:child_process';
import { mkdirSync, writeFileSync, readFileSync } from 'node:fs';

// ---------- 參數 ----------
const argv = process.argv.slice(2);
const argOf = (name, fallback = null) => {
  const i = argv.indexOf(name);
  return i >= 0 && argv[i + 1] ? argv[i + 1] : fallback;
};
const extraLabel = argOf('--label');
const repoArg = argOf('--repo');
const enrich = !argv.includes('--no-enrich');
const fromJson = argOf('--from-json');

// ---------- gh 小工具 ----------
function gh(args) {
  return execFileSync('gh', args, { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
}

function ghJson(args) {
  return JSON.parse(gh(args));
}

function ghApiSafe(path) {
  try {
    return ghJson(['api', path]);
  } catch {
    return null;
  }
}

// ---------- 正確答案 ----------
const ANSWER_KEY = { q1: 'C', q2: 'B', q3: 'A', q4: 'B', q5: 'D' };

// 登記表的欄位標題 -> 內部欄位名
const FIELD_MAP = {
  '姓名或暱稱': 'name',
  '你的 GitHub 帳號': 'githubHandle',
  '單位 / 部門': 'orgUnit',
  '你的角色': 'role',
  '你的程式經驗': 'experience',
  '你的作品 repo 網址': 'repoUrl',
  'GitHub Pages 作品網址': 'pagesUrl',
  '你完成到第幾關?': 'completedStep',
  'Q1. Agent Mode 與 Ask / Plan 模式最大的差別是什麼?': 'q1',
  'Q2. 關於 MCP,下列敘述何者正確?': 'q2',
  'Q3. Agent 改壞了程式且尚未 commit,最快的還原方式是?': 'q3',
  'Q4. 下列哪一項最能描述 Agentic Workflow?': 'q4',
  'Q5. 使用 Copilot 免費版做這類實作,何者最合適?': 'q5',
  '你今天用的 Copilot 方案': 'copilotPlan',
  '額度夠用嗎?': 'quotaStatus',
  '你在哪些地方卡住過?(可複選,沒卡住就跳過)': 'stuckPoints',
  '這堂課對你的實際幫助?': 'helpfulness',
  '你會推薦同事來上這堂課嗎?': 'recommend',
  '心得或建議': 'feedback',
  '徽章發放': 'badgeConsent',
  '成果公開展示(選填)': 'showcaseConsent',
};

/** 把 issue form 產生的 markdown 內文拆成 { 欄位標題: 值 } */
function parseIssueBody(body) {
  const out = {};
  if (!body) return out;

  // issue form 會把每個欄位輸出成 "### 標題\n\n值"
  const blocks = body.split(/^### /m).slice(1);
  for (const block of blocks) {
    const newline = block.indexOf('\n');
    if (newline < 0) continue;
    const label = block.slice(0, newline).trim();
    const value = block.slice(newline + 1).trim();
    out[label] = value === '_No response_' ? '' : value;
  }
  return out;
}

/** 從下拉選項的完整文字取出開頭的選項代號(A/B/C/D) */
const optionLetter = (value) => {
  const m = /^([A-D])[.、]/.exec((value || '').trim());
  return m ? m[1] : '';
};

/** 從 "5 — 非常有幫助..." 取出數字 */
const leadingNumber = (value) => {
  const m = /^(\d+)/.exec((value || '').trim());
  return m ? Number(m[1]) : null;
};

/** 勾選型欄位:回傳被勾起來的項目文字陣列 */
const checkedItems = (value) =>
  (value || '')
    .split('\n')
    .filter((line) => /^\s*-\s*\[x\]/i.test(line))
    .map((line) => line.replace(/^\s*-\s*\[x\]\s*/i, '').trim());

/** 從 repo 網址取出 owner/name */
function parseRepoUrl(url) {
  const m = /github\.com\/([^/\s]+)\/([^/\s#?]+)/i.exec(url || '');
  if (!m) return null;
  return { owner: m[1], name: m[2].replace(/\.git$/, '') };
}

// ---------- 讀取 issue ----------
const repoFlag = repoArg ? ['--repo', repoArg] : [];
const labels = extraLabel ? `completion,${extraLabel}` : 'completion';

console.log(fromJson ? `離線模式:讀取 ${fromJson}` : `讀取 label 為 "${labels}" 的 issue...`);

let issues;
if (fromJson) {
  // 離線模式:直接吃 `gh issue list --json ...` 匯出的檔案(也方便測試解析邏輯)
  issues = JSON.parse(readFileSync(fromJson, 'utf8'));
} else {
  try {
    issues = ghJson([
      'issue', 'list',
      ...repoFlag,
      '--label', labels,
      '--state', 'all',
      '--limit', '1000',
      '--json', 'number,title,body,author,createdAt,url,labels',
    ]);
  } catch (error) {
    console.error('\n❌ 無法讀取 issue。請確認:');
    console.error('   1. 已安裝 GitHub CLI 並執行過 gh auth login');
    console.error('   2. 目前目錄是該 repo,或用 --repo owner/name 指定');
    console.error('   3. 該 repo 的 Issues 功能已開啟\n');
    process.exit(1);
  }
}

if (issues.length === 0) {
  console.log('沒有找到任何完成登記。');
  process.exit(0);
}

console.log(`找到 ${issues.length} 筆登記,解析中...`);

// ---------- 解析 ----------
const records = issues.map((issue) => {
  const fields = parseIssueBody(issue.body);
  const rec = {
    issueNumber: issue.number,
    issueUrl: issue.url,
    submittedBy: issue.author?.login || '',
    submittedAt: issue.createdAt,
  };

  for (const [label, key] of Object.entries(FIELD_MAP)) {
    rec[key] = fields[label] ?? '';
  }

  // 測驗計分
  let correct = 0;
  for (const q of ['q1', 'q2', 'q3', 'q4', 'q5']) {
    const letter = optionLetter(rec[q]);
    rec[`${q}Answer`] = letter;
    rec[`${q}Correct`] = letter === ANSWER_KEY[q];
    if (rec[`${q}Correct`]) correct++;
  }
  rec.quizScore = correct;

  rec.helpfulnessScore = leadingNumber(rec.helpfulness);
  rec.stuckList = checkedItems(rec.stuckPoints);
  rec.badgeConsentGiven = checkedItems(rec.badgeConsent).length > 0;
  rec.showcaseConsentGiven = checkedItems(rec.showcaseConsent).length > 0;
  rec.finishedAll = rec.completedStep.startsWith('Step 5');

  return rec;
});

// ---------- 抓取學員 repo 客觀狀態 ----------
if (enrich) {
  console.log('抓取每位學員 repo 的公開狀態(--no-enrich 可跳過)...');
  for (const rec of records) {
    const parsed = parseRepoUrl(rec.repoUrl);
    if (!parsed) continue;
    const slug = `${parsed.owner}/${parsed.name}`;

    const info = ghApiSafe(`repos/${slug}`);
    if (!info) {
      rec.repoStatus = '無法存取(可能是私有或網址有誤)';
      continue;
    }

    rec.repoStatus = info.private ? '私有' : '公開';
    rec.repoIsPublic = !info.private;
    rec.defaultBranch = info.default_branch;

    const pulls = ghApiSafe(`repos/${slug}/pulls?state=closed&per_page=100`) || [];
    const mergedToDefault = pulls.filter(
      (pr) => pr.merged_at && pr.base?.ref === info.default_branch
    );
    rec.mergedPrCount = mergedToDefault.length;

    // 徽章條件(只有公開 repo 才算)
    rec.yoloEligible = rec.repoIsPublic && mergedToDefault.length >= 1;
    rec.pullSharkEligible = rec.repoIsPublic && mergedToDefault.length >= 2;

    const pages = ghApiSafe(`repos/${slug}/pages`);
    rec.pagesEnabled = Boolean(pages);
    rec.pagesLive = pages?.html_url || '';

    // 用 commit 時間戳推算實際耗時
    const commits = ghApiSafe(`repos/${slug}/commits?per_page=100`) || [];
    const times = commits
      .map((c) => c.commit?.author?.date)
      .filter(Boolean)
      .map((d) => new Date(d).getTime())
      .sort((a, b) => a - b);
    if (times.length >= 2) {
      rec.elapsedMinutes = Math.round((times[times.length - 1] - times[0]) / 60000);
      rec.commitCount = commits.length;
    }
  }
}

// ---------- 輸出 CSV ----------
mkdirSync('out', { recursive: true });

const CSV_COLUMNS = [
  ['issueNumber', 'issue 編號'],
  ['name', '姓名/暱稱'],
  ['githubHandle', 'GitHub 帳號'],
  ['orgUnit', '單位/部門'],
  ['role', '角色'],
  ['experience', '程式經驗'],
  ['completedStep', '完成到第幾關'],
  ['finishedAll', '全部完成'],
  ['repoUrl', '作品 repo'],
  ['repoStatus', 'repo 狀態'],
  ['pagesUrl', 'Pages 網址(自填)'],
  ['pagesLive', 'Pages 網址(實測)'],
  ['pagesEnabled', 'Pages 已啟用'],
  ['mergedPrCount', '已合併 PR 數'],
  ['yoloEligible', 'YOLO 達成'],
  ['pullSharkEligible', 'Pull Shark 達成'],
  ['commitCount', 'commit 數'],
  ['elapsedMinutes', '實際耗時(分)'],
  ['quizScore', '測驗答對數'],
  ['q1Answer', 'Q1'],
  ['q1Correct', 'Q1 正確'],
  ['q2Answer', 'Q2'],
  ['q2Correct', 'Q2 正確'],
  ['q3Answer', 'Q3'],
  ['q3Correct', 'Q3 正確'],
  ['q4Answer', 'Q4'],
  ['q4Correct', 'Q4 正確'],
  ['q5Answer', 'Q5'],
  ['q5Correct', 'Q5 正確'],
  ['copilotPlan', 'Copilot 方案'],
  ['quotaStatus', '額度狀況'],
  ['helpfulnessScore', '幫助程度'],
  ['recommend', '推薦意願'],
  ['stuckJoined', '卡關點'],
  ['feedback', '心得建議'],
  ['badgeConsentGiven', '同意發徽章'],
  ['showcaseConsentGiven', '同意公開展示'],
  ['submittedAt', '登記時間'],
];

const csvCell = (value) => {
  if (value === null || value === undefined) return '';
  const text = String(value).replace(/\r?\n/g, ' ');
  return /[",]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
};

const csvLines = [CSV_COLUMNS.map(([, header]) => header).join(',')];
for (const rec of records) {
  rec.stuckJoined = rec.stuckList.join(' / ');
  csvLines.push(CSV_COLUMNS.map(([key]) => csvCell(rec[key])).join(','));
}
// 加上 BOM,Excel 開啟中文才不會亂碼
writeFileSync('out/completions.csv', '﻿' + csvLines.join('\n') + '\n');

// ---------- 輸出成果牆 ----------
const showcase = records.filter((r) => r.showcaseConsentGiven);
const showcaseLines = [
  '# 🌐 學員成果牆',
  '',
  `本頁收錄 **${showcase.length}** 位學員的作品(僅列出同意公開展示者)。`,
  '',
  '| 學員 | 作品 | 線上展示 |',
  '| :--- | :--- | :--- |',
];
for (const r of showcase) {
  const who = r.githubHandle ? `${r.name} ([@${r.githubHandle}](https://github.com/${r.githubHandle}))` : r.name;
  const repo = r.repoUrl ? `[原始碼](${r.repoUrl})` : '—';
  const live = r.pagesLive || r.pagesUrl;
  showcaseLines.push(`| ${who} | ${repo} | ${live ? `[開啟作品](${live})` : '—'} |`);
}
showcaseLines.push('', `_最後更新:${new Date().toISOString().slice(0, 10)}_`, '');
writeFileSync('out/SHOWCASE.md', showcaseLines.join('\n'));

// ---------- 統計 ----------
const pct = (n, total) => (total ? `${Math.round((n / total) * 100)}%` : '—');
const count = (fn) => records.filter(fn).length;
const total = records.length;

const line = (label, value) => console.log('  ' + label.padEnd(26, ' ') + value);

console.log('\n' + '='.repeat(56));
console.log('  工作坊完成登記統計');
console.log('='.repeat(56));

console.log('\n【認證】');
line('登記總人數', String(total));
line('完成全部五關', `${count((r) => r.finishedAll)} (${pct(count((r) => r.finishedAll), total)})`);
line('同意發放徽章', `${count((r) => r.badgeConsentGiven)}  ← 預期認證人數`);
line('同意公開展示', String(count((r) => r.showcaseConsentGiven)));

console.log('\n【通關漏斗】');
for (const step of ['Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5']) {
  const reached = count((r) => {
    const m = /Step (\d)/.exec(r.completedStep);
    return m && Number(m[1]) >= Number(step.slice(-1));
  });
  const bar = '█'.repeat(Math.round((reached / Math.max(total, 1)) * 24));
  line(`抵達 ${step}`, `${String(reached).padStart(3)} ${bar} ${pct(reached, total)}`);
}

console.log('\n【五題測驗逐題答對率】');
for (const q of ['q1', 'q2', 'q3', 'q4', 'q5']) {
  const ok = count((r) => r[`${q}Correct`]);
  const bar = '█'.repeat(Math.round((ok / Math.max(total, 1)) * 24));
  line(`${q.toUpperCase()} (正解 ${ANSWER_KEY[q]})`, `${String(ok).padStart(3)} ${bar} ${pct(ok, total)}`);
}
const avgScore = total ? (records.reduce((sum, r) => sum + r.quizScore, 0) / total).toFixed(2) : '—';
line('平均答對題數', `${avgScore} / 5`);

if (enrich) {
  console.log('\n【徽章達成】');
  line('repo 為公開', String(count((r) => r.repoIsPublic)));
  line('YOLO 條件達成', `${count((r) => r.yoloEligible)} (${pct(count((r) => r.yoloEligible), total)})`);
  line('Pull Shark 條件達成', `${count((r) => r.pullSharkEligible)} (${pct(count((r) => r.pullSharkEligible), total)})`);
  line('Pages 已啟用', `${count((r) => r.pagesEnabled)} (${pct(count((r) => r.pagesEnabled), total)})`);

  const elapsed = records.map((r) => r.elapsedMinutes).filter((v) => typeof v === 'number').sort((a, b) => a - b);
  if (elapsed.length) {
    line('實際耗時中位數', `${elapsed[Math.floor(elapsed.length / 2)]} 分鐘`);
  }
}

console.log('\n【Copilot 額度】');
const quotaGroups = {};
for (const r of records) {
  if (!r.quotaStatus) continue;
  quotaGroups[r.quotaStatus] = (quotaGroups[r.quotaStatus] || 0) + 1;
}
for (const [status, n] of Object.entries(quotaGroups).sort((a, b) => b[1] - a[1])) {
  line(status, `${n} (${pct(n, total)})`);
}

console.log('\n【卡關點排行】');
const stuckCounts = {};
for (const r of records) {
  for (const point of r.stuckList) stuckCounts[point] = (stuckCounts[point] || 0) + 1;
}
const stuckRanked = Object.entries(stuckCounts).sort((a, b) => b[1] - a[1]);
if (stuckRanked.length === 0) {
  console.log('  (沒有人回報卡關)');
} else {
  for (const [point, n] of stuckRanked.slice(0, 8)) {
    line(point.slice(0, 24), `${n} (${pct(n, total)})`);
  }
}

console.log('\n【滿意度】');
const helpScores = records.map((r) => r.helpfulnessScore).filter((v) => typeof v === 'number');
if (helpScores.length) {
  const avg = (helpScores.reduce((a, b) => a + b, 0) / helpScores.length).toFixed(2);
  line('幫助程度平均', `${avg} / 5`);
  line('給 4 分以上', `${helpScores.filter((v) => v >= 4).length} (${pct(helpScores.filter((v) => v >= 4).length, helpScores.length)})`);
}
const willRecommend = count((r) => r.recommend.startsWith('一定會') || r.recommend.startsWith('可能會'));
line('願意推薦同事', `${willRecommend} (${pct(willRecommend, total)})`);

console.log('\n' + '='.repeat(56));
console.log('  已輸出:');
console.log('    out/completions.csv   (可直接用 Excel 開)');
console.log('    out/SHOWCASE.md       (學員成果牆)');
console.log('='.repeat(56) + '\n');
