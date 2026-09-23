# 🆘 疑難排解

> 現場最常出問題的前三名:**push 被拒絕**、**issue 沒出現**、**關卡沒推進**。都在這裡。

---

## Issue 沒有自動出現

從 template 建立 repo 之後,等了兩分鐘還是沒看到 `Exercise: ...` 的 issue。

### 依序檢查

**1. Actions 有被啟用嗎?**

到你的 repo → **Actions** 頁籤。如果看到「Workflows aren't being run on this forked repository」或要你確認的按鈕,**點下去啟用**。

**2. Actions 有跑但失敗了?**

Actions 頁籤 → 看 **Step 0** 的執行紀錄。點進去看紅色的步驟是什麼錯誤。

**3. 手動觸發一次**

Actions 頁籤 → 左側選 **Step 0** → 右側 **Run workflow** → 分支選 `main` → **Run workflow**。

**4. repo 是用「Use this template」建的嗎?**

如果你是用 **Fork** 或手動 `git clone` 再 push 到新 repo,自動化可能不會啟動。請回到 template repo,用綠色的 **Use this template** 按鈕重建。

---

## `git push` 被拒絕

```
! [rejected]        main -> main (fetch first)
error: failed to push some refs
```

**原因**:機器人自動 commit 了東西回 `main`,你本機落後了。

**解法**:

```bash
git pull --rebase
git push
```

> 💡 這就是為什麼每一關的推關指令都包含 `git pull --rebase`。

---

## rebase 衝突

執行 `git pull --rebase` 之後出現:

```
CONFLICT (content): Merge conflict in README.md
```

**幾乎都是 `README.md` 衝突** —— 因為機器人會改寫它。

**最簡單的解法(接受機器人的版本)**:

```bash
git checkout --theirs README.md
git add README.md
git rebase --continue
git push
```

**如果是其他檔案衝突**,或你搞不清楚狀況:

```bash
git rebase --abort
```

這會回到 rebase 之前的狀態,什麼都沒變。然後改用:

```bash
git pull --no-rebase        # 用 merge 的方式合併
git push
```

---

## 關卡沒有推進(push 了但機器人沒反應)

### 1. 先確認你 push 的檔案對不對

每一關是靠**特定檔案的變更**觸發的:

| 關卡 | 觸發檔案 |
| :--- | :--- |
| Step 1 | 根目錄的 `index.html` / `styles.css` / `app.js` |
| Step 2 | 根目錄的 `CHANGELOG.md` |
| Step 3 | `.vscode/mcp.json` |
| Step 4 | `.github/copilot-instructions.md` 或 `.github/prompts/**` |

> ⚠️ **常見錯誤**:檔案建在子資料夾裡(例如 `src/index.html`)。必須在**專案根目錄**。
> 用 `git show --stat HEAD` 確認你剛剛 push 了哪些檔案。

### 2. 確認你 push 到 `main` 分支

```bash
git branch --show-current
```

如果不是 `main`(例如停在 `fix/issue-3`),先切回去:

```bash
git switch main
```

### 3. <a id="手動跳關"></a>手動跳關(現場救急,兩分鐘解決)

**別在同一關卡超過 5 分鐘。** 直接強制推進:

1. 到你的 repo → **Actions** 頁籤
2. 左側清單找到對應的 **Step N**
3. 如果它顯示為停用,先點 **Enable workflow**
4. 右側點 **Run workflow** → 分支選 `main` → **Run workflow**
5. 回到 issue,等 20 – 60 秒

> ✅ 手動觸發時**不會擋你**,即使檢查沒通過也會推進到下一關。這是刻意設計的。

---

## Chat 裡找不到 Agent 模式

見 [環境準備 § 五](00-setup.md#五找不到-agent-模式)。

快速版:更新 VS Code → 更新 Copilot 擴充套件 → 命令面板執行 `Developer: Reload Window`。

---

## MCP Server 起不來

| 症狀 | 解法 |
| :--- | :--- |
| 檔案上沒有 **Start** 字樣 | 命令面板 → `MCP: List Servers` → 選該 server → **Start Server** |
| JSON 有紅色波浪底線 | 格式錯了。`git restore .vscode/mcp.json`,或複製 `solutions/step-3/mcp.json` |
| 顯示錯誤但看不到原因 | 命令面板 → `MCP: List Servers` → 選該 server → **Show Output** |
| 連線逾時 / 被公司網路擋 | 換手機熱點試試。**或直接跳過,只留一個 server 也能推關** |
| GitHub 授權一直失敗 | 命令面板 → `Developer: Reload Window` 後重試;還是不行就跳過,Step 4 有替代做法 |

> 🔸 **重要**:Step 3 的檢查**只看 `.vscode/mcp.json` 存不存在**。MCP server 沒接成功一樣可以推關,不要卡在這裡。

---

## `/fix-issue` 在 Chat 裡叫不出來

1. 確認檔名**完全正確**:`.github/prompts/fix-issue.prompt.md`
2. 命令面板 → `Developer: Reload Window`
3. VS Code 版本較舊的話,把檔案最上面的 `agent: 'agent'` 改成 `mode: 'agent'`
4. 還是不行:直接**把 prompt 檔的內容複製貼進 Chat**,把 `${input:issueNumber}` 手動換成實際編號。效果一樣。

---

## Agent 一直失敗 / 回應很慢 / 說額度不足

| 訊息 | 意思與解法 |
| :--- | :--- |
| 提到 quota / limit / credits | **免費版額度用完了**。改用 [`solutions/`](../solutions/) 完成,不影響推關 |
| 一直轉圈或逾時 | 現場網路壅塞。等 30 秒重試,或用手機熱點 |
| 說它無法執行終端機指令 | 找 Chat 裡的 **Continue** / **Allow** 按鈕按下去 |
| 一直改錯東西 | 開一個**新的對話**(Chat 面板的 `+`),舊對話累積太多雜訊會干擾它 |

---

## 我把專案改壞了

見 [還原指南](rollback.md)。最快的一招:**Chat 的 Restore Checkpoint**。

---

## 什麼都試過了,還是不行

1. **舉手找講師** —— 現場有人可以幫你
2. **用解答檔推關** —— [`solutions/`](../solutions/),先跟上進度
3. **跟旁邊的人一組** —— 觀念比手速重要,看懂了就是你的

> 💚 **這場工作坊的目的不是把程式碼打完,是理解 Agent Mode、MCP、Agentic Workflow 在做什麼。** 卡住不是你的錯,跳過去就好。
