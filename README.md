# 🚀 GitHub Copilot 實戰工作坊:Agent Mode × MCP × Agentic Workflows

<img src="https://octodex.github.com/images/Professortocat_v2.png" align="right" height="180px" alt="Professortocat" />

**120 分鐘,從「會用 Copilot 補程式碼」升級成「會指揮 AI 代理完成整件事」。**

這是一場**完全動手做**的工作坊。你會用 GitHub Copilot 的 **Agent Mode** 從零做出一個待辦清單網頁,接上 **MCP** 讓 AI 能查官方文件、讀你自己的 GitHub issue,最後把整套流程寫成可重複執行的 **Agentic Workflow**,讓 AI 自動修 bug 並幫你開 PR。

> 🟢 **不需要任何程式基礎**。每一步都有詳細操作說明與可直接複製的提示詞。
> 🟢 **GitHub Copilot 免費版就能完成**(全程 agent 回合控制在 11 次以內,並附零額度備援方案)。
> 🟢 **做壞了隨時可以還原**,我們專門用一整章教你怎麼反悔。

---

## 🗓️ 議程

| 時間 | 內容 | 說明 |
| :--- | :--- | :--- |
| **13:40 – 15:40** | ⌨️ **實作**(120 分鐘) | Step 1 ~ Step 5 動手做、五題測驗與結業徽章 |

實作段 120 分鐘的細部配速、每關預估時間與 agent 回合數,請見 **[AGENDA.md](AGENDA.md)**。

### 場次

| 日期 | 場型 | 城市 | 場地 |
| :--- | :--- | :--- | :--- |
| **9/23** | 半日 | 台北 | 德明 A302 教室 |

---

## 🎯 你會學到什麼

| 章節 | 主題 | 你會做出什麼 |
| :--- | :--- | :--- |
| **Step 1** | **Hands-on Agent Mode** | 用**一段提示詞**讓 AI 從零建出一個能用的待辦清單網頁(3 個檔案) |
| **Step 2** | **Agent Mode 進階 + Rollback** | 加上深色模式與篩選功能;**刻意把專案弄壞,再用 4 種方法救回來** |
| **Step 3** | **MCP Integration** | 接上 Microsoft Learn MCP 讓 AI 查官方文件;接上 GitHub MCP 讓 AI 讀你的 issue |
| **Step 4** | **Agentic Workflows** | 寫一份可重複執行的劇本,讓 AI **自動讀 issue → 修好 → 開 PR** |
| **Step 5** | **結業與獎勵** | 合併 PR 解鎖官方成就徽章、把作品部署上線、建立作品集頁 |

---

## 🏅 完成後你會拿到什麼

這不是一堂「聽完就忘」的課。完成後你會帶走三樣**留在你 GitHub 帳號上**的東西:

| | 獎勵 | 說明 |
| :---: | :--- | :--- |
| 🦈 | **GitHub Achievements** | GitHub 官方內建成就:合併 PR 解鎖 **YOLO**,再修一個 issue 解鎖 **Pull Shark** |
| 🌐 | **你的作品** | 一個公開網址(GitHub Pages)+ 一份作品集頁,**可以直接放進履歷** |

> ⚠️ **想拿 GitHub Achievements,你的 repo 必須設為 Public** —— GitHub 只計算公開 repo 的活動。
>
> 📖 完整條件、領取方式與疑難排解:**[docs/badges.md](docs/badges.md)**

---

## ✅ 開始前請先準備

1. **GitHub 帳號** — [免費註冊](https://github.com/signup)
2. **GitHub Copilot 已啟用** — 免費版即可,[到這裡確認](https://github.com/settings/copilot)
   - 🎓 **學生或教師請務必先申請 [GitHub Education](https://education.github.com/discount_requests/application)**,可免費升級 Copilot Pro,額度充裕很多
3. **Visual Studio Code**(最新版) — [下載](https://code.visualstudio.com/)
4. **Git** — [下載](https://git-scm.com/downloads)(Windows 使用者請一併安裝 Git Bash)
5. VS Code 內安裝 **GitHub Copilot** 與 **GitHub Copilot Chat** 擴充套件,並**登入你的 GitHub 帳號**

📋 **完整的環境檢查清單(含逐項確認畫面)請見 [docs/00-setup.md](docs/00-setup.md)**

---

## ▶️ 開始練習

### 1. 複製這個 repo 到你自己的帳號

點擊上方綠色的 **`Use this template`** → **`Create a new repository`**

> ⚠️ **重要設定**
> - Owner 選你自己的帳號
> - Repository name 隨意(例如 `my-copilot-workshop`)
> - 可見度請選 **`Public`**(公開 repo 的 GitHub Actions 額度是免費無限的)
> - 其他保持預設,按下 **Create repository**

### 2. 等待 20~60 秒

系統會自動幫你在新 repo 建立一個名為 **`Exercise: GitHub Copilot 實戰工作坊`** 的 issue —— **那個 issue 就是你的教材**。每完成一關並 push,機器人會自動幫你檢查並貼出下一關。

到你新 repo 的 **Issues** 頁籤,打開那個 issue 就可以開始了。

> 💡 如果等超過 2 分鐘 issue 還沒出現,請看 [docs/troubleshooting.md](docs/troubleshooting.md#issue-沒有自動出現) 的解法。

### 3. 把 repo clone 到電腦上

```bash
git clone https://github.com/<你的帳號>/<你的repo名稱>.git
```

然後用 VS Code 打開這個資料夾,就可以開始 Step 1 了。

---

## 🆘 卡關了怎麼辦

| 狀況 | 去哪裡找答案 |
| :--- | :--- |
| AI 把程式改壞了,想還原 | **[docs/rollback.md](docs/rollback.md)** — 五層還原防線與指令速查 |
| `git push` 被拒絕、issue 沒出現、關卡沒推進 | **[docs/troubleshooting.md](docs/troubleshooting.md)** |
| Copilot 額度用完了 | **[solutions/](solutions/)** — 每一關的完整解答,複製就能過關 |
| 想確認自己學會了 | **[docs/quiz.md](docs/quiz.md)** — 五題測驗與詳解 |
| 徽章沒出現、想知道怎麼領 | **[docs/badges.md](docs/badges.md)** — 徽章與成果指南 |

> 🔑 **最重要的兩件事**(現場最常出問題的地方):
> 1. **每次 push 前先 `git pull --rebase`** —— 機器人會 commit 東西回 main,不先拉下來一定會被拒絕。
> 2. **卡住了就跳關** —— 到 Actions 頁籤手動執行對應的 Step workflow 即可強制推進,不會影響學習。

---

## 🧑‍🏫 講師資源

- **[docs/facilitator.md](docs/facilitator.md)** — 講師手冊:說明段大綱、時間控制點、Demo 腳本、現場備援方案
- **[docs/instructor-data.md](docs/instructor-data.md)** — 教學方取得的資訊:完成名單、學員作品、成效數據,以及怎麼匯出
- **[scripts/export-completions.mjs](scripts/export-completions.mjs)** — 一行指令把完成登記匯出成 CSV 與學員成果牆

---

## 📄 授權

本教材採 [MIT License](LICENSE)。示範專案與教學內容歡迎自由取用與改作。

參考自 [GitHub Skills](https://skills.github.com/) 的練習流程設計,使用 [skills/exercise-toolkit](https://github.com/skills/exercise-toolkit) 驅動自動推關。
