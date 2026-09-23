![工作坊完成徽章](https://img.shields.io/badge/GitHub_Copilot_實戰工作坊-已完成-1F883D?style=for-the-badge&logo=githubcopilot&logoColor=white)

![Agent Mode](https://img.shields.io/badge/Agent_Mode-已實作-1E2761?style=flat-square)
![MCP](https://img.shields.io/badge/MCP-已整合-1E2761?style=flat-square)
![Agentic Workflow](https://img.shields.io/badge/Agentic_Workflow-已建立-1E2761?style=flat-square)

# 待辦清單 Web App

在 **GitHub Copilot 實戰工作坊**中完成的純前端待辦清單應用程式。
整個專案沒有手動撰寫程式碼 —— 全部透過 GitHub Copilot 的 **Agent Mode**、**MCP** 與**自訂 agentic workflow** 完成。

## 🌐 線上展示

**https://<你的帳號>.github.io/<你的repo名稱>/**

> ⚠️ 請把上面這行換成你自己的 GitHub Pages 網址(Step 5 動手做 B 拿到的那個)。

## ✨ 功能

- 新增待辦事項,空白內容不會送出
- 勾選標記完成 / 取消完成,完成的項目會加上刪除線並淡化
- 刪除單筆待辦事項
- 底部即時顯示「未完成:N 項」
- 篩選檢視:全部 / 未完成 / 已完成
- 深色模式切換,偏好會被記住;未手動切換過時自動跟隨作業系統設定
- 所有資料存在瀏覽器 `localStorage`,重新整理不會遺失
- 置中卡片式版面,支援手機螢幕

## 🛠 技術

| 項目 | 內容 |
| :--- | :--- |
| 前端 | HTML5、CSS3、原生 JavaScript(ES2020+) |
| 框架 / 套件 | **無** —— 沒有 React / Vue / jQuery,沒有 `package.json`,沒有建置流程 |
| 外部資源 | **無** —— 不引用任何 CDN,可完全離線運作 |
| 資料儲存 | 瀏覽器 `localStorage` |
| 主題切換 | CSS 變數 + `prefers-color-scheme` |
| 部署 | GitHub Pages(靜態託管) |

檔案結構:

```
index.html    # 版面結構
styles.css    # 樣式與深淺色主題
app.js        # 所有互動邏輯與資料存取
```

## 🤖 開發方式

這個專案的重點不在「做了一個待辦清單」,而在**它是怎麼被做出來的**。

| 階段 | 使用的能力 | 做了什麼 |
| :--- | :--- | :--- |
| 1 | **Agent Mode** | 給一段完整需求描述,AI 自行規劃並建立 `index.html`、`styles.css`、`app.js` 三個檔案 |
| 2 | **Agent Mode(多檔修改)** | 一次跨三個檔案加上深色模式與篩選功能;並練習用檢查點與版本控制還原 AI 的錯誤修改 |
| 3 | **MCP 整合** | 透過 `.vscode/mcp.json` 接上 Microsoft Learn 與 GitHub 兩個 MCP Server,讓 AI 能查詢官方文件、讀取本 repo 的 issue |
| 4 | **Agentic Workflow** | 建立 `.github/copilot-instructions.md`(專案規範)與 `.github/prompts/fix-issue.prompt.md`(任務劇本),讓 AI 能自動讀 issue → 開分支 → 修改 → 開 Pull Request |
| 5 | **結業** | 合併 AI 開出的 PR、部署到 GitHub Pages |

值得一提的是第 4 階段:**修好一個 issue 的完整流程被寫成一份 Markdown 檔**,
所以修第二個 issue 時,只需要輸入 `/fix-issue issueNumber=4` —— AI 會自己讀 issue、提出計畫、改程式、開 PR。

相關檔案:

- [`.github/copilot-instructions.md`](.github/copilot-instructions.md) —— 專案通則,每次對話自動帶入
- [`.github/prompts/fix-issue.prompt.md`](.github/prompts/fix-issue.prompt.md) —— 可重複執行的任務劇本
- [`.vscode/mcp.json`](.vscode/mcp.json) —— MCP Server 設定
- [`CHANGELOG.md`](CHANGELOG.md) —— 功能變更紀錄

## 💡 我學到什麼

1. **Agent Mode 和自動補完是完全不同的東西。** 你給的是目標,不是步驟 —— AI 會自己決定要開哪些檔案、執行什麼指令,遇到錯誤會回頭修正。
2. **提示詞寫得越完整,結果越好,而且更省。** 一次把規格交辦清楚,遠勝過來回追問十次。
3. **MCP 打開了 AI 的視野。** 沒有 MCP,AI 只看得到本機檔案;有了 MCP,它能查最新的官方文件、讀我 GitHub 上的 issue。
4. **會反悔比會生成更重要。** 檢查點、工作區捨棄、版本控制回退 —— 知道怎麼還原,才敢放手讓 AI 做事。
5. **把流程寫下來才會變成資產。** 好的提示詞留在聊天記錄裡就消失了;寫成 repo 裡的檔案,才能版控、被審查、被整個團隊重複使用。

## 📄 授權

MIT
