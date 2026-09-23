## Step 2:Agent Mode 進階 — 多檔修改,以及「反悔」的四種方法

你的 To-Do App 已經能用了 🎉 但真實開發不是一次就成功 —— **AI 一定會有做錯的時候**。

所以這一關有兩個任務:
1. 讓 agent 一次改動**多個檔案**,加上深色模式與篩選功能
2. **故意把專案弄壞**,然後學會用四種方法把它救回來

> ⏱️ 預估時間:20 分鐘 &nbsp;&nbsp;|&nbsp;&nbsp; 🔋 預估 agent 回合:2 – 3 次

---

### 📖 觀念一:Agent 的工作循環

Agent Mode 不是「產生一段程式碼就結束」,它跑的是一個**循環**:

```
   ┌─────────────────────────────────────────────┐
   │                                             │
   ▼                                             │
 規劃 ──▶ 修改檔案 ──▶ 執行指令 ──▶ 檢查結果 ──┘
                                       │
                                       ▼
                                   完成,交給你
```

它會自己判斷「還沒好」然後回頭再改。你要做的是**在最後把關**,而不是盯著中間每一步。

### 📖 觀念二:給它正確的上下文

Agent 不會通靈,你給的資訊越準,結果越好。三個實用技巧:

| 技巧 | 怎麼用 | 什麼時候用 |
| :--- | :--- | :--- |
| `#檔名` | 在提示詞裡打 `#app.js` | 明確指定要改哪個檔 |
| 拖曳 | 把檔案從檔案總管**拖進 Chat 輸入框** | 一次帶入多個檔案 |
| 貼圖 | 直接 <kbd>Ctrl</kbd>+<kbd>V</kbd> 貼上截圖 | 「畫面長這樣不對」最快的說法 |

---

### ⌨️ 動手做 A:先存檔,再開工

**這是專業習慣,也是這一關的保命符。** 在動 AI 之前,先把目前能用的版本 commit 起來:

```bash
git add .
git commit -m "checkpoint: step 2 開始前的可用版本"
```

> 💡 這樣一來,無論等一下 AI 把專案搞成什麼樣子,你永遠有一個「回得去」的點。

---

### ⌨️ 動手做 B:一次改多個檔案

確認 Chat 仍在 **Agent** 模式,貼上:

> ![Static Badge](https://img.shields.io/badge/-提示詞-text?style=social&logo=github%20copilot)
>
> ```prompt
> 請幫這個待辦清單 App 加上兩個功能,直接修改現有的 index.html、styles.css、app.js:
>
> 【功能一:深色模式】
> - 在標題列右側加一個切換按鈕,可以在淺色 / 深色之間切換
> - 按鈕上要有圖示和文字(淺色時顯示 🌙 深色模式,深色時顯示 ☀️ 淺色模式)
> - 使用者的選擇要存進 localStorage,重新整理後維持
> - 如果使用者從來沒手動切換過,就跟隨作業系統的深淺色設定(prefers-color-scheme)
> - 深色配色請沿用現有的 CSS 變數機制,不要在各處寫死色碼
>
> 【功能二:篩選】
> - 在輸入框下方加三個篩選按鈕:全部、未完成、已完成
> - 點選後只顯示對應的項目,目前選中的按鈕要有明顯樣式
> - 底部「未完成:N 項」的數字不受篩選影響,永遠顯示整體數量
> - 篩選後清單為空時,顯示對應的提示文字
>
> 【限制】
> - 維持純 HTML / CSS / 原生 JavaScript,不要引入任何套件
> - 註解用繁體中文
> - 改完後告訴我要怎麼在瀏覽器驗證這兩個功能
> ```

<details>
<summary>🇬🇧 English version of the prompt(點開)</summary>

```prompt
Add two features to this to-do app by modifying the existing index.html, styles.css, and app.js:

[Feature 1: Dark mode]
- Add a toggle button to the right of the title
- The button shows an icon and label (🌙 Dark mode / ☀️ Light mode)
- Persist the choice in localStorage so it survives a refresh
- If the user has never toggled manually, follow the OS setting (prefers-color-scheme)
- Reuse the existing CSS variable mechanism; do not hardcode colors anywhere

[Feature 2: Filters]
- Add three filter buttons below the input: All, Active, Completed
- Only matching items are shown; the selected button has a distinct style
- The "Remaining: N" counter is NOT affected by the filter — it always reflects the total
- Show an appropriate empty-state message when a filter yields no items

[Constraints]
- Stay with plain HTML / CSS / vanilla JavaScript, no libraries
- Code comments in Traditional Chinese
- When done, tell me how to verify both features in the browser
```

</details>

**觀察重點**:這次它會**同時打開並修改三個既有檔案**,而不是從零建立。Chat 裡會看到每個檔案的 diff(綠色是新增、紅色是刪除)。

確認沒問題後按 **Keep**,到瀏覽器重新整理,測試:

- [ ] 點深色模式按鈕,整頁配色切換
- [ ] 重新整理後,深色模式的選擇還在
- [ ] 三個篩選按鈕都能正確過濾
- [ ] 篩選時,底部「未完成:N 項」的數字不會跟著變

---

### 💥 動手做 C:故意把它弄壞

現在,**刻意下一個很糟的指令**。這是安全的,我們馬上就會救回來:

> ![Static Badge](https://img.shields.io/badge/-提示詞-text?style=social&logo=github%20copilot)
>
> ```prompt
> 請把整個專案改寫成單一個 index.html 檔案,把所有 CSS 和 JavaScript 都內嵌進去,
> 刪掉 styles.css 和 app.js,並且移除 localStorage 相關的所有程式碼。
> ```

按下去,讓它做完。然後到瀏覽器重新整理 —— 你會發現**資料不會保存了**,而且乾淨的三檔結構也沒了。

**很好,現在我們來把它救回來。**

---

### 🔄 動手做 D:四種還原方法,挑一種救回來

#### 方法一:Chat 的 Restore Checkpoint(最快,推薦先試這個)

在 Chat 面板中找到**剛剛那次糟糕的提問**,把滑鼠移到那則訊息上,會出現 **Restore Checkpoint**(還原檢查點)按鈕。點下去 —— **那次提問之後的所有檔案變更會全部復原**。

<!-- 📸 TODO 截圖:restore-checkpoint.png — Chat 訊息上的 Restore Checkpoint 按鈕 -->

> 💡 這是 VS Code 幫你做的自動快照,不需要用到 git,是最無痛的還原方式。

#### 方法二:原始檔控制面板 Discard

左側 **原始檔控制**(Source Control,分支圖示)→ 在 **Changes** 區塊標題列按 **↩︎ Discard All Changes**。

> ⚠️ 這會丟掉**所有**尚未 commit 的變更,包含你想留的部分。用之前先確認。

#### 方法三:git 指令(丟掉未 commit 的變更)

```bash
git restore .
git clean -fd
```

- `git restore .` — 把已追蹤的檔案還原成上次 commit 的樣子
- `git clean -fd` — 刪掉那些 AI 新建、但你不想要的檔案

#### 方法四:已經 commit 了怎麼辦

```bash
git reset --hard HEAD~1
```

把最後一次 commit 整個丟掉。**如果已經 push 出去了**,不要用 `reset`,改用:

```bash
git revert HEAD
git push
```

`revert` 是「再做一次相反的變更」,不會改寫歷史,對協作比較安全。

---

### ✅ 確認救回來了

不管你用哪一種方法,現在應該要:

- [ ] `styles.css` 和 `app.js` 都回來了
- [ ] 瀏覽器重新整理後,資料保存正常
- [ ] 深色模式和篩選功能還在

> 😱 **如果沒救回來**,別慌 —— 直接複製解答檔:
> ```bash
> cp solutions/step-2/index.html solutions/step-2/styles.css solutions/step-2/app.js .
> ```

📖 完整的還原指南(含決策樹)在 [docs/rollback.md](https://github.com/{{full_repo_name}}/blob/main/docs/rollback.md)。

---

### ⌨️ 動手做 E:讓 agent 寫變更紀錄

最後一步,順便體驗 agent 的另一種用途 —— 它讀得懂你的 git 歷史和程式碼:

> ![Static Badge](https://img.shields.io/badge/-提示詞-text?style=social&logo=github%20copilot)
>
> ```prompt
> 請在專案根目錄建立 CHANGELOG.md,用繁體中文記錄這個待辦清單 App 目前的功能。
> 分成兩個版本區塊:
> - [0.1.0] - Step 1:基本的新增、完成、刪除、未完成計數、localStorage 保存
> - [0.2.0] - Step 2:深色模式切換(含記住偏好與跟隨系統設定)、全部/未完成/已完成篩選
> 每個區塊底下用「新增」「變更」分類條列。
> ```

<details>
<summary>🇬🇧 English version(點開)</summary>

```prompt
Create CHANGELOG.md in the project root documenting this to-do app's features.
Use two version sections:
- [0.1.0] - Step 1: add / complete / delete items, remaining counter, localStorage persistence
- [0.2.0] - Step 2: dark mode toggle (with saved preference and OS-setting fallback), All/Active/Completed filters
Group entries under "Added" and "Changed" in each section.
```

</details>

---

### 🔋 額度不夠 / 卡住超過 5 分鐘?

```bash
cp solutions/step-2/index.html solutions/step-2/styles.css solutions/step-2/app.js solutions/step-2/CHANGELOG.md .
```

---

### 🚀 推進到下一關

```bash
git add .
git commit -m "step 2: 加上深色模式與篩選,並練習還原"
git pull --rebase
git push
```

推上去之後回到這個 issue,等待機器人貼出 **Step 3:MCP Integration** —— 接下來我們要讓 AI 走出這台電腦,連上外面的世界。
