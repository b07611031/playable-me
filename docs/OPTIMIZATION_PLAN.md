# Playable Me — 優化計畫（架構與遊戲設計 review）

- **日期：** 2026-11-16
- **基準：** `main` @ `2f6eea3`（v0.4）
- **狀態：** 提案。本文件只列建議，沒有修改任何程式。O2、O4 已於 2026-11-17 決定；執行順序與狀態改在 [`docs/TASKS.md`](TASKS.md) 追蹤。
- **注意：** 本文件寫作時，PR #9、#11 尚未合併，分析沒有算進它們。兩者落地後，依 `docs/TASKS.md` 的 T0.4 重新核對每個項目與行號。
- **讀者：** 專案擁有者，以及之後執行各項目的 agent（Opus、Sonnet、Sol 等）。

## 0. 取證方式

1. 讀完 `src/`、`scripts/`、`docs/`、`.github/workflows/` 的全部檔案。
2. 執行 `npm run test:maze`、`test:case`、`test:codex`、`build`、`test:dist`，五項全部通過。
3. 用 Playwright 驅動 Chrome，在 390×844 的手機視窗實際操作首頁、地圖、三個 Station、圖鑑與三個小遊戲。

標示「已重現」的項目是第 3 步實際操作看到的結果。標示「讀碼」的項目只從程式碼推得。

## 1. 用語

| 用語 | 意思 |
|---|---|
| Station | 三個主題區：AI Lab、Quest Field、Game Room |
| 故事 | Station 裡的對話內容，共 9 則 |
| 角色 | YUN CODEX 裡的 Yun 造型，共 9 個，與故事一對一對應 |
| 小遊戲 | 每個 Station 各一個：連點、迷宮、閃隕石 |
| 執行者 | 接手實作某個項目的 agent |

## 2. 結論

**最需要調整的結構：三個 Station 的內容與規則沒有單一來源。**

「三個 Station、各三則故事、各三個角色、各一個小遊戲」是這個產品的核心模型。現在這個模型分散在 `src/` 的 7 個檔案裡，以條件判斷與字串的形式存在。改一個門檻或一個標題，要同時改好幾處，而且已經有地方改漏了（見 A1 的證據）。

這個問題排第一，是因為其他問題都從它長出來：

- 狀態難管理（A4），因為每個 Station 的解鎖規則寫在 `App.tsx` 的巢狀三元運算式裡。
- 測試只能比對原始碼字串（A2），因為規則和 React 元件綁在一起，測試無法 import。
- 遊戲設計想調整（G4–G7）時，每一項都要動到這些散落的規則。

另外有 3 個訪客直接看得到的缺陷（G1–G3）。這 3 項很小，建議在印明信片、產生 QR code 之前先修。

## 3. 評估準則

以下準則摘自 `AGENTS.md` 與 `docs/PRODUCT.md`。每個優化項目都標明影響哪一條。

| 代號 | 準則 |
|---|---|
| T1 | 訪客在 60–90 秒內認識 AI Builder、Fast Learner、Passionate Gamer 三個身份 |
| T2 | 小遊戲是發現故事的方式，不是閱讀故事的門檻 |
| T3 | GitHub、LinkedIn 連結不用玩遊戲就能到達 |
| T4 | 手機優先；中英雙語；鍵盤與觸控都能操作；尊重 reduced-motion |
| T5 | 公開網站穩定；每個變更都能在 PR 裡被審查 |
| T6 | 不同 agent、不同 session 能靠 repo 內的文件接手 |

## 4. 優化項目總表

規模：S 約半天以內，M 約 1–2 天，L 超過 2 天（以單一執行者估算，僅供排序）。

| ID | 項目 | 準則 | 規模 | 建議執行者 | 建議 skill（細節見第 7 節） |
|---|---|---|---|---|---|
| **Wave 0：訪客看得到的缺陷** | | | | | |
| G1 | 重新整理後，已讀完的故事又被鎖住 | T2 | S | Sonnet | `systematic-debugging` |
| G2 | 手機版標頭的語言與連結按鈕被裁切 | T3 T4 | S | Sonnet | `web-design-guidelines` |
| G3 | 小遊戲進行中點到背景，遊戲直接關閉 | T4 | S | Sonnet | `systematic-debugging` |
| **Wave 1：基礎結構** | | | | | |
| A1 | Station 的內容與規則集中成單一來源 | T5 T6 | M | Opus 或 Sol | `writing-plans` |
| A2 | 小遊戲規則抽成純函式，換成真正的單元測試 | T5 | M | Sonnet | `test-driven-development` |
| A3 | 加入 formatter 與 linter（必須在 A2 之後） | T5 T6 | S | Sonnet | 不需要 |
| A4 | 拆分 `App.tsx`，集中進度狀態 | T5 | M | Opus 或 Sol | `vercel-composition-patterns` |
| A5 | 共用 Modal 元件 | T4 | S | Sonnet | `web-design-guidelines` |
| **Wave 2：遊戲設計** | | | | | |
| G4 | 統一解鎖規則：故事預設可讀 | T1 T2 | S | Opus 或 Sol | `brainstorming` |
| G5 | 圖鑑裡的真實經歷不該鎖在遊戲成績後面 | T1 T2 | S | Opus 或 Sol | `brainstorming` |
| G6 | AI Lab 小遊戲與 Builder 訊息不貼合 | T1 | M | Opus 或 Sol | `brainstorming`、`playwright-interactive` |
| G7 | 兩套進度（3 個徽章、9 個角色）互不說明 | T1 | S | Opus 或 Sol | `brainstorming` |
| G8 | 讀完全部內容要點 35–36 下 | T1 | S | Sonnet | 不需要 |
| G9 | 回饋感不足；結尾的履歷連結是空的 | T1 T3 | S–M | Sonnet | 不需要 |
| **Wave 3：對外品質** | | | | | |
| A6 | 網址路由與深連結 | T1 T3 | S | Sonnet | 不需要 |
| A7 | repo 維護項目（lockfile、版本號、分享預覽等 7 小項） | T5 | S | Sonnet | 不需要 |
| U1 | UI 稽核與視覺優化（銜接 roadmap Phase 2–3） | T1 T4 | L | Opus 或 Sol | `frontend-design`、`impeccable` |

## 5. 遊戲設計項目

### G1 重新整理後，已讀完的故事又被鎖住（已重現）

**現況。** 操作步驟：進 AI Lab → 點「READ ALL STORIES INSTEAD」→ 讀完 3 則故事 → 重新整理 → 再進 AI Lab。畫面同時顯示「STORIES ARE LOCKED」和「ACHIEVEMENT UNLOCKED!」，故事卡是 0 張。

**原因。** `skipGames`、`gameStarted`、`fieldStarted` 只存在記憶體（`src/App.tsx:55-56,65`）。已讀清單 `opened` 則寫入 localStorage（`App.tsx:70`）。重新整理後，兩者不一致。Quest Field 與 Game Room 也有同樣問題：開始遊戲但沒拿到任何獎勵就離開，重新整理後故事會再被隱藏。

**解決方向。** 兩個做法擇一：

1. 最小修正：把這三個旗標併入持久化的進度。
2. 直接做 G4。故事預設可讀之後，這三個旗標可以全部刪掉，這個缺陷也跟著消失。

擁有者已同意 G4（O2，2026-11-17），所以選做法 2，G1 併入 G4。

**驗收。** 在瀏覽器測試加一段：略過 → 讀完 → 重新整理 → 斷言 3 張故事卡仍可點。

### G2 手機版標頭的語言與連結按鈕被裁切（已重現）

**現況。** 量測標頭 4 個按鈕的邊界：

| 視窗寬度 | 語言按鈕 | 連結按鈕 |
|---|---|---|
| 390px | 336–401px，右側 11px 在畫面外 | 411–454px，完全在畫面外 |
| 360px | 284–341px，完整 | 346–384px，右側 24px 在畫面外 |

頁面沒有水平捲動，所以畫面外的部分點不到。連結仍可從底部導覽列的 LINKS 進入。語言切換只有標頭這一個入口。

**原因。** 標頭放了版本號 `v0.4`，以及兩個功能相同的圖鑑按鈕（獎盃計數、書本圖示，都呼叫 `openCodex()`，`App.tsx:91`）。

**解決方向。** 窄螢幕只留一個圖鑑入口，拿掉版本號或移到頁尾。語言切換必須完整顯示。

**驗收。** 現有的 `scripts/browser-smoke.mjs` 已經跑 390×844，但沒有檢查按鈕位置。加一個斷言：標頭每個按鈕的邊界都在視窗內。再加一個 360px 的視窗。

### G3 小遊戲進行中點到背景，遊戲直接關閉（已重現）

**現況。** 太空船遊戲進行中，點對話框外的區域，遊戲立刻關閉，進度消失。在 390px 視窗，對話框左右各有 20px 的背景可以被點到。

**原因。** 三個小遊戲的外層都寫了 `onMouseDown` 關閉（`SpaceQuest.tsx:79`、`SharkMaze.tsx:63`、`LabClicker.tsx:31`）。這個行為不分遊戲是否進行中。連點遊戲要求快速點擊，誤觸機率最高。

**解決方向。** 遊戲狀態為 `running` 時，背景點擊不關閉。做 A5 之後，改成 Modal 的 `dismissible` 屬性。

**驗收。** 瀏覽器測試：開始遊戲 → 點座標 (5,5) → 斷言對話框仍在。

### G4 統一解鎖規則：故事預設可讀

**現況。** 三個 Station 用三種規則決定故事卡何時出現（`App.tsx:86`）：

| Station | 故事卡出現的條件 |
|---|---|
| AI Lab | 連點達 5、12、22 次，分別出現 1、2、3 張 |
| Quest Field | 按下「開始遊戲」就出現 3 張，不用贏 |
| Game Room | 按下「開始遊戲」就出現 3 張，不用贏 |

另外三個 Station 都有「READ ALL STORIES INSTEAD」。訪客第一次進 Station 時，預設看到的是鎖頭圖示與「STORIES ARE LOCKED」。

這與兩份既有文件的方向不一致。`docs/DECISIONS.md` 寫「Distinguish game reward / story completion」，`AGENTS.md` 寫遊戲「not a barrier」。實際上故事讀得到，但預設畫面呈現的是鎖。

**解決方向。** 故事卡預設顯示。小遊戲只解鎖角色。這樣可以刪掉略過按鈕、三個旗標，以及 `unlockedCount` 的整段判斷。訪客每個 Station 少點 1 下。

**擁有者已同意（O2，2026-11-17）。** 這會改變 `docs/minigame-rewards-v031.md` 描述的行為，實作時在該文件開頭註明已被 G4 取代。

**驗收。** 新訪客進任一 Station，不點任何東西就看到 3 張故事卡。玩小遊戲後，對應角色解鎖。規則同步寫進 `docs/DECISIONS.md`。

### G5 圖鑑裡的真實經歷不該鎖在遊戲成績後面（讀碼，並以實測確認）

**現況。** 圖鑑的每個角色有 `evidence`、`detail`、`takeaway` 三段文字。這些是全站最具體的經歷。其中一部分沒有出現在故事裡，例如「Plantman 結合電腦視覺、手機與 LINE Bot」「臺大碩士研究」。

角色未解鎖時，圖鑑只顯示 `???` 與解鎖提示（`CharacterCodex.tsx:46-63`）。「READ ALL STORIES INSTEAD」不會解鎖角色。實測：略過遊戲並讀完 AI Lab 的 3 則故事後，圖鑑仍是 0/9。

所以沒時間玩的訪客看不到這 9 段經歷。其中 Tactical Yun 要撐完整場 10 顆隕石（最多被撞 2 次）才解鎖。

**解決方向。** 三個做法，由擁有者選：

1. 只鎖造型。未解鎖的角色維持黑色剪影，但 `evidence` 等文字照常顯示。
2. 把 `evidence` 搬進對應的故事對話，圖鑑只保留造型收藏。
3. 圖鑑加「顯示全部內容」開關，不影響收藏進度。

做法 1 改動最小，也保留收集的樂趣。

**需要擁有者決定。** `docs/yun-codex-spec-v1.md` 目前規定未解鎖角色「click gives only an unlock hint」，見第 9 節 O3。

### G6 AI Lab 小遊戲與 Builder 訊息不貼合

**現況。** 三個小遊戲與訊息的貼合程度不同：

| 小遊戲 | 玩法 | 與訊息的關係 |
|---|---|---|
| Spaceship Dodge | 左右閃 10 顆隕石，一場約 14 秒 | 強。重現 Yun 的第一個程式作業 |
| Ocean Maze | 收集潛水鏡、拳套、探險鞋，最短 24 步 | 中。道具對應三段學習經歷 |
| AI Power-Up Lab | 12 秒內點 22 下 | 弱。連點無法表達「拆解問題、在限制下找解法」 |

`docs/PRODUCT.md` 對 Builder 的訊息是「Sharp thinking, making AI usable in real settings」。`docs/roadmap-ui-experiment.md` Phase 1 第 2 點也已經提過，AI Lab 適合「問題 → 驗證 → 迭代」的決策互動。

**解決方向。** 三個候選，由擁有者選：

1. **分段處理。** 畫面有一條長影片和一個 GPU 記憶體上限。玩家把影片切成幾段，每段都不能超過上限。共 3 回合。這個玩法對應 `sam` 故事。
2. **需求拆解。** 出現 3 張模糊需求卡。玩家替每張卡從 2 個選項裡選出「可以先驗證的下一步」。這個玩法對應 `workflow` 故事。
3. **保留連點。** 只把三個門檻改名為流程階段。成本最低，貼合度也最低。

**限制。** 不論選哪一個：單場不超過 15 秒；鍵盤與觸控都能玩；尊重 reduced-motion；文案只能改寫既有故事的內容，不新增未經擁有者確認的經歷（`AGENTS.md` 的規定）。

**驗收。** 3–5 位試玩者玩完後，能不經提示說出這個小遊戲在講什麼。這是 `docs/PRODUCT.md` 成功條件第 3 點的做法。

### G7 兩套進度互不說明

**現況。** 網站有兩個進度數字：

- 徽章，共 3 個。讀完一個 Station 的 3 則故事得 1 個。顯示在地圖頁尾。
- 角色，共 9 個。靠小遊戲成績解鎖。顯示在標頭。

結尾畫面由徽章觸發（`App.tsx:78`）。略過遊戲、讀完全部故事的訪客會看到「ALL QUESTS COMPLETE」，同時標頭顯示 0/9。畫面上沒有任何文字說明這兩個數字的差別。

**解決方向。** 故事與角色本來就是一對一（`characters.json` 的 `storyId`）。把兩者放在同一張卡上：卡片顯示故事，旁邊是該故事的角色剪影。讀故事是內容，玩遊戲替角色上色。全站只剩一個清單、一個進度。

如果擁有者想保留兩套進度，至少替兩個數字加上標籤，例如「故事 6/9」「角色 2/9」。

### G8 讀完全部內容要點 35–36 下

**現況。** 實測：略過遊戲後，讀完 AI Lab 的 3 則故事要點 9 下。完整路徑的點擊數：

| 步驟 | 點擊數 |
|---|---|
| 首頁按「START EXPLORING」 | 1 |
| 每個 Station：進入 1、略過 1、讀 3 則故事 9 | 11 × 3 = 33 |
| 回地圖 2 次 | 2 |
| 合計（中文版） | 36 |

英文版是 35 下，因為 `water` 故事的英文只有 1 行，中文有 2 行。

另外，三個 Station 都讀完後，Station 內的「BACK TO MAP」會改跳結尾畫面（`App.tsx:78`），之後每次回地圖都要多點 1 下。

**解決方向。**

1. 做 G4，每個 Station 少 1 下。
2. 故事對話讀到最後一行時，按鈕改成「下一則故事」，直接接續。每個 Station 再少 2 下。
3. 結尾畫面只在第一次集滿時自動出現一次。

首頁已經在第一屏放了標語和三個身份。這一點做得好，維持不動。

### G9 回饋感不足；結尾的履歷連結是空的

**現況。**

- 小遊戲的回饋只有太空船被撞時閃一下。拿到道具、達到門檻、過關都沒有動態。
- 連結視窗有一列停用的「RESUME COMING SOON」，還有一句「Resume link will be added before public launch.」（`App.tsx:37,128`）。網站公開後，招募者會看到這句話。

**解決方向。**

- 替「達到門檻」「拿到道具」「過關」各加一個短動態，每個不超過 300 毫秒。reduced-motion 開啟時停用。音效維持 roadmap 的規定：預設靜音、可關閉。
- 履歷連結由擁有者提供。在提供之前，把那一列與說明文字拿掉。見第 9 節 O1。

## 6. 架構項目

### A1 Station 的內容與規則集中成單一來源

**現況。** 同一件事寫在很多地方：

| 事實 | 出現位置 |
|---|---|
| AI Lab 門檻 5、12、22 | 8 處，分布在 `LabClicker.tsx`、`App.tsx`、`CharacterCodex.tsx` |
| Station 與角色分組的對應（lab↔builder 等） | `App.tsx:84,100`、`CharacterCodex.tsx:9`、`scripts/check-codex.mjs` |
| Station 名稱 | `App.tsx:17,22,27` 與 `CharacterCodex.tsx:9` 各一份 |
| 角色名稱 | `characters.json` 與 `SpaceQuest.tsx:95-97` 各一份 |
| `Lang` 型別 | 宣告 5 次 |
| 雙語資料的形狀 | 故事用 `[en, zh]` 陣列，角色用 `{en, zh}` 物件 |

`App.tsx` 裡依 Station 分支的判斷有 21 處。6 個元件檔裡的語言判斷（`lang==='zh'?…:…` 或 `zh?…:…`）共 115 處。

已經發生的不一致：

1. AI Lab 第三個里程碑顯示「SOP Annotator」（`LabClicker.tsx:5`），但解鎖的故事標題是「Making ideas usable」。`docs/minigame-rewards-v031.md` 當時就標了「verify」，至今未處理。
2. 迷宮的道具早已改成潛水鏡、拳套、探險鞋，但兩處文案仍寫「珍珠 / pearls」（`App.tsx:108`、`SharkMaze.tsx:69`）。
3. 連點遊戲的中文提示寫「成績保留於這次瀏覽」（`LabClicker.tsx:43`）。實際上成績存在 localStorage，而且英文版沒有這句。
4. 太空船過關訊息，中文講故事卡，英文講穿越隕石帶，兩邊意思不同（`SpaceQuest.tsx:92`）。
5. Quest Field 的故事順序是 camino、water、arena。圖鑑與 `docs/PRODUCT.md` 的順序是 water、arena、camino。
6. `water` 故事的英文有 1 行，中文有 2 行（`App.tsx:24`）。

**解決方向。** 建立一份 Station 定義，其他檔案都從它讀取：

```ts
// src/content/stations.ts（示意）
export const stations: Station[] = [
  {
    id: 'lab',
    group: 'builder',
    name: { en: 'AI LAB', zh: 'AI 研究室' },
    accent: '#7abfdc',
    game: { kind: 'clicker', seconds: 12, thresholds: [5, 12, 22] },
    stories: [
      { id: 'plantman', roleId: 'student', title: { en: '…', zh: '…' }, lines: { en: ['…'], zh: ['…'] } },
    ],
  },
]
```

配套做法：

- 雙語資料統一成 `{ en, zh }`。型別要求兩個語言都必填，漏翻譯時編譯就失敗。
- 介面字串集中到 `src/content/ui.ts`，元件裡不再寫語言判斷。
- 小遊戲從 props 取得門檻與名稱，不自己寫死。
- `characters.json` 併入 Station 定義，或保留檔案但以 `roleId` 參照。

**驗收。** 在 repo 搜尋 `22`，門檻只出現在 Station 定義一處。把某個門檻改成別的數字，所有畫面文字跟著變。畫面與 A1 之前逐像素相同（用同一組截圖比對）。

**為什麼需要高推理模型。** 資料形狀一旦定下，A2、A4、G4–G7 都建立在它上面。先用 `writing-plans` 產出設計，經擁有者看過再實作。

### A2 小遊戲規則抽成純函式，換成真正的單元測試

**現況。** 現有測試不執行遊戲程式，只比對原始碼文字：

- `scripts/check-codex.mjs:31` 檢查 `SpaceQuest.tsx` 是否包含字串 `avoided>=5?2:avoided>=2?1:0`。
- `scripts/check-codex.mjs:23` 檢查 `App.tsx` 是否包含字串 `id:'plantman'` 這類片段。
- `scripts/check-maze.mjs` 用正規表示式從 `SharkMaze.tsx` 抓出地圖，再用自己另寫的一份鯊魚規則去模擬。起點、鯊魚位置、道具位置也是另外抄一份。

所以遊戲規則改壞時，測試可能照樣通過。反過來，只是調整空白，測試就會失敗。

**解決方向。**

1. 建立 `src/game/maze.ts`、`dodge.ts`、`clicker.ts`、`progress.ts`。這些檔案只放純函式，不 import React。
2. 元件改成呼叫這些函式，只負責畫面與輸入。
3. 加入 Vitest（與 Vite 共用設定）。測試直接 import 上述模組。
4. 迷宮的可解性搜尋保留，但改成呼叫 `maze.ts` 的移動與追逐函式。
5. 內容檢查改成 import Station 定義後驗證，取代字串比對。

**驗收。** `scripts/check-*.mjs` 不再讀取任何 `.tsx` 原始碼。故意把鯊魚改成每步都移動，測試會失敗。

### A3 加入 formatter 與 linter

**現況。** 原始碼是接近壓縮過的寫法：

- `src/style.css` 共 32KB，只有 57 行，最長的一行 17,713 個字元。
- `src/App.tsx` 共 27KB、136 行，最長的一行 1,538 個字元。
- `index.html` 只有 1 行。

`AGENTS.md` 要求每個變更都經過 PR 審查。在這種格式下，改一個字就是整行差異，審查者看不出改了什麼。這也讓 `style.css:56-57` 的 `.learner-collection` 這類已經沒人用的樣式難以發現。

**解決方向。** 加入 Prettier 與 ESLint（含 `react-hooks`、`jsx-a11y` 規則）。用一個獨立的 commit 只做格式化，並把該 commit 記入 `.git-blame-ignore-revs`。

**順序限制。** A3 必須排在 A2 之後。格式化會把 `avoided>=5?2:avoided>=2?1:0` 加上空白，也會把 `const MAP=[` 改成 `const MAP = [`。現有的 `check-codex.mjs` 與 `check-maze.mjs` 會因此失敗。

**驗收。** 格式化 commit 的建置產物與前一個 commit 功能相同（同一組瀏覽器測試通過）。CI 加入 `prettier --check` 與 `eslint`。

### A4 拆分 `App.tsx`，集中進度狀態

**現況。** `App.tsx` 一個元件包含 21 個 `useState`、5 個畫面、2 個對話框、全部故事內容，以及 5 個各自寫入 localStorage 的 effect（鍵名 `pm-opened`、`pm-outfits`、`pm-lab-tier`、`pm-game-tier`、`pm-lang`）。G1 的缺陷就是這種分散狀態造成的。

**解決方向。**

```
src/
  content/     stations.ts、ui.ts、types.ts            ← A1
  game/        maze.ts、dodge.ts、clicker.ts、progress.ts ← A2
  components/  Modal、PixelAvatar、CharacterSprite
  screens/     Home、WorldMap、StationScreen、Codex、Ending
  minigames/   SpaceQuest、SharkMaze、LabClicker
  styles/      tokens.css、base.css、各畫面一個檔
  App.tsx      只負責切換畫面
tests/         Vitest
```

- 進度用一個 `useProgress()` hook 管理，內部是 reducer。
- localStorage 改成單一鍵 `pm-progress`，內容帶 `version` 欄位。第一次載入時讀取舊的 5 個鍵並轉換。
- `style.css` 依畫面拆檔。顏色與間距抽成 CSS 變數，U1 會用到。

**驗收。** `App.tsx` 少於 80 行。畫面與拆分前逐像素相同。舊鍵的進度在升級後保留。

### A5 共用 Modal 元件

**現況。** 7 個對話框各自實作外層（`className="overlay"` 出現 7 次）。Escape 鍵只關得掉故事與連結兩個（`App.tsx:75`）；三個小遊戲、圖鑑詳情、解鎖預覽都沒有處理 Escape。原始碼裡沒有任何移動焦點或停用背景的程式，所以對話框開啟時，焦點留在背景，背景的按鈕仍可用 Tab 選到。（讀碼）

**解決方向。** 做一個以原生 `<dialog>` 與 `showModal()` 為基礎的 `Modal`。瀏覽器會處理焦點限制、Escape 與背景停用。提供 `dismissible` 屬性，G3 直接使用。

**驗收。** 7 個對話框都用 `Modal`。鍵盤測試：開啟後焦點在對話框內，Escape 關閉，關閉後焦點回到原按鈕。

### A6 網址路由與深連結

**現況。** 畫面切換只存在記憶體（`App.tsx:47`）。網址永遠是同一個。按瀏覽器的上一頁會直接離開網站。明信片的 QR code 也只能連到首頁。

**解決方向。** 用 hash 路由：`#/map`、`#/lab`、`#/field`、`#/game`、`#/codex`。hash 路由在 GitHub Pages 不需要額外設定，也不用新增套件（監聽 `hashchange` 即可）。同時支援 `?lang=zh`，讓中文明信片直接開中文版。

**驗收。** 直接開 `…/playable-me/#/lab?lang=zh` 會進到中文的 AI Lab。上一頁回到前一個畫面。

### A7 repo 維護項目

| # | 現況 | 解決方向 |
|---|---|---|
| 1 | repo 沒有 lockfile。CI 與部署每次用 `npm install` 重新解析版本，部署的套件可能與 PR 測過的不同 | 提交 `package-lock.json`，CI 與部署改用 `npm ci`，同步更新 `AGENTS.md` 的說明 |
| 2 | `package.json` 版本是 `0.1.0`，畫面寫死 `v0.4`（`App.tsx:91`） | 版本只寫在 `package.json`，用 Vite 的 `define` 注入 |
| 3 | 沒有 `public/`：沒有 favicon，沒有 `og:title`、`og:image` 等分享預覽標籤 | 加入 favicon 與分享預覽圖。連結貼到 LinkedIn 或通訊軟體時才會有標題和圖片 |
| 4 | JavaScript 載入失敗時畫面空白 | 在 `index.html` 加 `<noscript>`，內容是姓名、一句介紹、GitHub 與 LinkedIn 連結 |
| 5 | 字型用 CSS `@import` 從 Google Fonts 載入（`style.css:1`），會延後首次顯示，也是頁面載入時唯一的第三方請求（讀碼） | 改成自行託管字型檔。見第 9 節 O5 |
| 6 | `ci.yml` 與 `deploy.yml` 各寫一份相同的檢查步驟。部署流程沒有跑瀏覽器測試。瀏覽器測試跑的是開發伺服器，沒測過 `/playable-me/` 路徑下的正式建置 | 加一個 `npm run check` 統一入口。瀏覽器測試改對 `vite preview` 的正式建置執行。部署前必須通過同一組檢查 |
| 7 | `docs/` 有 3 份帶版本號的舊規格。`docs/AGENT_HANDOFF_PROMPT.md` 仍把已完成的 P0 列為目前階段 | 舊規格移到 `docs/archive/`。交接提示改成只指向 `docs/STATUS.md`，不重複寫階段 |

### U1 UI 稽核與視覺優化

這一項就是 `docs/roadmap-ui-experiment.md` 的 Phase 2 與 Phase 3。排在最後有兩個理由：

- roadmap 已決定「先增加遊戲互動，再優化 UI」，並要求 B→C 版本只改 UI。
- A4 把顏色與間距抽成 CSS 變數之後，視覺調整的差異才看得懂。

roadmap 的 Phase 0 寫明「尚未建立實測截圖與評分」。開始 U1 之前，先由執行者寫一支截圖腳本，在 1440×900 與 390×844 拍下首頁、地圖、三個 Station、故事對話框、圖鑑、三個小遊戲，存成 v0.4 基準。

## 7. Skill 對照

### 7.1 查核範圍

以下資訊在 2026-11-16 核對。`pbakaus/impeccable` 與 `Leonxlnx/taste-skill` 兩個 repo 經擁有者授權後直接讀取。其餘 skill 透過網路搜尋與第三方 skill 索引頁核對。各索引頁列出的星數彼此差距很大，不要當作依據。安裝前，執行者仍要記下安裝時的 commit。

roadmap 裡的兩個候選名稱，對應結果如下：

| roadmap 的稱呼 | 對應的 repo | 判斷依據 |
|---|---|---|
| Taste-Skill | `Leonxlnx/taste-skill` | 名稱相同 |
| Impact-Cable | 很可能是 `pbakaus/impeccable` | 發音相近；貼文說「23 組指令」，該專案目前列出 24 個指令，其中 1 個是已停用的別名。這是推論，需擁有者確認 |

### 7.2 建議使用

| Skill | 來源 | 用在哪些項目 | 用法與注意事項 |
|---|---|---|---|
| `writing-plans` | `obra/superpowers` | A1、A4 | 先產出分步驟的實作計畫，擁有者看過再動手 |
| `executing-plans` | `obra/superpowers` | A1、A4 | 另一個 session 依計畫分批執行，中間設檢查點 |
| `test-driven-development` | `obra/superpowers` | A2、G1、G3 | 先寫會失敗的測試，再改程式 |
| `systematic-debugging` | `obra/superpowers` | G1、G3 | 先確認根因再修 |
| `verification-before-completion` | `obra/superpowers` | 全部 | 宣稱完成前實際跑檢查。對應 `AGENTS.md`「不要把 CI 通過當成實機驗收」 |
| `brainstorming` | `obra/superpowers` | G4–G7 | 把設計選項與取捨整理成規格，交擁有者決定 |
| `vercel-composition-patterns` | `vercel-labs/agent-skills` | A4、A5 | 元件拆分方式 |
| `web-design-guidelines` | `vercel-labs/agent-skills` | G2、A5、U1 | 依 100 多條規則稽核 UI 程式碼，輸出 `檔案:行號`。這個 skill 每次執行都從網路下載規則並照著做，使用方式見 7.6.3 |
| `playwright-interactive` | `openai/skills` | G6 | 給 Codex 用。它維持一個不關閉的 Playwright 瀏覽器連線，讓執行者改一點、操作一次、看結果。它要求 Codex 啟用 `js_repl`。Claude 系列的執行者不用這個 skill，直接擴充 `scripts/browser-smoke.mjs` |
| `frontend-design` | `anthropics/skills` | U1 | 視覺方向的指引 |
| `impeccable` | `pbakaus/impeccable`（Apache-2.0） | U1 | 先用 `critique`、`audit` 兩個指令產出問題清單，再用 `polish`、`harden`、`adapt` 處理選定的問題。安裝與使用限制見 7.2.1 |
| `skill-creator` | `anthropics/skills` | 見 7.4 | 建立本專案自己的 skill |

#### 7.2.1 `impeccable` 的安裝與使用限制

`impeccable` 不只是一份說明文件，它還會執行程式。以下內容來自該 repo 的 README：

| 行為 | 對本專案的影響 | 建議 |
|---|---|---|
| 完整安裝（`npx impeccable install`）會加入 hook。hook 在 session 開始時、每次 Edit 或 Write 之後、結束時各執行一次。README 說明，Claude Code 的 hook 在模型指令被拒絕時仍會執行 | 執行者的機器會多一個自動執行的第三方程式 | 用 README 的「Manual copy」方式：只複製 `skills/impeccable` 資料夾。這個方式沒有 hook，也沒有 subagent |
| 即使只複製資料夾，SKILL.md 的第 1 步仍要求每個 session 執行 `scripts/impeccable context`。這支啟動程式找不到引擎時，會從該專案的 GitHub releases 下載一個執行檔，用隨附的 `engine-checksums.txt` 核對 sha256 後執行。skill 自己的文件寫明，引擎不在沙箱內執行，可以使用 agent 的環境變數與網路 | 使用 `impeccable` 就等於同意在執行者的機器上執行這個第三方執行檔。這個執行檔不在 repo 裡，本次沒有掃描 | 由擁有者決定是否接受（O4）。不接受的話，U1 改用 `frontend-design` 加上 `web-design-guidelines` |
| `/impeccable init` 會在專案寫入 `PRODUCT.md`，並在 `.impeccable/` 放工作檔 | 本專案已有 `docs/PRODUCT.md`，兩份內容會重複 | 不執行 `init`。在提示裡直接指定 `docs/PRODUCT.md` 當作產品背景 |
| `/impeccable document` 會寫入 `DESIGN.md` | A4 完成後，這份文件可以記錄顏色與間距變數 | 可以用，放在 `docs/` |
| `live` 模式可能以關閉核准與沙箱的方式呼叫 `codex` 或 `claude` CLI | 等於讓第三方流程不經確認就改檔 | 不使用 `live` 與 `generate` |
| 開始新設計時，skill 會向 impeccable.style 取得資料並回報使用情況 | `AGENTS.md` 規定不加入分析與追蹤。這項行為發生在開發環境，不在網站上，但仍應關閉 | 設定環境變數 `DO_NOT_TRACK=1` |

### 7.3 不建議或需調整

| Skill | 來源 | 原因 |
|---|---|---|
| `webapp-testing` | `anthropics/skills` | 它用 Python 版 Playwright 寫測試。`AGENTS.md` 規定不引入 Python 工具鏈。本專案已有 Node 版的 `scripts/browser-smoke.mjs`，直接擴充它 |
| `design-taste-frontend` | `Leonxlnx/taste-skill`（MIT） | 這個 repo 目前只有這一個 skill。它的目標是做出精緻的公司網站，做法包括使用真實照片與品牌圖示。它附帶多支 Node 腳本，部分步驟會從網路下載照片、Google Fonts 與品牌圖示。本專案已決定用原創復古像素風格（`docs/DECISIONS.md`），`AGENTS.md` 也規定只用原創素材、不用官方商標。兩者方向衝突。它內含的 `redesign-existing-projects` 流程會先在瀏覽器稽核既有頁面，但 README 沒有說這個流程只稽核、不改檔 |
| `game-designer` | `opusgamelabs/game-creator` | 它假設專案用 Phaser 或 Three.js，並要求特定的目錄結構。本專案是 React 與 DOM |
| `develop-web-game` | `openai/skills` | skills.sh 仍列出這個 skill，但 `openai/skills` 在 commit `49f948f` 已經沒有它。不要依索引頁的指令安裝 |
| `vercel-react-best-practices` | `vercel-labs/agent-skills` | 內容以 Next.js 與效能為主。本專案是 Vite 單頁應用，目前沒有效能問題。只在 A4 參考其中重新渲染的規則 |

A3、A6、A7、G8 是規格明確的小改動，不需要 skill。

### 7.4 建議新增一個專案自己的 skill

上面的 skill 都是通用的。這個專案最需要的是一份「在這裡怎麼驗證一個變更」的說明，讓 Opus、Sonnet、Sol 用同一套方法驗收。建議用 `skill-creator` 建立 `playable-me-playtest`，內容包括：

1. 啟動開發伺服器的指令與埠號。
2. 一支 Playwright 腳本，在 390×844 與 1440×900 走完固定路徑並截圖。
3. 第 3 節的 T1–T6 檢查表。
4. `AGENTS.md` 的內容限制：不新增未確認的經歷、不用有版權的素材。

### 7.5 安裝方式

```bash
# 列出某個 repo 有哪些 skill，不安裝
npx skills add obra/superpowers --list

# 安裝指定的 skill 到本專案，同時給 Claude Code 與 Codex
npx skills add obra/superpowers --skill writing-plans -a claude-code -a codex
```

Claude Code 讀 `.claude/skills/`。Codex 的專案路徑，不同版本的說明寫 `.agents/skills/` 或 `.codex/skills/`，以 CLI 實際輸出為準。`skills` CLI 會依 `-a` 參數放到對應位置。

第三方 skill 是一份會被 agent 照著做的指令。安裝前先讀它的 SKILL.md 與附帶腳本，並記下安裝時的 commit。roadmap 已經規定「不可因相似名稱自行安裝未知程式」。是否安裝由擁有者決定，見第 9 節 O4。

### 7.6 安全掃描結果

#### 7.6.1 做法與範圍

2026-11-16 用 NVIDIA SkillSpector v2.12.0（commit `c816150`）掃描第 7.2、7.3 節提到的 skill。對象是 12 個 skill。每個 skill 資料夾各掃一次；`impeccable` 有三份建置，所以共 14 次。指令：

```bash
skillspector scan <skill 資料夾> --no-llm --format json --output <結果檔>
```

- 掃描只用靜態規則（`--no-llm`）。SkillSpector 的 LLM 語意分析沒有執行，因為環境裡沒有 API key。
- 掃描之外，另有一個 sub-agent 逐份讀過這些 SKILL.md，找四種內容：覆寫 agent 的指令、對使用者隱瞞動作、把資料傳到外部、下載遠端內容後執行。
- 沒有執行或安裝任何被掃描的 skill。
- `develop-web-game` 不在 `openai/skills` 的 commit `49f948f` 裡，所以沒有掃描。`playwright-interactive` 也還沒掃描。

#### 7.6.2 結果

**結論：這 12 個 skill 裡，沒有找到覆寫 agent 指令、隱瞞動作或外傳資料的文字。** SkillSpector 在提示注入相關規則上回報的項目，逐條讀過前後文後都判定為誤判。例如把「imprint rules」比對成「print rules」，或把 HTML 版面註解當成隱藏指令。

這個結論有三個限制：只做了靜態分析；14 次掃描中有部分檔案沒有被完整解析；`impeccable` 會下載的引擎執行檔不在 repo 裡，沒有掃到。

| Skill | 來源@commit | 分數 | SkillSpector 建議 | 高／中 |
|---|---|---|---|---|
| `writing-plans` | `obra/superpowers@22f0b46` | 0 | SAFE | 0／0 |
| `executing-plans` | 同上 | 17 | CAUTION | 1／0 |
| `test-driven-development` | 同上 | 0 | SAFE | 0／0 |
| `systematic-debugging` | 同上 | 77 | DO_NOT_INSTALL | 4／1 |
| `verification-before-completion` | 同上 | 7 | SAFE | 0／1 |
| `brainstorming` | 同上 | 52 | DO_NOT_INSTALL | 1／6 |
| `composition-patterns` | `vercel-labs/agent-skills@1a2c79d` | 20 | SAFE | 1／0 |
| `web-design-guidelines` | 同上 | 0 | SAFE | 0／0 |
| `frontend-design` | `anthropics/skills@1780c5e` | 13 | SAFE | 1／0 |
| `skill-creator` | 同上 | 100 | DO_NOT_INSTALL | 4／5 |
| `impeccable`（`.claude/skills`） | `pbakaus/impeccable@d41d986` | 100 | DO_NOT_INSTALL | 14／38 |
| `impeccable`（`.agents/skills`） | 同上 | 100 | DO_NOT_INSTALL | 15／42 |
| `impeccable`（`plugin/`） | 同上 | 100 | DO_NOT_INSTALL | 12／42 |
| `design-taste-frontend` | `Leonxlnx/taste-skill@f6b7657` | 100 | DO_NOT_INSTALL | 45／3 |

沒有任何一次掃描出現 CRITICAL 或 LOW 等級的項目。

**分數不能單獨當作依據。** 分數是項目數量加總的結果，而多數項目是誤判。例如 `systematic-debugging` 的 77 分主要來自一段列出程式碼簽章身分的除錯範例，以及一個「為鑑識保留上下文」的標題。反過來，`web-design-guidelines` 得 0 分，卻有下一節第 1 點的行為。

#### 7.6.3 掃描與人工閱讀確認的實際風險

這些不是提示注入，但會影響是否安裝、如何使用：

1. **`web-design-guidelines` 每次執行都下載遠端規則並照著做。** 來源是 `raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md`，沒有固定版本。遠端檔案的內容會直接成為 agent 的指令。做法：下載一次，由人看過，存一份到本專案，之後讓執行者讀本專案這一份。
2. **`impeccable` 會下載並執行第三方執行檔，完整安裝還會加入三個 hook。** 細節與建議見 7.2.1。
3. **`design-taste-frontend` 在 SKILL.md 的 frontmatter 註冊了 Stop hook。** agent 準備結束時，hook 會執行 `scripts/gate.mjs`，逾時上限 600 秒，可以阻止 agent 結束。SkillSpector 沒有回報這個 hook。
4. **`brainstorming` 會在使用者同意後啟動一個本機 node 伺服器，並用 `nohup` 讓它在 shell 結束後繼續執行。** 它附有停止腳本。用完要確認伺服器已停止。
5. **`skill-creator` 會執行隨附的 Python 腳本與 `claude -p` 子程序。** 這是它評測 skill 的正常做法。
6. **`executing-plans` 會呼叫相鄰資料夾 `subagent-driven-development/scripts/` 的腳本。** 這些腳本不在本次掃描範圍。

完整的逐條判讀不放進 repo。需要時，用 7.6.1 的指令對同一個 commit 重新掃描即可重現。

## 8. 執行方式

### 8.1 順序

```
Step 0   合併 #12 → 落地 #9 → 落地 #11 → 重新核對本計畫
Wave 0   G2 → G3 → G4（含 G1）
Wave 1   A1 → A2 → A3 → A4 → A5
Wave 2   G5 → G7 → G8 → G6 → G9
Wave 3   A7 → A6 → U1
```

- 2026-11-17 起，順序以 `docs/TASKS.md` 為準。
- Wave 0 在 Step 0 完成後開始。
- A2 一定在 A3 之前（原因見 A3）。
- Wave 1 的每個 PR 都不能改變畫面與行為。這樣 roadmap 的 A/B/C 版本比較才不會被重構干擾。
- A7 的第 1 項（lockfile）與第 3 項（分享預覽）不依賴其他項目，可以提前。

### 8.2 分工原則

- **Opus 或 Sol：** 需要在幾個做法之間取捨、或結果會影響後續多個項目的工作。即 A1、A4、G4–G7、U1。
- **Sonnet：** 規格與驗收條件已經寫清楚的工作。即 G1–G3、A2、A3、A5–A7、G8、G9。

### 8.3 每個項目的流程

依 `AGENTS.md`：一個項目對應一個 Issue、一條從 `main` 開的分支、一個 PR。PR 說明要有範圍、測試結果、風險、後續事項。UI 變更要附 390×844 與 1440×900 的截圖。

### 8.4 交給執行者的提示範本

```
你要接手 repo b07611031/playable-me 的一個優化項目。

1. 依序閱讀：AGENTS.md、docs/STATUS.md、docs/PRODUCT.md、docs/DECISIONS.md。
2. 閱讀 docs/OPTIMIZATION_PLAN.md 的項目 <ID>，只做這一項。
3. 載入 skill：<skill 名稱>。若未安裝，停下來回報，不要自行安裝。
4. 從 main 開分支 <type>/<id>-<簡述>。
5. 完成後執行 npm run test:maze、test:case、test:codex、build、test:dist，
   以及 node scripts/browser-smoke.mjs。
6. 開 PR。說明寫明：驗收條件逐項的結果、截圖、風險、後續事項。
7. 遇到「需要擁有者決定」的事項（docs/OPTIMIZATION_PLAN.md 第 9 節）就停下來問。
8. 不要合併 PR，不要修改 main。
```

## 9. 需要擁有者決定的事項

2026-11-17：O2、O4 已決定，另新增 O8（先落地 #9、#11）。目前狀態見 [`docs/TASKS.md`](TASKS.md) 第 1 節。

| # | 事項 | 影響項目 |
|---|---|---|
| O1 | 履歷連結的網址。提供之前，是否先拿掉「RESUME COMING SOON」那一列 | G9 |
| O2 | 是否同意「故事預設可讀，小遊戲只解鎖角色」。這會改變 `docs/minigame-rewards-v031.md` 的行為 | G1、G4 |
| O3 | 圖鑑的真實經歷要用哪個做法公開（G5 的做法 1、2、3） | G5 |
| O4 | 是否允許安裝第 7.2 節的第三方 skill；「Impact-Cable」是否就是 `impeccable`；是否接受 `impeccable` 在執行者的機器上下載並執行第三方執行檔（7.2.1、7.6.3） | 全部 |
| O5 | 字型是否改成自行託管 | A7 |
| O6 | AI Lab 小遊戲選哪個方向（G6 的候選 1、2、3） | G6 |
| O7 | AI Lab 第三個里程碑的公開名稱：「SOP Annotator」或「Making ideas usable」 | A1 |

## 10. 資料來源

Skill 相關資訊的查核來源（2026-11-16）：

- taste-skill：<https://github.com/Leonxlnx/taste-skill>（直接讀取 README）
- impeccable：<https://github.com/pbakaus/impeccable>（直接讀取 README）
- superpowers：<https://github.com/obra/superpowers>（透過搜尋結果摘要）
- Vercel agent-skills：<https://github.com/vercel-labs/agent-skills>（透過搜尋結果摘要）
- Anthropic skills：<https://github.com/anthropics/skills>（透過搜尋結果摘要）
- openai/skills：直接檢視 repo（commit `49f948f`）；develop-web-game 的索引頁 <https://skills.sh/openai/skills/develop-web-game>
- game-designer：<https://skillselion.com/skills/opusgamelabs/game-creator/game-designer>
- skills CLI：<https://www.mintlify.com/vercel-labs/skills/quickstart>
- SkillSpector：<https://github.com/NVIDIA/skillspector>（Apache-2.0）
