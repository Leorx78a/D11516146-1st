# ⚙️ 環境準備與檢查清單

> ⏰ **強烈建議在活動前一天完成**。現場才裝軟體、才申請帳號,120 分鐘會不夠用。

---

## 一、必裝的四樣東西

| # | 項目 | 下載連結 | 怎麼確認裝好了 |
| :-: | :--- | :--- | :--- |
| 1 | **GitHub 帳號** | [註冊](https://github.com/signup) | 能登入 github.com |
| 2 | **Visual Studio Code** | [下載](https://code.visualstudio.com/) | 能開啟,`說明 → 關於` 版本是最新的 |
| 3 | **Git** | [下載](https://git-scm.com/downloads) | 終端機執行 `git --version` 有版本號 |
| 4 | **Copilot 擴充套件** | 見下方 | Chat 面板打得開 |

> 🪟 **Windows 使用者**:安裝 Git 時會一併裝上 **Git Bash**。本教材的指令都建議在 Git Bash 執行(VS Code 終端機右上角的 `+` 旁邊可以選擇 Git Bash)。

---

## 二、啟用 GitHub Copilot

1. 到 [github.com/settings/copilot](https://github.com/settings/copilot)
2. 如果你還沒啟用過,選擇 **Copilot Free** 即可 —— **免費版足以完成本次工作坊**
3. 確認頁面顯示 Copilot 已啟用

### 🎓 學生 / 教師請務必先做這件事

如果你是**在學學生或教職員**,請申請 [GitHub Education](https://education.github.com/discount_requests/application),**可免費升級 Copilot Pro**,額度充裕非常多。

> ⏳ 審核可能需要幾天,**請提早申請**。

### 🔋 關於免費版的額度(請務必了解)

Copilot 免費版的 **chat 與 agent 使用量是有限的**(每月固定額度,程式碼自動補完另外計算)。

本工作坊已針對這點設計:

- 全程 agent 回合控制在 **11 次以內**
- 提示詞刻意寫得完整,一次交辦清楚,不靠來回追問
- 每一關都有 [`solutions/`](../solutions/) 解答檔,**額度用完也能完成所有關卡**

👉 **開始前請先確認你這個月的額度還沒用完**(到 [github.com/settings/copilot](https://github.com/settings/copilot) 查看用量)。

---

## 三、安裝 VS Code 擴充套件

> ⚠️ 前置檢查：請務必先更新 VS Code！最新版本的 GitHub Copilot 相關功能已直接整合至 VS Code 核心中。為了確保你能順利體驗最新介面，請先點擊左下角齒輪 ⚙️ 選擇「檢查更新 (Check for Updates)」，更新並重啟軟體。

在 VS Code 按 <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>X</kbd> 打開擴充套件面板,搜尋並安裝:

| 擴充套件 | 發行者 | 必要性 |
| :--- | :--- | :---: |
| **GitHub Copilot Chat** | GitHub |💡 自動附帶：可以看是否為最新版本 |
| **Live Preview** | Microsoft | 🔸 建議(能在 VS Code 內直接預覽網頁) |

安裝完成後,**在 VS Code 左下角的帳號圖示登入你的 GitHub 帳號**。

---

## 四、✅ 開始前的六項檢查

請一項一項確認,**全部打勾才開始**:

- [ ] **1.** VS Code 左下角帳號圖示顯示已登入 GitHub
- [ ] **2.** 按 <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>I</kbd>(macOS:<kbd>Cmd</kbd>+<kbd>Ctrl</kbd>+<kbd>I</kbd>)能打開 **Chat** 面板
- [ ] **3.** Chat 輸入框下方的**模式下拉選單裡看得到 `Agent`**
- [ ] **4.** 在 Chat 隨便問一句(例如「你好」)能得到回覆 —— 代表 Copilot 真的通了
- [ ] **5.** 終端機執行 `git --version` 有正常輸出
- [ ] **6.** 終端機執行 `git config --global user.name` 和 `git config --global user.email` 有值

> 🔧 **第 6 項沒有值的話**,執行(換成你自己的資訊):
> ```bash
> git config --global user.name "你的名字"
> git config --global user.email "你的GitHub註冊信箱"
> ```

---

## 五、找不到 Agent 模式?

| 檢查項目 | 怎麼做 |
| :--- | :--- |
| VS Code 版本太舊 | `說明 → 檢查更新`,更新到最新版後重開 |
| Copilot 擴充套件太舊 | 擴充套件面板 → GitHub Copilot Chat → 有 **更新** 按鈕就按 |
| 重載視窗 | 命令面板 <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> → `Developer: Reload Window` |
| 設定被關掉 | 命令面板 → `喜好設定: 開啟使用者設定` → 搜尋 `chat.agent`,確認是啟用的 |
| 公司電腦有政策限制 | 若你的 Copilot 是組織提供的,可能被管理員關閉了 agent 功能,請洽 IT |

---

## 六、備援方案:用 GitHub Codespaces

如果你的電腦裝不了 VS Code、或公司網路擋住了,可以改用**瀏覽器版**:

1. 到你的 repo 頁面
2. 點綠色的 **Code** → **Codespaces** 頁籤 → **Create codespace on main**
3. 等它開好(約 1 – 2 分鐘),你會得到一個瀏覽器裡的 VS Code

> ⚠️ **注意**:
> - 免費帳號每月有 Codespaces 使用額度(約 60 小時 / 2 核心)
> - Codespaces 內**同樣可以用 Agent Mode 和 MCP**,操作方式完全一樣
> - 在 Codespaces 裡的檔案變更,一樣要 commit + push 才會推關

---

## 七、還是不行?

- 現場請直接舉手找講師
- 或參考 [疑難排解](troubleshooting.md)
- **最壞的情況**:跟旁邊的人一組看同一台電腦,一樣能學到東西 —— 觀念比手速重要
