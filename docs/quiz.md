# 📝 五題測驗

> 這份測驗和練習結束時機器人貼在 issue 裡的是**同一份**,放在這裡方便你隨時回來複習。
> 答對四題以上,代表你今天真的帶走了東西。**先自己想,再點開答案。**

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

---

## 📚 想再深入一點

- [VS Code:使用 Agent Mode](https://code.visualstudio.com/docs/copilot/chat/chat-agent-mode)
- [VS Code:設定 MCP Server](https://code.visualstudio.com/docs/copilot/customization/mcp-servers)
- [VS Code:Prompt 檔案](https://code.visualstudio.com/docs/copilot/customization/prompt-files)
- [Model Context Protocol 官方網站](https://modelcontextprotocol.io/)
- [還原指南](rollback.md) — 第 3 題的完整版
