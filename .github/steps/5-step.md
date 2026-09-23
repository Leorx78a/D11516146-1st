## Step 5:結業 — 領徽章,把成果變成你的作品

四關都完成了 🎉 但先別關掉電腦 —— 這最後 10 分鐘,是把今天的努力**變成你帶得走的東西**。

三樣獎勵:

| | 獎勵 | 放在哪裡 |
| :---: | :--- | :--- |
| 🏅 | **工作坊官方認證徽章** | 你的 **GitHub 個人資料**上 |
| 🦈 | **GitHub Achievements**(YOLO / Pull Shark) | 你的 **GitHub 個人資料**上 |
| 🌐 | **你的作品**(可公開瀏覽的網頁 + 作品集頁) | 你的**個人儲存庫** |

> ⏱️ 預估時間:10 分鐘 &nbsp;&nbsp;|&nbsp;&nbsp; 🔋 預估 agent 回合:1 次

---

### ⚠️ 先確認三件事(不然徽章拿不到)

GitHub 的成就徽章有明確條件,**不符合就不會發**:

- [ ] **你的 repo 是 Public(公開)**
      GitHub Achievements **只計算公開 repo 的活動**,私有 repo 一律不算。
      到你 repo 的 **Settings** → 最下方 **Danger Zone** → **Change repository visibility** → 設為 Public。
- [ ] **PR 要合併進 `main` 分支**(這是預設值,通常不用改)
- [ ] **個人資料有開啟成就顯示**
      到 [github.com/settings/profile](https://github.com/settings/profile) → 勾選 **Show Achievements on my profile**

---

### ⌨️ 動手做 A:合併你的 Pull Request → 解鎖 🦈 **YOLO**

Step 4 讓 AI 幫你開了一個 PR,現在把它合併掉。

1. 到你 repo 的 **Pull requests** 頁籤,打開那個 PR
2. 先花 30 秒**看一下 Files changed**(這是好習慣 —— AI 寫的程式碼也要人來把關)
3. 按 **Merge pull request** → **Confirm merge**
4. 合併後可以按 **Delete branch** 清掉分支

> 🦈 **YOLO** 的條件是「合併一個沒有經過他人審查的 PR」—— 你剛剛做的正是這件事。
> 你也會看到對應的 issue 被**自動關閉**(因為 PR 內文有 `Closes #N`)。

<!-- 📸 TODO 截圖:merge-pr.png — PR 頁面的 Merge pull request 按鈕 -->

#### 🎁 加碼:再修一個 issue → 解鎖 🦈 **Pull Shark**

**Pull Shark 需要合併 2 個 PR。** 你的 repo 裡還有沒修完的 issue,再跑一次剛剛寫好的劇本就好:

> ![Static Badge](https://img.shields.io/badge/-提示詞-text?style=social&logo=github%20copilot)
>
> ```prompt
> /fix-issue issueNumber=4
> ```
>
> (換成你還沒修的 issue 編號)

**這正是 Agentic Workflow 的價值 —— 第二次幾乎不花你什麼力氣。**

> ⏰ 現場時間不夠的話,**這一段回家再做**,徽章隨時都拿得到。

---

### ⌨️ 動手做 B:開啟 GitHub Pages → 讓作品有公開網址

你做的是純靜態網頁,**不需要任何伺服器就能上線**。

1. 到你 repo 的 **Settings** → 左側 **Pages**
2. **Source** 選 **Deploy from a branch**
3. **Branch** 選 `main`、資料夾選 `/ (root)` → 按 **Save**
4. 等 1 – 2 分鐘,重新整理該頁,上方會出現你的網址:
   ```
   https://<你的帳號>.github.io/<你的repo名稱>/
   ```
5. 打開它 —— **你的待辦清單 App 現在是一個任何人都能開的網站了。**

<!-- 📸 TODO 截圖:enable-pages.png — Settings → Pages 的設定畫面 -->

> 💡 這個網址可以直接放進履歷、LinkedIn、個人網站。**它是你今天做出來的東西,不是別人的教學範例。**

---

### ⌨️ 動手做 C:用 AI 產生你的作品集頁

最後一次用 Agent Mode —— 讓它幫你把今天的成果寫成一份像樣的作品集說明。

> ![Static Badge](https://img.shields.io/badge/-提示詞-text?style=social&logo=github%20copilot)
>
> ```prompt
> 請在專案根目錄建立 PORTFOLIO.md,用繁體中文寫一份專業的作品集說明,內容包含:
>
> 1. 標題與一段簡介:這是在 GitHub Copilot 實戰工作坊完成的待辦清單 Web App
> 2. 「線上展示」區塊:放 GitHub Pages 網址(先用 https://<你的帳號>.github.io/<你的repo名稱>/ 佔位,我會自己換掉)
> 3. 「功能」區塊:條列這個 App 目前所有功能
> 4. 「技術」區塊:說明使用純 HTML / CSS / 原生 JavaScript,無框架、無套件、資料存 localStorage
> 5. 「開發方式」區塊:說明這個專案是如何用 GitHub Copilot Agent Mode、MCP、以及 .github/prompts 的 agentic workflow 完成的
> 6. 「我學到什麼」區塊:條列三到五點
>
> 請同時在 README.md 的最上方加一行連結指向 PORTFOLIO.md。
> 語氣專業但不誇大,不要寫我沒做過的事。
> ```

<details>
<summary>🇬🇧 English version(點開)</summary>

```prompt
Create PORTFOLIO.md in the project root — a professional portfolio write-up covering:
1. Title and intro: a to-do list web app built during a GitHub Copilot hands-on workshop
2. "Live demo" section with the GitHub Pages URL (use a placeholder I will replace)
3. "Features" section listing everything the app can do
4. "Tech" section: plain HTML / CSS / vanilla JavaScript, no frameworks, localStorage persistence
5. "How it was built" section: Copilot Agent Mode, MCP, and the agentic workflow in .github/prompts
6. "What I learned": three to five bullets
Also add a link to PORTFOLIO.md at the top of README.md.
Professional tone, no exaggeration, don't claim anything I didn't do.
```

</details>

建好之後**把 Pages 網址換成你真正的網址**,並在最上方貼上完成徽章:

```markdown
![工作坊完成徽章](https://img.shields.io/badge/GitHub_Copilot_實戰工作坊-已完成-1F883D?style=for-the-badge&logo=githubcopilot&logoColor=white)
```

---

### 📝 動手做 D:完成登記(**這一步才能拿到官方徽章**)

點下面的連結,填一份簡短的完成登記表:

> ### 👉 [**前往完成登記**](https://github.com/matsurigoto/copilot-workshop-agent-mode-mcp/issues/new?template=workshop-completion.yml&labels=completion)

表單會問你:你的 repo 網址、作品網址、五題測驗的答案、以及一些幫助我們改進課程的問題。**大約 2 分鐘**。

> 🏅 **關於官方認證徽章**
> 本工作坊的完成徽章正在與 GitHub 官方協調發放方式,徽章確認後會**直接顯示在你的 GitHub 個人資料上**。
> 我們會依照這份登記名單發送,所以**請務必填寫**。發放時間與領取方式確定後,會在登記 issue 中通知你。

---

### ✅ 完成檢查

- [ ] repo 已設為 **Public**
- [ ] 個人資料已勾選 **Show Achievements on my profile**
- [ ] 至少 **1 個 PR 已合併**進 `main`(YOLO)
- [ ] GitHub Pages 已啟用,網址打得開
- [ ] `PORTFOLIO.md` 已建立
- [ ] 已完成**完成登記**
- [ ] 🎁 加碼:合併第 2 個 PR(Pull Shark)

> 📖 徽章的完整說明、條件與疑難排解:[docs/badges.md](https://github.com/{{full_repo_name}}/blob/main/docs/badges.md)

---

### 🔄 出問題怎麼辦?

| 狀況 | 解法 |
| :--- | :--- |
| PR 沒辦法合併(有衝突) | PR 頁面點 **Resolve conflicts**,或直接把 PR 關掉,在 `main` 上手動改完再 commit |
| Pages 開了但是 404 | 等 2 – 3 分鐘再試;確認 `index.html` 在**根目錄**;確認 Branch 選的是 `main` + `/ (root)` |
| 徽章沒有出現 | 徽章不是即時的,可能要幾小時。先確認 repo 是 Public、成就顯示已開啟 |
| 不想公開 repo | 那就拿不到 GitHub Achievements(這是 GitHub 的規定)。作品集與工作坊完成徽章仍然可以拿 |

---

### 🔋 額度不夠 / 卡住超過 5 分鐘?

```bash
cp solutions/step-5/PORTFOLIO.md .
```

---

### 🚀 完成最後一關

```bash
git add .
git commit -m "step 5: 建立作品集,開啟 Pages,完成結業"
git pull --rebase
git push
```

推上去之後,機器人會幫你**檢查徽章條件**、貼出**總複習與五題測驗解析**,然後為你關閉這個練習。

**辛苦了,你完成了!** 🎊
