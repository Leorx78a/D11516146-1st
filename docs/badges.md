# 🏅 徽章與成果指南

完成這場工作坊,你會拿到三種東西。這份文件說明**每一種怎麼拿、條件是什麼、拿不到時怎麼查**。

| | 項目 | 由誰發 | 顯示在哪 | 狀態 |
| :---: | :--- | :--- | :--- | :--- |
| 🏅 | **工作坊認證徽章** | 主辦方 × GitHub 官方 | GitHub **個人資料** | 🚧 發放方式協調中 |
| 🦈 | **GitHub Achievements** | GitHub 官方(自動) | GitHub **個人資料** | ✅ 完成即可拿 |
| 🌐 | **你的作品** | 你自己 | 你的**個人儲存庫** | ✅ 完成即可拿 |

---

## 🏅 一、工作坊認證徽章

<!-- ⚙️ 待官方確認後,只需要修改這一段:填入領取步驟、連結、預計發放時間。其他文件都連到這裡,不必改動。 -->

本工作坊的完成徽章正在與 **GitHub 官方協調發放方式**。徽章確認後會**直接顯示在你的 GitHub 個人資料上**。

**你現在要做的只有一件事:**

> ### 👉 [**填寫完成登記表**](https://github.com/matsurigoto/copilot-workshop-agent-mode-mcp/issues/new?template=workshop-completion.yml&labels=completion)

我們會依照登記名單發送,所以**沒登記就拿不到**。

| 項目 | 說明 |
| :--- | :--- |
| **領取條件** | 完成工作坊 + 填寫完成登記表(含正確的 GitHub 帳號) |
| **發放方式** | 🚧 與 GitHub 官方協調中,確定後會在你的登記 issue 留言通知 |
| **預計時間** | 🚧 待公布 |

> ⚠️ 登記表上的 **GitHub 帳號一定要填對** —— 徽章是發到帳號上的,填錯會拿不到。

---

## 🦈 二、GitHub Achievements(官方成就徽章)

這是 **GitHub 官方內建**的成就系統,會顯示在你個人資料頁的左側。完成這場工作坊的流程,剛好就能解鎖其中兩個。

### 先滿足三個前提(缺一不可)

| 前提 | 怎麼做 | 為什麼 |
| :--- | :--- | :--- |
| **repo 必須是 Public** | repo → **Settings** → 最下方 **Danger Zone** → **Change repository visibility** | GitHub Achievements **只計算公開 repo 的活動**,私有 repo 一律不算 |
| **PR 要合併進 `main`** | 這是預設值,通常不用改 | 只有合併進預設分支的 PR 才計數 |
| **開啟成就顯示** | [github.com/settings/profile](https://github.com/settings/profile) → 勾選 **Show Achievements on my profile** | 沒勾選的話,拿到了也不會顯示 |

### 可以拿到哪些

#### 🦈 YOLO

| | |
| :--- | :--- |
| **條件** | 合併一個**沒有經過他人審查**的 Pull Request |
| **怎麼拿** | Step 5 動手做 A:把 Step 4 那個 AI 開的 PR 直接 **Merge pull request** |
| **難度** | ⭐ 完成工作坊就會拿到 |

#### 🦈 Pull Shark

| | |
| :--- | :--- |
| **條件** | 合併 **2 個** Pull Request(更高等級:16 / 128 / 1024 個) |
| **怎麼拿** | 再跑一次 `/fix-issue` 修第二個 issue,合併第二個 PR |
| **難度** | ⭐⭐ 需要多花約 5 分鐘 |

> 💡 你的 repo 裡有 **3 個** 自動建立的 issue,材料很夠。而且第二次幾乎不花力氣 —— **這正是 Agentic Workflow 的價值**。

#### ⚡ Quickdraw(額外加碼)

| | |
| :--- | :--- |
| **條件** | 開啟一個 issue 或 PR 後,**5 分鐘內**把它關閉 |
| **怎麼拿** | 在自己 repo 隨手開一個 issue(例如「測試」),馬上 Close |
| **難度** | ⭐ 30 秒 |

### 徽章沒出現?

- **徽章不是即時的** —— 通常幾分鐘到幾小時,偶爾更久。**先去做別的事**。
- 回頭檢查三個前提:repo 是 Public 嗎?PR 真的 merge 了(不是 close)嗎?成就顯示開了嗎?
- PR 必須是**合併(merged)**,不是**關閉(closed)**。兩者在 GitHub 上是不同狀態。
- 練習的最後一關會由系統**自動幫你檢查這些條件**,並把結果貼在你的練習 issue 裡。

---

## 🌐 三、你的作品

徽章會過期、會被遺忘,**作品不會**。這是今天最實在的收穫。

### 你的作品有兩個入口

#### 1. 公開網址(GitHub Pages)

```
https://<你的帳號>.github.io/<你的repo名稱>/
```

任何人點開就能用你做的待辦清單 App。**可以直接放進履歷、LinkedIn、個人網站。**

設定方式見 [Step 5 動手做 B]。啟用後 1 – 2 分鐘才會生效。

#### 2. 作品集頁(`PORTFOLIO.md`)

放在你 repo 根目錄的作品說明,包含:做了什麼、用了哪些技術、**怎麼用 AI 代理做出來的**、學到什麼。

> 💡 **這一點很值得說出來**:比起「我做了一個待辦清單」,
> 「我用 Agent Mode + MCP + 自訂 agentic workflow 做出來,而且 AI 自己開了 PR」是完全不同層次的敘事。

### 加上完成徽章

把這一行貼在你的 `README.md` 或 `PORTFOLIO.md` 最上方:

```markdown
![工作坊完成徽章](https://img.shields.io/badge/GitHub_Copilot_實戰工作坊-已完成-1F883D?style=for-the-badge&logo=githubcopilot&logoColor=white)
```

顯示效果:

![工作坊完成徽章](https://img.shields.io/badge/GitHub_Copilot_實戰工作坊-已完成-1F883D?style=for-the-badge&logo=githubcopilot&logoColor=white)

其他可以搭配的徽章:

```markdown
![Agent Mode](https://img.shields.io/badge/Agent_Mode-已實作-1E2761?style=flat-square)
![MCP](https://img.shields.io/badge/MCP-已整合-1E2761?style=flat-square)
![Agentic Workflow](https://img.shields.io/badge/Agentic_Workflow-已建立-1E2761?style=flat-square)
```

---

## 📋 結業檢查清單

- [ ] repo 已設為 **Public**
- [ ] 個人資料已勾選 **Show Achievements on my profile**
- [ ] 至少 1 個 PR 已**合併**進 `main` → 🦈 YOLO
- [ ] 第 2 個 PR 也合併了 → 🦈 Pull Shark
- [ ] GitHub Pages 已啟用,網址打得開
- [ ] `PORTFOLIO.md` 已建立,徽章已貼上
- [ ] **已填寫完成登記表** → 🏅 工作坊認證徽章

---

## 🎓 想再往下走?

- [GitHub Foundations 認證](https://resources.github.com/learn/certifications/) —— GitHub 官方付費認證考試
- [GitHub Skills](https://skills.github.com/) —— 更多官方免費互動課程
- [GitHub Education](https://education.github.com/) —— 學生 / 教師可免費升級 Copilot Pro
