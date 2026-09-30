---
agent: 'agent'
description: '依 GitHub issue 編號修正待辦清單 App,並自動開出 Pull Request'
argument-hint: 'issueNumber=3'
---

# 任務:修好一個 GitHub Issue 並開 PR

你要處理本 repo 的 issue **#${input:issueNumber:要修的 issue 編號}**。

請**嚴格依照下列順序執行,不要跳步**:

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
