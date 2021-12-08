# 4-2 什麼都能尬的果汁機 - 雜湊 Hash



Hash: online hash value calculator
https://www.fileformat.info/tool/hash.htm



### 4-2-1 雜湊函數（Hash Function）



#### Swift

```swift
import CryptoSwift

var str = "羊小咩"
var data = str.bytes

let hash1 = data.md5().toHexString()
let hash2 = data.sha1().toHexString()
let hash4 = data.sha256().toHexString()
let hash6 = data.sha512().toHexString()
```

原始檔：  `source/AppSecDev_ios/1-hash.playground` 

[使用教學](../../HowToUse.md) #開啟.playground 方式



### 4-2-5   雜湊使用小知識 - 加鹽（salt）

[SHA1 加密破解字典查詢](https://www.dcode.fr/sha1-hash)



## 
