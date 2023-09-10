# Tutor

## 功能介紹

- 註冊登入後可使用、支援GOOGLE登入
- 可瀏覽老師課程清單
- 可透過搜尋列搜尋特定課程
- 可觀看課程詳細資訊
- 可預約課程、課後為此課程評分
- 可觀看並修改個人資訊
- 可透過表單成為老師並開設課程
- 成為老師後可預約其他課程、但不可預約自己的課程
- 可以查看並編輯課程資訊
- 可以查看學生匿名評分與評論
- 後臺可觀看所有使用者清單

## 如何使用

1. 請先確認有安裝 node.js 與 npm
2. 將專案 clone 到本地
3. 在本地開啟之後，透過終端機進入資料夾，輸入：

   ```bash
   npm install
   npx sequelize db:migrate
   npx sequelize db:seed:all
   ```

4. 安裝完畢後，繼續輸入：

   ```bash
   npm run dev
   ```

5. 若看見此行訊息則代表順利運行，打開瀏覽器進入到以下網址

   ```bash
   Listening on http://localhost:3000
   ```

6. 若欲暫停使用

   ```bash
   ctrl + c
   ```
   
## 種子使用者

學生：( 偶數 User 都是學生身分，EX: User2、User4、User6 ... User50 )
  - email: User2@example.com
  - password: 12345678

老師：( 奇數 User 都是老師身分，EX: User1、User3、User5 ... User49 )
  - email: User1@example.com
  - password: 12345678

管理者：( 後臺入口：在前台登入網址後加上 admin，EX: http://localhost:3000/login/admin )
  - email: root@example.com
  - password: 12345678
