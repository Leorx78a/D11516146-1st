# 專案開發規範

## 技術限制

- 這是純前端專案，只使用 HTML、CSS、原生 JavaScript。
- 禁止引入任何框架或套件，不要建立 `package.json`，不要執行 `npm install`。
- 不要引用外部 CDN，必須能離線運作。
- 檔案結構固定為根目錄的 `index.html`、`styles.css`、`app.js`。

## 程式風格

- 註解一律使用繁體中文，變數與函式命名使用英文 camelCase。
- CSS 顏色一律使用 `:root` 定義的 CSS 變數，不要寫死色碼。
- 使用 `const` / `let`，不要使用 `var`。
- 產生 DOM 內容時使用 `textContent` 或 `createElement`，不要使用 `innerHTML` 組字串。

## 協作方式

- 動手修改之前，先條列說明打算修改哪些檔案與進行哪些變動，等使用者確認後才開始。
- 一次只處理一件事，不要順手進行使用者沒有要求的重構。
- 修改完成後，說明要如何在瀏覽器中驗證變更。
