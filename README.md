# Little Witch Fortune Tent · 小小神秘占卜帳篷

以 HTML、CSS、JavaScript ES Modules 與 Three.js 0.170.0 製作的靜態 3D 占卜入口。無框架、無後端、無 API Key。所有場景與角色以基本幾何體建立；不含實際占卜演算法。

## 本地啟動

在本資料夾執行 `python3 -m http.server 8080`，瀏覽 http://localhost:8080 。現在也可以直接雙擊 `index.html` 開啟，無須啟動伺服器。頁面使用已打包的傳統腳本，因此支援 `file://`。HTTP 伺服器可供開發及手機區網測試。

## 設定正式占卜網址

編輯 `js/fortune-links.js`（修改網址不需要重新打包）：

```js
window.FORTUNE_LINKS = {
  tarot: '', // 填入完整 HTTPS 塔羅網址
  runes: ''  // 填入完整 HTTPS 盧恩網址
};
```

網址空白時顯示「魔法通道準備中，敬請期待！」。只有按下對話框的進入按鈕才以 `window.open(url, '_blank', 'noopener,noreferrer')` 開啟外站，不取代場景。

## 操作

- 拖曳：限制角度旋轉；滾輪／雙指：縮放。
- 點擊女巫、桌面或攤位：鏡頭靠近並打開對話；下方兩張卡片提供鍵盤與手機入口。
- Esc、稍後再來：關閉對話並返回；總覽：還原視角。
- 小貓：點擊出現喵喵訊息。
- 簡化動畫：停止顧客、環境粒子與背景對話，降低解析度及關閉陰影。初始尊重 prefers-reduced-motion。
- 音樂選單提供 `Tea Leaves and Velvet` 與 `Moonlight Through Canvas` 兩首循環背景音樂，可選曲、播放／暫停及調整音量。切換曲目會從頭播放選定歌曲；初始音量 35%，載入頁面不自動播放。兩首音檔均由使用者提供，存放於 `assets/sounds/`。音樂控制實作於 `js/music.js`。

## GitHub Pages

將本資料夾內的所有檔案放到 GitHub repository 根目錄（`index.html` 位於根目錄）。在 Settings → Pages 選擇 Deploy from a branch，指定 main 與 / (root)，儲存後使用 GitHub 提供的 HTTPS 網址。也可將整個資料夾置於既有 Pages repository 的子目錄，所有模組與樣式均使用相對路徑。

## 系統

- scene.js / lighting.js：開放屋頂微縮場景、道具、燈光與粒子。
- models.js：共用 Geometry / Material、角色建構。未來可在 `person()` 替換為 GLB 載入器，保留 group、head、eyes、arms、legs 契約或另寫動畫 adapter。
- camera.js：有限角度旋轉、縮放、相機平滑插值及互動鎖定。
- witches.js：眨眼、整理道具、揮手。
- customers.js：五位顧客的 IDLE / WALKING / QUEUING / CONSULTING / RESTING / LEAVING / OUTSIDE 狀態機，路徑圖、席位預約、簡易避讓。顧客到門口後隱藏，等待 5～13 秒再從入口出現並走入；入口與出口分流，隱藏中的顧客不參與避讓。
- interactions.js：Raycaster、點擊與拖曳區分。
- ui.js / config.js：對話框、網址、提示及角色設定。
- animations.js：低頻預設背景對話，對話框開啟時暫停。
- main.js：唯一的 requestAnimationFrame 迴圈；deltaTime 更新，背景分頁跳過渲染。

Three.js 已固定版本並存放於 `js/three.module.js`；授權為 MIT，檔頭保留原授權。Google Fonts 是可選外部字型，離線時使用本機襯線字型。WebGL 不可用時仍保留下方兩個 2D 入口。

這是第一版幾何模型 MVP：角色以程序式擺動表現日常，未使用骨骼動畫；NPC 使用簡單走道及席位管理，非完整物理導航。桌面流暢度依硬體而定，可開啟簡化模式。

## 修改原始碼後重新打包

原始碼仍保留 ES Modules 架構；`index.html` 載入打包產物 `js/app.bundle.js`，以支援直接雙擊開啟。修改 `js/main.js` 等原始碼後，於本資料夾執行：

```sh
npm exec --yes --package=esbuild@0.25.12 -- esbuild js/main.js --bundle --format=iife --target=es2020 --outfile=js/app.bundle.js
```

執行打包需要 Node.js 與 npm；一般瀏覽及修改 `js/fortune-links.js` 不需要。
