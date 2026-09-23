# 專案說明:待辦清單 App

這是一個 GitHub Copilot 工作坊的教學專案。請在協助我時遵守以下規則。

## 技術限制(重要)

- **純前端**:只使用 HTML、CSS、原生 JavaScript。
- **禁止引入任何框架或套件**:不要用 React、Vue、jQuery、Tailwind、Bootstrap,也不要建立 `package.json` 或執行 `npm install`。
- **不要引入任何 CDN 外部資源**,所有程式碼都要能離線運作。
- 檔案結構固定為根目錄的 `index.html`、`styles.css`、`app.js`,不要任意新增或搬移檔案。

## 程式風格

- 註解一律使用**繁體中文**。
- 變數與函式命名使用英文 camelCase。
- CSS 顏色一律使用 `:root` 內定義的 CSS 變數,不要在各處寫死色碼。
- JavaScript 使用 `const` / `let`,不要用 `var`。
- 產生 DOM 內容時使用 `textContent` 或 `createElement`,**不要用 `innerHTML` 組字串**(避免 XSS)。

## 協作方式

- **動手改之前,先用條列式說明你打算改哪些檔案、做什麼變動,等我確認後再開始。**
- 一次只處理一件事,不要順手做我沒要求的重構。
- 改完後,請告訴我**要怎麼在瀏覽器中驗證**這次的修改。

## 無障礙

- 互動元素要有適當的 `aria-label`。
- 保持鍵盤可操作(Tab 可聚焦、Enter 可送出)。
