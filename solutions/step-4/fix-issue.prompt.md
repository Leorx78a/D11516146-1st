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
用繁體中文摘要:
- 這是 bug 還是新功能?
- 使用者實際遇到的問題 / 想要的行為是什麼?
- 預期修改哪些檔案?

## 2. 提出計畫並等待確認

用條列式列出你打算做的修改,**然後停下來問我是否同意**。在我回覆「同意」之前不要動任何檔案。

## 3. 建立分支

確認同意後,先從 `main` 建立並切換到新分支:

```
git switch -c fix/issue-${input:issueNumber}
```

## 4. 進行修改

- 遵守 `.github/copilot-instructions.md` 裡的所有專案規則。
- 只改必要的檔案,不要順手重構其他部分。

## 5. 說明驗證方式

告訴我:在瀏覽器打開 `index.html` 後,要做哪些操作、看到什麼結果,才代表這個 issue 真的修好了。

## 6. 提交並推送

```
git add .
git commit -m "fix: <一句話描述這次修了什麼> (#${input:issueNumber})"
git push -u origin fix/issue-${input:issueNumber}
```

## 7. 建立 Pull Request

使用 GitHub MCP 工具,以 `fix/issue-${input:issueNumber}` 為來源分支、`main` 為目標分支建立 PR:

- **標題**:一句話描述這次的修正
- **內文**必須包含:
  - `Closes #${input:issueNumber}`(這樣 PR 合併時 issue 會自動關閉)
  - 「修改內容」:條列這次改了什麼
  - 「如何驗證」:第 5 步寫的驗證步驟

最後把 PR 的網址貼給我。
