# expense-tracker :老爹的私房錢

### 這個專案目的是讓老爸在網頁上做一個簡單的記帳,主要功能可以新增、修改、刪除並結算每筆支出的總結.

![rejected](https://github.com/Steavn-Chen/ac_restaurant_list/blob/master/%E5%B7%B1%E5%AE%8C%E6%88%90.PNG)
![rejected](https://github.com/Steavn-Chen/expense-tracker/blob/master/%E8%80%81%E7%88%B8%E7%9A%84%E7%A7%81%E6%88%BF%E9%8C%A2.PNG)
## 開發環境

- Node.js -v10.15.0
- Express -4.17.1
- Express-Handlebars -5.2.1
- nodemon -2.0.7
- body-parser 1.19.0
- mongoose 5.12.1
- method-override 3.0.0

## 安裝與執行要點

1.  打開終端機,在本地端建立專案資料夾 .

```
  mkdir expense-tracker
```

2.  將專案下載到專案資料夾並進入資料夾.

```
  cd expense-tracker

3. 安裝npm.
```

npm install

```
4. 安裝種子檔案.
```

npm run seed  
 成功執行種子檔案後,在終端機看到以下字串
mongodb connected!
insert recordSeeder done
mongodb connected!
insert categorySeeder done

```
5. 啓動伺服器.
```

npm run dev
成功啓動伺服器後在終端機會看到
App is running on http://localhost:3000
mongodb connected!

## 現下功能

- 老爹在首頁可以瀏覽所有支出的類別跟總金額
- 在首頁可以新增一筆支出
- 可以修改每一筆支出細項,限單筆
- 可以刪除不必要的單筆支出
- 在首頁可以利用篩選功能瀏覽單一種類別的全部支出,以及支出總計.
