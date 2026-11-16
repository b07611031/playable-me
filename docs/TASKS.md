# Playable Me — 待執行事項

- **更新日期：** 2026-11-17
- **依據：** [`docs/OPTIMIZATION_PLAN.md`](OPTIMIZATION_PLAN.md)。每個項目的現況、解決方向與驗收條件寫在該文件，本表只追蹤順序、依賴與狀態。
- **規則：** 執行者開始一個項目時，把狀態改成「進行中」；開 PR 後改成「待審」並填 PR 編號；擁有者合併後改成「完成」。狀態變更和程式變更放在同一個 PR。

狀態：待辦｜進行中｜待審｜完成｜擱置

## 1. 擁有者決定

### 1.1 已決定

| # | 決定 | 日期 | 對執行的影響 |
|---|---|---|---|
| O2 | 同意：故事預設可讀，小遊戲只解鎖角色 | 2026-11-17 | G1 併入 G4，G4 移到 Wave 0。`docs/minigame-rewards-v031.md` 的「遊戲解鎖故事卡」行為由 G4 取代 |
| O4 | 同意安裝計畫第 7.2 節的第三方 skill，包含接受 `impeccable` 在執行者機器上下載並執行它的引擎執行檔 | 2026-11-17 | 使用限制見本文件第 3 節 |
| O8 | 先落地 PR #9、#11，再開始優化項目 | 2026-11-17 | 新增 Step 0。優化計畫以 `main` @ `2f6eea3` 為基準，沒有算進這兩個 PR，落地後要重新核對 |

### 1.2 待決定

執行者遇到下列事項就停下來問擁有者，不自行決定。

| # | 事項 | 卡住的項目 |
|---|---|---|
| O1 | 履歷連結的網址；提供之前是否先拿掉「RESUME COMING SOON」 | G9 |
| O3 | 圖鑑的真實經歷用哪個做法公開（G5 的做法 1、2、3） | G5 |
| O5 | 字型是否改成自行託管 | A7.5 |
| O6 | AI Lab 小遊戲選哪個方向（G6 的候選 1、2、3） | G6 |
| O7 | AI Lab 第三個里程碑的公開名稱：「SOP Annotator」或「Making ideas usable」 | A1 |

## 2. 清單

「執行者」是建議的模型等級：Opus 或 Sol 做需要取捨的項目，Sonnet 做規格已寫清楚的項目。

### Step 0：落地既有 PR 並重新核對

| ID | 項目 | 依賴 | 執行者 | 狀態 | PR |
|---|---|---|---|---|---|
| T0.1 | 合併本計畫的文件 PR | — | 擁有者 | 待審 | #12 |
| T0.2 | PR #9 rebase 到最新 `main`，重跑全部檢查，交擁有者合併 | T0.1 | Opus | 待辦 | #9 |
| T0.3 | PR #11 的 base 改成 `main`，rebase，重跑全部檢查，交擁有者合併 | T0.2 合併後 | Opus | 待辦 | #11 |
| T0.4 | 依新的 `main` 重新核對計畫：每個 G、A 項目標記「仍成立／部分解決／已解決」，更新 `檔案:行號` | T0.3 合併後 | Opus | 待辦 | |
| T0.5 | 核對 `docs/STATUS.md` 的 P1：Issue #7 已關閉，但 STATUS 仍寫「blocked」。確認公開網址是否可用，再更新 | — | Opus | 待辦 | |

### Wave 0：訪客看得到的缺陷

| ID | 項目 | 依賴 | 執行者 | 狀態 | PR |
|---|---|---|---|---|---|
| G2 | 手機版標頭按鈕被裁切 | T0.4 | Sonnet 或 Opus | 待辦 | |
| G3 | 小遊戲進行中點背景就關閉 | T0.4 | Sonnet 或 Opus | 待辦 | |
| G4 | 故事預設可讀，小遊戲只解鎖角色（含 G1） | T0.4 | Opus | 待辦 | |

### Wave 1：基礎結構（每個 PR 都不能改變畫面與行為）

| ID | 項目 | 依賴 | 卡在 | 執行者 | 狀態 | PR |
|---|---|---|---|---|---|---|
| A1 | Station 單一來源：先交設計文件，擁有者看過再實作 | Wave 0 | O7 | Opus 或 Sol | 待辦 | |
| A2 | 遊戲規則抽成純函式，換成 Vitest 單元測試 | A1 | | Sonnet | 待辦 | |
| A3 | Prettier 與 ESLint | A2 | | Sonnet | 待辦 | |
| A4 | 拆分 `App.tsx`，集中進度狀態 | A3 | | Opus 或 Sol | 待辦 | |
| A5 | 共用 Modal 元件 | A4 | | Sonnet | 待辦 | |

### Wave 2：遊戲設計

| ID | 項目 | 依賴 | 卡在 | 執行者 | 狀態 | PR |
|---|---|---|---|---|---|---|
| G5 | 圖鑑的真實經歷不鎖在遊戲成績後面 | A1 | O3 | Opus 或 Sol | 待辦 | |
| G7 | 兩套進度合併說明（先看 #11 做到哪裡） | T0.4、A1 | | Opus 或 Sol | 待辦 | |
| G8 | 減少讀完內容的點擊數（先看 #11 做到哪裡） | T0.4 | | Sonnet | 待辦 | |
| G6 | AI Lab 小遊戲改成貼合 Builder 訊息 | A2 | O6 | Opus 或 Sol | 待辦 | |
| G9 | 回饋動態；履歷連結 | A5 | O1 | Sonnet | 待辦 | |

### Wave 3：對外品質

| ID | 項目 | 依賴 | 卡在 | 執行者 | 狀態 | PR |
|---|---|---|---|---|---|---|
| A7.1 | 提交 `package-lock.json`，CI 與部署改用 `npm ci` | 無，可提前 | | Sonnet | 待辦 | |
| A7.3 | favicon 與分享預覽標籤 | 無，可提前 | | Sonnet | 待辦 | |
| A7 其餘 | 版本號、noscript、字型、CI 統一入口、舊規格歸檔 | A3 | O5（僅字型） | Sonnet | 待辦 | |
| A6 | hash 路由與深連結 | A4 | | Sonnet | 待辦 | |
| U1.0 | 準備：v0.4 基準截圖腳本；存一份看過的 `web-design-guidelines` 規則；建立 `playable-me-playtest` skill（計畫 7.4） | A4 | | Opus | 待辦 | |
| U1 | UI 稽核與視覺優化 | U1.0 | | Opus 或 Sol | 待辦 | |

## 3. Skill 使用方式

這些 skill 都在 2026-11-16 用 SkillSpector 掃描過（計畫第 7.6 節）。**一律使用下表的 commit**，因為掃過的是這個版本。

| Skill | 來源 | commit | 路徑 | 用在 |
|---|---|---|---|---|
| `systematic-debugging` | `obra/superpowers` | `22f0b46` | `skills/systematic-debugging/` | G2、G3、G4 |
| `test-driven-development` | 同上 | 同上 | `skills/test-driven-development/` | Wave 0、A2 |
| `verification-before-completion` | 同上 | 同上 | `skills/verification-before-completion/` | 全部 |
| `writing-plans` | 同上 | 同上 | `skills/writing-plans/` | A1、A4 |
| `executing-plans` | 同上 | 同上 | `skills/executing-plans/` | A1、A4 實作 |
| `brainstorming` | 同上 | 同上 | `skills/brainstorming/` | G5–G7 |
| `composition-patterns` | `vercel-labs/agent-skills` | `1a2c79d` | `skills/composition-patterns/` | A4、A5 |
| `web-design-guidelines` | 同上 | 同上 | `skills/web-design-guidelines/` | U1 |
| `frontend-design` | `anthropics/skills` | `1780c5e` | `skills/frontend-design/` | U1 |
| `impeccable` | `pbakaus/impeccable` | `d41d986` | `.claude/skills/impeccable/` | U1 |

取得方式（不寫進本 repo）：

```bash
git clone https://github.com/obra/superpowers /tmp/superpowers
git -C /tmp/superpowers checkout 22f0b46
# 讀 /tmp/superpowers/skills/<name>/SKILL.md，依它的流程做
```

`git clone --depth 1` 抓不到舊 commit 時，改用 `git fetch --depth 1 origin 22f0b46` 再 checkout。

限制：

1. `executing-plans` 會呼叫相鄰的 `skills/subagent-driven-development/scripts/`，這些腳本沒有掃描過。執行前先讀過。
2. `web-design-guidelines` 每次執行都下載 `vercel-labs/web-interface-guidelines` 的 `main` 分支規則並照著做。U1.0 先下載一次、由人看過，存到 `docs/vendor/web-interface-guidelines.md` 並記下來源 commit。之後讓執行者讀這一份。
3. `impeccable` 只用「Manual copy」方式（複製 skill 資料夾，不跑 `npx impeccable install`，不加 hook）。設定 `DO_NOT_TRACK=1`。不執行 `init`、`live`、`generate`。產品背景直接指定 `docs/PRODUCT.md`。擁有者已接受它下載並執行引擎（O4）。
4. `design-taste-frontend`（taste-skill）、`webapp-testing`、`game-designer`、`develop-web-game` 不使用，原因見計畫 7.3。
5. 不安裝本表以外的 skill。需要時先問擁有者。
