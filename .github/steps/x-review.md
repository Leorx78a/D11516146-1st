## 🎉 完成了!你剛剛做了什麼?

120 分鐘前,你的 repo 裡什麼都沒有。現在你有:

- 一個**功能完整的待辦清單網頁 App**,而且從頭到尾沒有自己手打程式碼
- 一份 **MCP 設定**,讓 AI 能查官方文件、讀你的 GitHub
- 一份**可重複執行的劇本**,讓 AI 自動讀 issue → 改程式 → 開 PR
- 一個**公開的作品網址**與作品集頁,可以直接放進履歷
- 以及最重要的:**四種把 AI 搞砸的東西救回來的方法**

---

### 🏅 別忘了你的獎勵

| | 獎勵 | 現在該做什麼 |
| :---: | :--- | :--- |
| 🏅 | **工作坊官方認證徽章** | 還沒填**完成登記表**的話,[**現在就去填**](https://github.com/matsurigoto/copilot-workshop-agent-mode-mcp/issues/new?template=workshop-completion.yml&labels=completion) —— 我們依名單發放,沒登記就拿不到 |
| 🦈 | **YOLO** | 合併一個 PR 就有了。上面那則「徽章條件檢查」留言可以看你達成了沒 |
| 🦈 | **Pull Shark** | 還差一個?再跑一次 `/fix-issue` 修下一個 issue,合併第二個 PR 就到手 |
| 🌐 | **你的作品** | Pages 還沒開就回去 Settings → Pages 開一下,網址可以直接放履歷 |

> ⏳ 徽章不是即時的,通常要幾分鐘到幾小時。
> 沒出現的話先檢查:repo 是 **Public** 嗎?PR 是 **merged** 不是 closed 嗎?[個人設定](https://github.com/settings/profile)的 **Show Achievements on my profile** 勾了嗎?
>
> 📖 完整說明:[docs/badges.md](https://github.com/{{full_repo_name}}/blob/main/docs/badges.md)

---

### 🔑 三個核心觀念,各一句話

| 觀念 | 一句話 |
| :--- | :--- |
| **Agent Mode** | 你給的是**目標**,不是步驟 —— AI 自己決定要開哪些檔案、執行什麼指令,做錯了自己修 |
| **MCP** | AI 的**通用插座** —— 讓它走出你的電腦,連上官方文件、GitHub、資料庫、任何服務 |
| **Agentic Workflow** | 把**會重複做的多步驟工作**寫成檔案,存進 repo,一行指令重複執行、全團隊共用 |

**它們是疊起來的:** Agent Mode 給了 AI 手,MCP 給了它更長的手,Agentic Workflow 教它怎麼用這雙手做完整件事。

---

## 📝 五題測驗

答對四題以上,代表你今天真的帶走了東西。**先自己想,再點開答案。**

---

**第 1 題** — Agent Mode 與 Ask / Plan 模式最大的差別是什麼?

- **A.** Agent Mode 只是回答速度比較快
- **B.** Agent Mode 一次只能修改一個檔案
- **C.** Agent Mode 能**自行決定要開啟與修改哪些檔案、執行終端機指令,並根據執行結果自我修正**
- **D.** Agent Mode 必須付費才能使用

<details>
<summary>👉 看答案與解析</summary>

**正確答案:C**

- **Ask** 只回答問題,不動你的檔案(問路人)
- **Plan** 根據你的需求通盤分析，拆解出多步驟的具體執行計畫(請人幫忙規劃)
- **Agent** 自己排工作清單、自己決定要碰哪些檔案、會執行指令、看到錯誤會回頭修(請一組工班施工)

**B 錯**:Agent Mode 最擅長的就是**跨多個檔案**同時修改 —— 你在 Step 2 就一次改了三個檔案。
**D 錯**:免費版就能用 Agent Mode,只是 chat / agent 的用量有限制。

</details>

---

**第 2 題** — 關於 MCP(Model Context Protocol),下列敘述何者**正確**?

- **A.** MCP 是一種新的程式語言
- **B.** MCP 是一個**開放協定**,讓 AI 代理能連接外部工具與資料來源;在 VS Code 中用 `.vscode/mcp.json` 設定
- **C.** MCP 只能在 GitHub 網站上使用,無法在本機編輯器裡用
- **D.** 每個 MCP Server 都必須付費並申請 API 金鑰

<details>
<summary>👉 看答案與解析</summary>

**正確答案:B**

MCP 常被形容成「**AI 的 USB-C**」—— 一個通用接頭。服務方提供 MCP Server,任何支援 MCP 的 AI 工具都能立刻使用,不必為每個組合各寫一套整合。

**D 錯**:你今天用的 **Microsoft Learn MCP**(`https://learn.microsoft.com/api/mcp`)就是**完全免費、免登入、免 API 金鑰**的。

> 🔐 但別忘了安全面:MCP Server 會執行程式碼、代表你存取服務。**只安裝信任來源**,授權對話框跳出來時**要看清楚再按 Continue**。

</details>

---

**第 3 題** — Agent 把程式碼改壞了,而且**還沒有 commit**。最快的還原方式是?

- **A.** 使用 Chat 中該回合的 **Restore Checkpoint**,或在終端機執行 `git restore .`
- **B.** 重新 `git clone` 整個 repo
- **C.** 只能一行一行手動改回來
- **D.** 關掉 VS Code 重開,變更就會自動消失

<details>
<summary>👉 看答案與解析</summary>

**正確答案:A**

還原有五層防線,**由輕到重**:

| 層級 | 情境 | 動作 |
| :--- | :--- | :--- |
| ① | 剛改壞,還沒 commit | Chat 的 **Restore Checkpoint** |
| ② | 想丟掉所有未 commit 變更 | 原始檔控制 **Discard All**,或 `git restore .` + `git clean -fd` |
| ③ | 已 commit、還沒 push | `git reset --hard HEAD~1` |
| ④ | 已經 push 出去了 | `git revert <sha>` 再 push(**不要 force push**) |
| ⑤ | 全毀 | 從 template 重建一個 repo |

**D 錯**:檔案已經寫進磁碟了,重開 VS Code 不會還原。

> 💡 **最好的還原,是動手前先 commit。** 每一關開始前先存個檔,你永遠回得去。

</details>

---

**第 4 題** — 下列哪一項最能描述 **Agentic Workflow**?

- **A.** 在聊天視窗裡問一個問題並得到答案
- **B.** 把**多步驟、可重複的工作**寫成 instructions / prompt 檔案存進 repo,讓 agent 能重複執行並串接 MCP 工具
- **C.** 用 Copilot 自動補完你正在打的那一行程式碼
- **D.** 在 GitHub 網站上手動建立一個 Pull Request

<details>
<summary>👉 看答案與解析</summary>

**正確答案:B**

你在 Step 4 做的就是這件事:

> 🧩 **規矩(`copilot-instructions.md`) + 劇本(`fix-issue.prompt.md`) + 手腳(GitHub MCP) = Agentic Workflow**

關鍵在於它**可版控、可 review、可全團隊共用**,而不是躺在某個人的聊天記錄裡。

**C 是 code completion**(行內自動補完),那是 Copilot 最早的功能,和 agentic workflow 是不同層次的東西。

</details>

---

**第 5 題** — 使用 **GitHub Copilot 免費版**進行這類實作時,下列做法何者**最合適**?

- **A.** 每個小改動都開一次新的 agent 對話,反正想到什麼就問什麼
- **B.** 一律切換到最貴、最強的模型,確保品質
- **C.** 免費版不支援 Agent Mode,只能看講師示範
- **D.** **把需求一次描述完整清楚**以減少來回回合數;額度不足時改用 repo 內的 `solutions/` 對照完成

<details>
<summary>👉 看答案與解析</summary>

**正確答案:D**

- **免費版可以用 Agent Mode 和 MCP**(所以 C 錯),但 chat / agent 的用量是有限的
- 這也是為什麼今天的提示詞都寫得**又長又完整** —— 一次把規格交辦清楚,而不是問十次慢慢逼近
- **這不只是省額度,更是與 AI 代理協作的正確姿勢**:模糊的目標得到模糊的結果

**B 錯**:今天的任務用預設模型(自動選擇)完全做得到,換更貴的模型只是更快燒完額度。

> 🎓 **順帶一提**:如果你是學生或教師,[GitHub Education](https://education.github.com/discount_requests/application) 可以**免費升級 Copilot Pro**,額度充裕很多。

</details>

---

## 🚀 回家可以繼續玩的事

**這個 repo 是你的,留著繼續改。** 幾個建議方向:

1. **把剩下的 issue 修完** —— 再跑兩次 `/fix-issue`,體會劇本的價值就在「第二次以後」(順便把 🦈 Pull Shark 拿到手)
2. **自己寫一個新劇本** —— 例如 `code-review.prompt.md`,讓 AI 用你的標準審查 PR
3. **接更多 MCP Server** —— 試試 [Playwright MCP](https://github.com/microsoft/playwright-mcp),讓 AI 真的打開瀏覽器操作你的網頁並截圖驗證
4. **建立自訂 agent** —— 在 `.github/agents/` 裡定義一個只做前端無障礙檢查的專屬 agent

## 📚 延伸資源

- [VS Code:使用 Agent Mode](https://code.visualstudio.com/docs/copilot/chat/chat-agent-mode)
- [VS Code:設定 MCP Server](https://code.visualstudio.com/docs/copilot/customization/mcp-servers)
- [VS Code:Prompt 檔案](https://code.visualstudio.com/docs/copilot/customization/prompt-files)
- [VS Code:自訂指令](https://code.visualstudio.com/docs/copilot/customization/custom-instructions)
- [Model Context Protocol 官方網站](https://modelcontextprotocol.io/)
- [Microsoft Learn MCP Server](https://learn.microsoft.com/training/support/mcp)
- [GitHub MCP Server(原始碼)](https://github.com/github/github-mcp-server)
- [官方 MCP Server 清單](https://github.com/modelcontextprotocol/servers)

---

**謝謝你今天的參與!** 🙌
