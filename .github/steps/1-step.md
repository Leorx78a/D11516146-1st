## Step 1:Hands-on Agent Mode — 用一段話生出一個網頁 App

歡迎!接下來的 120 分鐘,你會親手完成三件事:讓 AI **自己動手寫程式**、讓 AI **接上外部工具**、讓 AI **照著你寫的劇本自動辦事**。

這一關我們先從最有感的開始:**用一段提示詞,讓 Copilot 從零建出一個能用的待辦清單網頁**。

> ⏱️ 預估時間:30 分鐘 &nbsp;&nbsp;|&nbsp;&nbsp; 🔋 預估 agent 回合:1 – 2 次

---

### ✅ 開始前:60 秒環境檢查

請先確認以下五項,有任何一項打不到勾,先看 [docs/00-setup.md](https://github.com/{{full_repo_name}}/blob/main/docs/00-setup.md):

- [ ] 已經用 `git clone` 把**你自己的這個 repo** 抓到電腦上,並用 VS Code 開啟該資料夾
- [ ] VS Code 右下角或左下角的帳號圖示顯示**已登入 GitHub**
- [ ] 已安裝 **GitHub Copilot** 與 **GitHub Copilot Chat** 擴充套件
- [ ] 按 <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>I</kbd>(macOS:<kbd>Cmd</kbd>+<kbd>Ctrl</kbd>+<kbd>I</kbd>)能打開 **Chat** 面板
- [ ] Chat 輸入框下方的模式下拉選單裡,看得到 **Agent** 這個選項

> 💡 **clone 指令長這樣**(把網址換成你自己的 repo):
> ```bash
> git clone https://github.com/{{full_repo_name}}.git
> ```

---

### 📖 觀念:Ask、Plan、Agent 有什麼不同?

Copilot Chat 有三種模式,差別在於**你把多少決定權交給 AI**:

| 模式 | 白話比喻 | 它會做什麼 | 它不會做什麼 |
| :--- | :--- | :--- | :--- |
| **Ask** | 問路人 | 回答問題、解釋程式碼、給你一段範例讓你自己複製 | 不會動你的檔案 |
| **Plan** | 請人幫忙規劃 | 根據你模糊的需求通盤分析，拆解出多步驟的具體執行計畫 | 不會動你的檔案 |
| **Agent** | **請一組工班來施工** | **自己決定要看哪些檔案、自己建立/修改多個檔案、自己執行終端機指令、看到錯誤自己修** | — |

**Agent Mode 的關鍵差異**:你給的是**目標**,不是**步驟**。

它會先在腦中排一份工作清單,然後一項一項執行 —— 開檔案、寫程式、跑指令、看結果、發現不對再回頭改。你在畫面上會**看到它一步一步做事**,這正是這一關要你親眼確認的事。

<!-- 📸 TODO 截圖:agent-mode-dropdown.png — Chat 面板下方模式下拉選單展開,標示 Agent -->

---

### ⌨️ 動手做:讓 Agent 建出你的 To-Do App

#### 1. 打開 Chat 面板

按 <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>I</kbd>(macOS:<kbd>Cmd</kbd>+<kbd>Ctrl</kbd>+<kbd>I</kbd>)。

#### 2. 把模式切換成 Agent

點 Chat 輸入框**下方的模式下拉選單**,選 **Agent**。

> ⚠️ 這一步是整關的重點,**選錯模式後面都不會發生**。切換後,輸入框的提示文字通常會變成「Edit files in your workspace in agent mode」之類的字樣。

#### 3. 確認模型

免費版會自動幫你選模型(例如 Haiku 4.5 或 GPT-5 mini),**保持預設就好**,不需要特地換成更貴的模型 —— 這一關的任務它完全做得來,而且比較省額度。

#### 4. 貼上提示詞,按 Enter

把下面整段複製貼上。**不要縮短它** —— 描述寫得越完整,AI 一次到位的機率越高,你就越不會浪費額度來回修正。

> ![Static Badge](https://img.shields.io/badge/-提示詞-text?style=social&logo=github%20copilot)
>
> ```prompt
> 請在這個專案的根目錄建立一個「待辦清單」網頁應用程式,規格如下:
>
> 【技術限制】
> - 只使用 HTML、CSS、原生 JavaScript
> - 不要使用任何框架或套件(不要 React / Vue / jQuery / Bootstrap / Tailwind)
> - 不要建立 package.json,不要執行 npm install
> - 不要引用任何外部 CDN,必須能離線開啟
>
> 【檔案結構】
> 根目錄下建立三個檔案:index.html、styles.css、app.js
>
> 【功能需求】
> 1. 輸入框 + 新增按鈕,可以新增待辦事項
> 2. 每一筆待辦左邊有勾選框,勾選後文字加上刪除線並淡化
> 3. 每一筆待辦右邊有刪除按鈕,可以刪除該筆
> 4. 底部顯示「未完成:N 項」
> 5. 清單為空時,顯示提示文字「還沒有任何待辦事項,新增一個吧!」
> 6. 資料存到 localStorage,重新整理頁面後資料還在
> 7. 輸入空白內容時不要新增
>
> 【介面需求】
> - 版面置中,最大寬度 520px,卡片式設計、圓角、淡淡的陰影
> - 支援手機螢幕(RWD)
> - 顏色使用 CSS 變數定義在 :root
>
> 【其他】
> - 程式碼註解請用繁體中文
> - 完成後告訴我要怎麼在瀏覽器打開來看
> ```

<details>
<summary>🇬🇧 English version of the prompt(點開)</summary>

```prompt
Create a "To-Do List" web application in the root of this project with the following specs:

[Technical constraints]
- Use only HTML, CSS, and vanilla JavaScript
- Do NOT use any framework or library (no React / Vue / jQuery / Bootstrap / Tailwind)
- Do NOT create package.json, do NOT run npm install
- Do NOT reference any external CDN; it must work fully offline

[File structure]
Create exactly three files in the root: index.html, styles.css, app.js

[Features]
1. A text input plus an "Add" button to create a to-do item
2. Each item has a checkbox on the left; when checked, the text gets a line-through and is dimmed
3. Each item has a delete button on the right
4. Show "Remaining: N" at the bottom
5. When the list is empty, show a friendly empty-state message
6. Persist data in localStorage so it survives a page refresh
7. Ignore submissions with empty/whitespace-only input

[UI]
- Centered layout, max-width 520px, card style with rounded corners and a subtle shadow
- Responsive on mobile
- Define colors as CSS variables in :root

[Other]
- Write code comments in Traditional Chinese
- When done, tell me how to open it in a browser
```

</details>

#### 5. 看著它工作 👀 —— 這是本關最重要的畫面

按下 Enter 之後**先不要動**,花 30 秒觀察 Chat 面板:

- 它會先列出一份**工作清單**(要建哪些檔案、每個檔案負責什麼)
- 接著你會看到一個個檔案**被建立出來**,左側檔案總管跳出新檔案
- 檔案內容會**即時逐行寫入**

這就是 Agent Mode 和 Ask 模式最大的差別 —— **它在替你動手,不是在給你答案。**

#### 6. 保留變更

Agent 做完後,Chat 下方會出現 **Keep** / **Undo** 之類的按鈕。確認檔案都建立好了,按 **Keep**(保留)。

> 🔸 如果你看到的是 **Continue** 或 **Allow**,那是它想執行終端機指令在徵求你同意 —— 看一眼指令內容,沒問題就按下去。

<!-- 📸 TODO 截圖:agent-working.png — agent 執行中的工作清單與檔案建立過程 -->

#### 7. 打開來看看!

在 VS Code 左側檔案總管**對 `index.html` 按右鍵** → **Copy Path**,然後貼到瀏覽器網址列按 Enter。

> 💡 **更方便的做法**:安裝 VS Code 擴充套件 **Live Preview**(Microsoft 出品),然後對 `index.html` 按右鍵 → **Show Preview**,就能直接在 VS Code 裡看到網頁,而且改完會自動重新整理。

---

### ✅ 完成檢查

在瀏覽器裡實際玩一下,確認這些都可以:

- [ ] 輸入文字按「新增」,項目出現在清單裡
- [ ] 勾選項目,文字出現刪除線
- [ ] **重新整理頁面(F5),資料還在** ← 這代表 localStorage 有正確運作
- [ ] 按刪除按鈕,項目消失
- [ ] 底部的「未完成:N 項」數字會跟著變動
- [ ] 清空所有項目後,出現「還沒有任何待辦事項,新增一個吧!」的提示

> ❓ **有哪一項不對?** 不用自己動手改 —— 直接在 Chat 裡告訴 agent,例如:
> ```prompt
> 重新整理頁面後資料就不見了,請檢查 localStorage 的存取邏輯並修好。
> ```
> **讓 AI 修自己的 bug,這就是 Agent Mode 的日常用法。**

---

### 🔄 做壞了怎麼辦?

| 狀況 | 怎麼救 |
| :--- | :--- |
| 剛剛那次 agent 改得很糟,想整個取消 | Chat 面板該回合上方的 **Restore Checkpoint**(還原檢查點) |
| 已經按了 Keep,但想丟掉所有變更 | 左側 **原始檔控制** 面板 → 右鍵 → **Discard All Changes** |
| 想用指令 | 在終端機執行 `git restore .` 和 `git clean -fd` |

Step 2 我們會**專門練習**這些還原技巧,現在知道有這回事就好。完整說明在 [docs/rollback.md](https://github.com/{{full_repo_name}}/blob/main/docs/rollback.md)。

---

### 🔋 額度不夠 / 卡住超過 5 分鐘?

直接用解答檔,一樣可以推關:

```bash
cp solutions/step-1/index.html solutions/step-1/styles.css solutions/step-1/app.js .
```

(Windows 請用 Git Bash 執行,或直接在檔案總管裡拖曳複製。詳見 [solutions/README.md](https://github.com/{{full_repo_name}}/blob/main/solutions/README.md))

---

### 🚀 推進到下一關

在 VS Code 的終端機(<kbd>Ctrl</kbd>+<kbd>`</kbd>)執行:

```bash
git add .
git commit -m "step 1: 用 Agent Mode 建立待辦清單 App"
git pull --rebase
git push
```

> ⚠️ **`git pull --rebase` 這行不能省略!**
> 這個練習的機器人會自動 commit 東西回 `main` 分支,不先把它拉下來,你的 `git push` 一定會被拒絕。
> 如果還是被拒絕,請看 [docs/troubleshooting.md](https://github.com/{{full_repo_name}}/blob/main/docs/troubleshooting.md)。

推上去之後,**回到這個 issue 等待 20 – 60 秒**,機器人會自動檢查並貼出 Step 2。可以按 <kbd>F5</kbd> 重新整理頁面。
