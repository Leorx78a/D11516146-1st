# 📦 解答區(這不是作弊,是保險)

這個資料夾放了**每一關的完整解答檔案**。

## 什麼時候該用它?

只要遇到下面任何一種情況,**直接用解答檔推關,不要猶豫**:

- ⏱️ **卡在同一關超過 5 分鐘** —— 先跟上進度,細節回家再研究。
- 🔋 **Copilot 額度用完了** —— 免費版的 chat / agent 用量有限,這是預期內的狀況。
- 💥 **檔案改得太亂,救不回來了** —— 直接用解答檔覆蓋,重新開始。
- 🌐 **網路不穩,agent 一直失敗** —— 現場 Wi-Fi 的日常。

用解答檔一樣會通過自動檢查、一樣會推進到下一關,**學習不會中斷**。

> 💡 建議:即使用了解答檔,也花 30 秒**打開檔案看一眼 AI 本來應該產出什麼**。
> 這場工作坊的重點是理解 Agent Mode / MCP / Agentic Workflow 在做什麼,不是自己手打程式碼。

---

## 各關解答對照表

| 關卡 | 解答檔案 | 要複製到哪裡 |
| :--- | :--- | :--- |
| **Step 1** | `step-1/index.html`<br>`step-1/styles.css`<br>`step-1/app.js` | 專案**根目錄** |
| **Step 2** | `step-2/index.html`<br>`step-2/styles.css`<br>`step-2/app.js`<br>`step-2/CHANGELOG.md` | 專案**根目錄**(覆蓋 Step 1 的版本) |
| **Step 3** | `step-3/mcp.json` | `.vscode/mcp.json` |
| **Step 4** | `step-4/copilot-instructions.md`<br>`step-4/fix-issue.prompt.md` | `.github/copilot-instructions.md`<br>`.github/prompts/fix-issue.prompt.md` |
| **Step 5** | `step-5/PORTFOLIO.md` | 專案**根目錄** |

---

## 複製指令(在專案根目錄執行)

### Step 1

```bash
cp solutions/step-1/index.html solutions/step-1/styles.css solutions/step-1/app.js .
```

### Step 2

```bash
cp solutions/step-2/index.html solutions/step-2/styles.css solutions/step-2/app.js solutions/step-2/CHANGELOG.md .
```

### Step 3

```bash
mkdir -p .vscode && cp solutions/step-3/mcp.json .vscode/mcp.json
```

### Step 4

```bash
mkdir -p .github/prompts
cp solutions/step-4/copilot-instructions.md .github/copilot-instructions.md
cp solutions/step-4/fix-issue.prompt.md .github/prompts/fix-issue.prompt.md
```

### Step 5

```bash
cp solutions/step-5/PORTFOLIO.md .
```

> ⚠️ `PORTFOLIO.md` 裡有一行 GitHub Pages 網址是**佔位文字**,複製後請換成你自己的網址。
> 檔案裡的相對連結是以**專案根目錄**為基準寫的,複製到根目錄後就會正確。

> 🪟 **Windows 使用者**:上面的指令請在 **Git Bash** 執行。
> 如果你用的是 PowerShell,把 `cp` 換成 `Copy-Item`、`mkdir -p X` 換成 `New-Item -ItemType Directory -Force X`,或直接在 VS Code 的檔案總管裡拖曳複製也可以。

---

## 複製完之後別忘了推關

```bash
git add .
git commit -m "step N: 使用解答檔完成"
git pull --rebase
git push
```

推上去之後,回到你的 Exercise issue,機器人會在幾十秒內貼出下一關。
