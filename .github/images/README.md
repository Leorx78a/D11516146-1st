# 📸 截圖待補清單

`.github/steps/*.md` 裡已經放好註解標記,搜尋 `📸 TODO 截圖` 就能找到每張圖該插入的位置。

## 怎麼插入

把圖片檔放進這個資料夾,然後在對應的步驟檔裡把註解換成:

```markdown
![描述文字](../images/檔名.png)
```

> ⚙️ 練習開始時,`skills/exercise-toolkit` 會自動把 `../images/xxx.png` 改寫成 GitHub 的 raw 網址,
> 所以在 issue 留言裡也能正常顯示。**請務必使用 `../images/` 這個相對路徑寫法。**

## 待補清單

| 檔名 | 出現在 | 畫面內容 |
| :--- | :--- | :--- |
| `agent-mode-dropdown.png` | `1-step.md` | Chat 面板下方的模式下拉選單展開,標示出 **Agent** 選項 |
| `agent-working.png` | `1-step.md` | Agent 執行中的工作清單,以及檔案被建立的過程 |
| `restore-checkpoint.png` | `2-step.md` | Chat 訊息上方浮現的 **Restore Checkpoint** 按鈕 |
| `mcp-start-codelens.png` | `3-step.md` | `.vscode/mcp.json` 上方的 **Start** CodeLens |
| `mcp-github-oauth.png` | `3-step.md` | VS Code 跳出的 GitHub 授權對話框 |
| `agentic-workflow-pr.png` | `4-step.md` | Agent 自動建立出來的 Pull Request 頁面 |
| `merge-pr.png` | `5-step.md` | PR 頁面的 **Merge pull request** 按鈕 |
| `enable-pages.png` | `5-step.md` | Settings → Pages 的設定畫面 |

## 截圖建議

- 用**淺色主題**截圖(投影和列印都比較清楚)
- 只截**必要範圍**,不要整個螢幕
- 關鍵按鈕用紅框標示
- 寬度建議 600 – 900px
- 截圖裡不要出現你的私人 repo 名稱或 email
