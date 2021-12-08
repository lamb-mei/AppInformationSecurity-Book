# 如何使用原始碼

## XCode或playground 



### 開啟XCode專案

1. 打開XCode 專案

```
/AppInformationSecurity-Book/source/AppSecDev_ios/
```

2. 確定已安裝Pod 套件

   `pod install`

3. 編譯主專案

   `cmd` +  `R`





### 開啟.playground 方式

> 由於Playground 有使用到外部套件
>
> 因此被需掛載在Target 內，需要先編譯並執行過專案
>
> 在使用playground

1. 必須已經編譯過主專案

`cmd` +  `R`

2. 開啟playground 資料夾下的檔案 如`1-hash.playground`

```
AppInformationSecurity-Book/source/AppSecDev_ios/Playground/1-hash.playground
```

3. 點箭頭執行playground 



## Node.jS 專案



1. 打開NodeJS 專案

```
AppInformationSecurity-Book/source/AppSecDev_server/
```

2. 確定已安裝NodeJS （npm）

> 小咩版本 v16.13.0
>
> https://nodejs.org/en/

3. 安裝套件

   用命令切換到 AppSecDev_server 目錄

   ```
   cd {下載目錄}/AppInformationSecurity-Book/source/AppSecDev_server/
   ```

   執行nom 安裝

   ```bash
   npm install
   ```

4. 執行dev 環境

   ```bash
   npm run dev
   ```

5. 使用瀏覽器預覽

   啟動成功可以使用 http://localhost:3000 瀏覽站台



