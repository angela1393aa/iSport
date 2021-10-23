# iSport!

iSport! 是一個使用 React 建立的前端電子商務專案，此專案中，後端我們使用了 Node.js 搭配 Express 做出 restful api ，前端使用 React 框架透過 axios 的技術來跟 api 做串接，打造出一個全方位的電商網站。</br>

專案中我們額外使用到 tailwind、Figma、react-draft-wysiwyg文字編輯器、aos 動畫、leaflet 地圖、socket.io聊天室、Cloudinary 雲端存取、react-credit-cards 信用卡套件等等，也善用了許多雲端平台，像是 slack、google meet、google jamboard 等，在版本控制上我們使用 git-flow 的模式來開發。</br>
## Menu - 目錄

- Topic name - 專題名稱
- Team member - 團隊成員
- Initial - 專題構思
- Project features - 專案特色
- Features - 專案功能
- Demo - 專案展示
- Technical Skills - 使用哪些技術實作專案
- Team division - 團隊分工
- Declaration - 聲明
- Installing - 專案安裝流程

## Topic name - 專題名稱
iSport! 就是愛健身，邁向健康曲線</br>

## Team member - 團隊成員
謝姝璇、劉又瑄、林美惠、陳豪宇、林宜瑾</br>

## Initial - 專題構思
一個專為熱愛健身、運動的人打造的網路平台。從運動、健身相關的影片、文章分享為出發點，提供學習的分享平台，並提供相關商品給使用者選購。</br>
## Project features - 專案特色
主要分享健身影片及文章，並販售健身、運動相關商品，會員能發表文章、可以留言討論分享心得，並還有提供健身房的據點。</br>
希望透過此平台，推廣健身運動，並經營商城達到資訊分享以及創造利潤的目的。讓更多人能有機會接觸、瞭解健身，並由飲食出發，在生活中實踐更健康的生活。</br>
## Features - 專案功能
* 首頁：網站的總覽與重點，包含了精選影片、多樣商品、優質文章、健身房、聊天室五大部分</br>
![首頁頁面](https://i.imgur.com/cvBPESV.jpg)
* 精選影片：透過平台提供的運動影片，使用者能在家觀看影片做運動，並學習包括飲食、有氧等健身相關的知識。</br>
![精選影片頁面](https://i.imgur.com/6rF3AE5.jpg)
* 多樣商品：藉由推廣健康飲食、正確運動的概念，提供多樣優質運動相關商品，方便使用者在學習健身的過程中輕鬆下單購買各式健身運動相關的商品。</br>
![多樣商品頁面](https://i.imgur.com/NPH2fxt.jpg)
* 優質文章：會員可以自由發表與健身相關的文章，使用者可以按讚、收藏，從中學習健身、運動知識。</br>
![優質文章頁面](https://i.imgur.com/Hw2BqLR.jpg)
* 健身房：顯示各地健身房的據點位置，利於使用者找尋最近的健身房。</br>
![健身房頁面](https://i.imgur.com/017y2Li.jpg)
* 會員專區： 會員基本資料修改、查看購物車、結帳等購物流程，也可以發表文章、收藏文章、影片</br>
![會員基本資料修改頁面](https://i.imgur.com/6q8LKna.png)
![購物車頁面](https://i.imgur.com/DXFog0r.png)
![新增文章頁面](https://i.imgur.com/YevHkP7.png)

## Demo - 專案展示
[專題發表39:10](https://www.youtube.com/watch?v=BPb59iyrxQQ)</br>
[小組錄製專題展示](https://www.youtube.com/watch?v=FRJClcOzvQ4)</br>

## Technical Skills - 使用哪些技術實作專案
![](https://i.imgur.com/wUqw9zB.png)

## Team division - 團隊分工
謝姝璇(組長)</br>
 - 購物車頁面</br>
 - 購物流程規劃</br>
 - 資料庫設計</br>
 - 購物車訂單 api 串接</br>
 - 擬訂時程進度</br>

劉又瑄(技術長)</br>
 - 首頁頁面、聊天室</br>
 - 影片頁面、留言板</br>
 - Cloudinary 雲端存取</br>
 - 資料庫設計</br>
 - 後端 api 串接</br>
 - 技術指導</br>

林宜瑾(技術長)</br>
 - 首頁navbar </br>
 - 商品頁面</br>
 - 資料庫設計</br>
 - 後端 api 串接</br>
 - 技術指導</br>

林美惠</br>
 - 首頁頁面、動畫</br>
 - 文章頁面</br>
 - 健身房+地圖</br>
 - 會員文章CRUD</br>
 - 404頁面</br>
 - 資料庫設計</br>
 - 後端 api 串接</br>

陳豪宇</br>
 - 首頁navbar </br>
 - 會員註冊</br>
 - 會員資料</br>
 - 會員側欄</br>
 - 資料庫設計</br>
 - 後端 api 串接</br>

## Declaration - 聲明
本作品內圖片、內容等，純粹為個人練習前端使用，不做任何商業用途。</br>
## Installing - 專案安裝流程

1. Clone 此專案至本機電腦</br>

```bash=
git clone gh repo clone MFEE17-Fourth-group-project/iSport
```
2. .env要設定相關內容</br>

front</br>
```bash=
REACT_APP_API_URL=http://localhost:3030
REACT_APP_FACEBOOK_ID=
REACT_APP_GOOGLE_ID=
REACT_APP_CLOUDINARY=
REACT_APP_CLOUDINARY_USER=
```
back</br>
```bash=
# 資料庫設定
DB_HOST=localhost
DB_PORT=3306
DB_USER=
DB_PASSWORD=
DB_NAME=iSport

# 路徑
PORT_ORIGIN="http://localhost:3000"
SESSION_SECRET=
# 三方登入認證用
FACEBOOK_ID=
FACEBOOK_SECRET=
GOOGOLE_ID=
GOOGLE_SECRET=
# CLOUDINARY 設定
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_KEY=
CLOUDINARY_SECRET=
```

2. 打開iSport資料夾開啟git bash輸入以下指令</br> 

```bash=
cd back，下指令npm i
#到back資料夾安裝 npm 套件

nodemon server
#開啟後端伺服器
```

3. 打開iSport資料夾開啟git bash輸入以下指令</br> 

```bash=
cd front，下指令npm i
#到front資料夾安裝 npm 套件

npm start
#啟動應用程式，本機運行
```
4. 您可以開始逛逛我們的 iSport! 就是愛健身，邁向健康曲線囉！</br>
歡迎使用測試帳號登入使用，帳密如下：</br>
第一組</br>
帳號:test01 密碼:test01</br>
第二組</br>
帳號:admin1 密碼:qwer1234</br>


