## Step 4:Agentic Workflows — 把工作流程寫成劇本

看一下你的 [Issues 頁籤](https://github.com/{{full_repo_name}}/issues) 👀 —— 「使用者」剛剛回報了幾個 bug 和一個功能需求!

前三關你都是**一次下一個指令**。但現實中,「修一個 issue」永遠是**同一套流程**:讀 issue → 想清楚 → 開分支 → 改程式 → 測試 → commit → 開 PR。

這一關,我們把這套流程**寫成一份劇本**,以後只要一行 `/fix-issue` 就能重複執行。

> ⏱️ 預估時間:20 分鐘 &nbsp;&nbsp;|&nbsp;&nbsp; 🔋 預估 agent 回合:2 – 3 次

---

### 📖 觀念:什麼是 Agentic Workflow?

**Agentic Workflow = 把「多步驟、會重複做」的工作,寫成 AI 能照著執行的劇本。**

差別在這裡:

| | 一般提問 | Agentic Workflow |
| :--- | :--- | :--- |
| 形式 | 每次都重打一次提示詞 | 存成檔案,`/名稱` 就能叫出來 |
| 一致性 | 每個人問法不同,結果不同 | 全團隊跑同一套流程 |
| 範圍 | 通常一個動作 | 讀 issue → 改程式 → 開 PR,一路到底 |
| 可版控 | ❌ 在你的聊天記錄裡 | ✅ 在 repo 裡,可以 review、可以改進 |

VS Code 提供三種可以放進 repo 的「AI 資產」:

| 檔案 | 角色 | 什麼時候生效 |
| :--- | :--- | :--- |
| `.github/copilot-instructions.md` | **規矩** — 這個專案的通則 | **每一次**對話都自動帶入 |
| `.github/prompts/*.prompt.md` | **劇本** — 一個具體任務的完整步驟 | 你在 Chat 打 `/檔名` 時 |
| `.github/agents/*.agent.md` | **角色** — 專屬的 agent(帶特定工具與人設) | 你選用那個 agent 時 |

把它們和 MCP 組合起來,就是這場工作坊的完整公式:

> ### 🧩 規矩(Instructions) + 劇本(Prompt) + 手腳(MCP) = **Agentic Workflow**

---

### ⌨️ 動手做 A:先立規矩

`.github/copilot-instructions.md` 會被**自動帶進每一次對話**,不用你每次重複交代「不要用 React」。

> ![Static Badge](https://img.shields.io/badge/-提示詞-text?style=social&logo=github%20copilot)
>
> ```prompt
> 請建立 .github/copilot-instructions.md,用繁體中文寫,內容要包含以下規則:
>
> 【技術限制】
> - 這是純前端專案,只用 HTML、CSS、原生 JavaScript
> - 禁止引入任何框架或套件,不要建立 package.json,不要執行 npm install
> - 不要引用外部 CDN,必須能離線運作
> - 檔案結構固定為根目錄的 index.html、styles.css、app.js
>
> 【程式風格】
> - 註解一律用繁體中文,變數與函式命名用英文 camelCase
> - CSS 顏色一律使用 :root 定義的 CSS 變數,不要寫死色碼
> - 使用 const / let,不要用 var
> - 產生 DOM 內容時用 textContent 或 createElement,不要用 innerHTML 組字串
>
> 【協作方式】
> - 動手改之前,先條列說明打算改哪些檔案、做什麼變動,等我確認後才開始
> - 一次只處理一件事,不要順手做我沒要求的重構
> - 改完後說明要怎麼在瀏覽器中驗證
> ```

建好之後打開檔案看一眼 —— **從現在起,你每一次跟 Copilot 對話,它都會先讀這份規矩。**

---

### ⌨️ 動手做 B:寫劇本

現在建立 `.github/prompts/fix-issue.prompt.md`。

這個檔案**請直接手動建立並貼上內容**(而不是叫 agent 做),因為裡面的 `${input:...}` 語法是給 VS Code 讀的,agent 很容易「好心」把它改掉。

📄 **`.github/prompts/fix-issue.prompt.md`**

````markdown
---
agent: 'agent'
description: '依 GitHub issue 編號修正待辦清單 App,並自動開出 Pull Request'
argument-hint: 'issueNumber=3'
---

# 任務:修好一個 GitHub Issue 並開 PR

你要處理本 repo 的 issue **#${input:issueNumber:要修的 issue 編號}**。

請**嚴格依照下列順序**執行,不要跳步:

## 1. 讀取 issue

使用 GitHub MCP 工具讀取本 repo 的 issue #${input:issueNumber}。
用繁體中文摘要:這是 bug 還是新功能?使用者遇到什麼問題?預期改哪些檔案?

## 2. 提出計畫並等待確認

用條列式列出你打算做的修改,**然後停下來問我是否同意**。在我回覆「同意」之前不要動任何檔案。

## 3. 建立分支

```
git switch -c fix/issue-${input:issueNumber}
```

## 4. 進行修改

遵守 `.github/copilot-instructions.md` 的所有規則。只改必要的檔案。

## 5. 說明驗證方式

告訴我:在瀏覽器打開 index.html 後,要做哪些操作、看到什麼結果,才代表真的修好了。

## 6. 提交並推送

```
git add .
git commit -m "fix: <一句話描述> (#${input:issueNumber})"
git push -u origin fix/issue-${input:issueNumber}
```

## 7. 建立 Pull Request

使用 GitHub MCP 工具,以 `fix/issue-${input:issueNumber}` 為來源、`main` 為目標建立 PR。
內文必須包含 `Closes #${input:issueNumber}`、「修改內容」條列、以及第 5 步的驗證步驟。
最後把 PR 網址貼給我。
````

> 💡 **懶人包**:這個檔案已經幫你準備好了,直接複製:
> ```bash
> mkdir -p .github/prompts && cp solutions/step-4/fix-issue.prompt.md .github/prompts/
> ```

> 🔸 **VS Code 版本較舊的話**:如果 `/fix-issue` 叫不出來,把最上面的 `agent: 'agent'` 改成 `mode: 'agent'` 再試一次。

---

### ⌨️ 動手做 C:執行你的劇本 🎬

1. **先確認 GitHub MCP 是啟動的**(Chat 的工具清單 🛠️ 裡看得到 GitHub 的工具且已勾選)
2. 到 [Issues 頁籤](https://github.com/{{full_repo_name}}/issues) 挑一個 issue,**記下它的編號**(例如 `3`)
3. 回到 Chat(**Agent** 模式),輸入:

   > ![Static Badge](https://img.shields.io/badge/-提示詞-text?style=social&logo=github%20copilot)
   >
   > ```prompt
   > /fix-issue issueNumber=3
   > ```
   >
   > (把 `3` 換成你挑的 issue 編號)

4. **它會停下來問你同不同意計畫** —— 看一下它打算怎麼改,合理就回:

   > ```prompt
   > 同意,請開始
   > ```

5. 然後**放手讓它跑**。你會看到它:開分支 → 改檔案 → commit → push → 呼叫 GitHub MCP 開 PR

6. **打開它給你的 PR 網址** 🎉

<!-- 📸 TODO 截圖:agentic-workflow-pr.png — agent 自動建立的 PR 頁面 -->

> ### 🏆 停下來想一下你剛剛做了什麼
> 你寫了**一份 Markdown 檔**,然後打了**一行指令**。
> AI 就自己讀了 GitHub 上的 issue、理解需求、改了程式碼、建了分支、推上去、開了一個帶有 `Closes #N` 的 Pull Request。
>
> **這就是 Agentic Workflow。** 而它是可以版控、可以 code review、可以整個團隊共用的。

---

### ✅ 完成檢查

- [ ] `.github/copilot-instructions.md` 已建立
- [ ] `.github/prompts/fix-issue.prompt.md` 已建立
- [ ] 在 Chat 打 `/` 時,清單裡看得到 `fix-issue`
- [ ] 成功跑完一次,並且看到 AI 建立的 Pull Request(或至少完成到改程式碼那一步)

---

### 🔄 出問題怎麼辦?

| 狀況 | 解法 |
| :--- | :--- |
| `/fix-issue` 在 Chat 裡叫不出來 | 檔名要正好是 `fix-issue.prompt.md` 且放在 `.github/prompts/`;試試命令面板 → `Developer: Reload Window` |
| AI 改到不該改的地方 | Chat 的 **Restore Checkpoint**;或 `git switch main` 後 `git branch -D fix/issue-N` 把分支整個刪掉 |
| PR 開錯了 | 到 GitHub 上把 PR **Close** 即可,不會影響推關 |
| **GitHub MCP 沒接成功** | 沒關係!把提示詞改成「請直接讀我貼給你的 issue 內容並照劇本做,最後告訴我 PR 該怎麼手動開」,然後把 issue 內容貼給它。**推關只檢查檔案是否存在。** |
| 已經 push 出去想反悔 | `git revert <commit>` 再 push,不要用 force push |

📖 完整還原指南:[docs/rollback.md](https://github.com/{{full_repo_name}}/blob/main/docs/rollback.md)

---

### 🔋 額度不夠 / 卡住超過 5 分鐘?

```bash
mkdir -p .github/prompts
cp solutions/step-4/copilot-instructions.md .github/copilot-instructions.md
cp solutions/step-4/fix-issue.prompt.md .github/prompts/fix-issue.prompt.md
```

---

### 🚀 完成最後一關

⚠️ **先切回 `main` 分支**(剛剛的劇本可能把你留在 `fix/issue-N` 分支上):

```bash
git switch main
git add .
git commit -m "step 4: 建立 copilot-instructions 與 fix-issue 劇本"
git pull --rebase
git push
```

> 🤷 **如果 `git add .` 說沒有東西可以 commit**,代表那兩個檔案被 commit 在 `fix/issue-N` 分支上了。這樣做:
> ```bash
> git switch main
> git checkout fix/issue-3 -- .github/copilot-instructions.md .github/prompts/fix-issue.prompt.md
> git add .
> git commit -m "step 4: 建立 copilot-instructions 與 fix-issue 劇本"
> git pull --rebase
> git push
> ```
> (把 `fix/issue-3` 換成你實際的分支名稱)

推上去之後回到這個 issue,機器人會貼出**最後一關 Step 5:領徽章、把成果變成你的作品**。

> 🏅 先劇透一下:等一下你會把剛剛那個 PR 合併掉,順手解鎖 GitHub 的官方成就徽章,並把你的 App 變成一個任何人都打得開的網站。
