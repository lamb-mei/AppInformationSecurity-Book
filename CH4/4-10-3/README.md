# 如何產生加密圖片

注意==要使用 BMP 的影像格式==

 使用 BMP 原因是 BMP檔案資訊不會壓縮，因為檔案很大通常不會在網路上使用這種格式

但對我們需求，不會因為加密檔案後造成無法解析圖片的問題

```bash
＃產生 ECB 加密圖片
openssl enc -aes-128-ecb -e -in img.bmp -out img-ecb.bmp -K 111111
```

```bash
＃產生 CBC 加密圖片
openssl enc -aes-128-cbc -e -in img.bmp -out img-cbc.bmp -K 111111 -iv 000000
```

> 為了程式碼簡潔，key 及 iv 只有填寫六位，長度不足，不過系統會自動補齊但會出現警告訊息

```
hex string is too short, padding with zero bytes to length
```

接著使用 HEX 編輯器，將原始檔案開頭開始的 54 bytes 抬頭資訊複製到加密後檔案，讓其圖片可以正常被解析 

>  我使用 HEX 編輯器是 [Hex Fiend](https://apps.apple.com/tw/app/hex-fiend/id1342896380?mt=12)

下方是我原始檔案截取出的 54 bytes 讓大家看的比較清楚，使用時需要使用自己原始的BMP Header hex 資訊

```
424D6057 0B000000 00003600 00002800 0000DD01 00000702 00000100 18000000 00002A57 0B00120B 0000120B 00000000 00000000 0000
```



![截圖 2020-10-06 上午10.37.04](https://i.imgur.com/cEO2yum.png)



這樣就可以正常打開加密後的圖片

> 另外補充，用覆蓋開頭  54 bytes 或直接插入 54 bytes 都可以正常打開圖片

