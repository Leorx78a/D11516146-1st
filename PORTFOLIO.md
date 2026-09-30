# 待辦清單 Web App

這是在 GitHub Copilot 實戰工作坊完成的待辦清單 Web App，從基本的待辦事項管理開始，逐步加入主題切換、資料保存與清單篩選功能。

## 線上展示

https://<你的帳號>.github.io/<你的repo名稱>/

## 功能

- 新增待辦事項，空白內容不會被加入清單。
- 勾選或取消勾選待辦事項，完成項目會顯示刪除線並淡化文字。
- 刪除單筆待辦事項。
- 顯示整體清單的未完成項目數量。
- 清單或篩選結果為空時顯示對應提示文字。
- 使用 `localStorage` 保存待辦資料，重新整理後仍可保留。
- 提供淺色與深色模式切換，並保存使用者的主題偏好。
- 使用者尚未手動選擇主題時，依照作業系統的 `prefers-color-scheme` 設定初始化。
- 提供「全部」、「未完成」與「已完成」三種篩選條件。
- 支援手機螢幕瀏覽，並提供基本的鍵盤 focus 與 ARIA 標記。

## 技術

- 使用純 HTML、CSS 與原生 JavaScript。
- 不使用任何框架、套件或外部 CDN。
- 以 CSS `:root` 變數集中管理淺色與深色主題配色。
- 使用瀏覽器 `localStorage` 保存待辦清單與主題偏好。
- 使用 `createElement`、`textContent` 與事件委派建立及更新畫面內容。

## 開發方式

這個專案在 GitHub Copilot 實戰工作坊中，以逐步實作的方式完成：

- 使用 GitHub Copilot Agent Mode 根據需求建立與調整待辦清單功能。
- 使用 Microsoft Learn MCP 查詢 `prefers-color-scheme` 與網頁色彩對比等官方建議，再對照專案的 CSS 配色。
- 使用 GitHub MCP 與 GitHub issue 工作流程讀取需求、整理修正計畫並建立 issue 修復分支。
- 使用 `.github/prompts/fix-issue.prompt.md` 定義讀取 issue、等待確認、修改、驗證、提交與建立 Pull Request 的 agentic workflow。
- 透過 Git 的分支、提交與 rebase 流程管理每個階段的變更。

## 我學到什麼

- 如何用原生 JavaScript 管理待辦資料、事件委派與動態 DOM 更新。
- 如何用 `localStorage` 保存使用者資料與介面偏好。
- 如何使用 CSS 變數與 `prefers-color-scheme` 實作可切換且可跟隨系統設定的主題。
- 如何從可操作性與無障礙角度檢查色彩對比、focus 狀態與 ARIA 標記。
- 如何把 GitHub issue 轉成可執行的修改計畫，並用 Agent Mode、MCP 與 Prompt workflow 協助開發。
