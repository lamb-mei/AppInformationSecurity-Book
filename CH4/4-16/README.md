# 4-16 混血的就是萌 - 混合加密系統



## 混合加密系統範例

 iOS / SWIFT 範例程式，演示怎麼傳送出去資料

#### 建立隨機AES 金鑰

````
key: "1111111111111111", iv: "0000000000000000"
````

#### 將明文進行加密

```swift
if
 let aes = try? AES(key: "1111111111111111", iv: "0000000000000000") , // aes128
 let encrypted = try? aes.encrypt(orgiTextView.text!.bytes) ,
 let EncData = encrypted.toBase64()
{
	crypTextView.text = EncData
	print(EncData)
}
```

#### 將金鑰使用公開金鑰加密

```swift
let EncPublicKey = try! PublicKey(base64Encoded: inputPubkey.text!)
let clear = try! ClearMessage(string: "aes128 1111111111111111:0000000000000000", using: .utf8)
let encrypted = try! clear.encrypted(with: EncPublicKey, padding: .PKCS1)
let EncAESData = encrypted.base64String
crypKeyTextView.text = EncAESData
print(EncAESData)
```



#### 注意這裡要被加密字串資料格式為

```
金鑰類型 金鑰:初始向量
```

```
aes128 1111111111111111:0000000000000000
```

這個沒有標準的格式，只要傳送方跟接收方協議好即可

用 JSON當然也是OK 的

```json
{"key":"1111111111111111","iv":"0000000000000000"}
```



最後將 EncData(密文)和加密後的金鑰(EncAESData)這兩個資料傳送出去





### Swift 安全亂數



#### Secure Random Data

```swift
func secureRandomData(count: Int) throws -> Data {
    var bytes = [Int8](repeating: 0, count: count)

    // Fill bytes with secure random data
    let status = SecRandomCopyBytes(
        kSecRandomDefault, 
        count, 
        &bytes
    )
    
    // A status of errSecSuccess indicates success
    if status == errSecSuccess {
        // Convert bytes to Data
        let data = Data(bytes: bytes, count: count)
        return data
    }
    else {
        // Handle error
    }
}
```



#### Secure Random Int

```swift
func secureRandomInt() throws -> Int {
    let count = MemoryLayout<Int>.size
    var bytes = [Int8](repeating: 0, count: count)

    // Fill bytes with secure random data
    let status = SecRandomCopyBytes(
        kSecRandomDefault, 
        count, 
        &bytes
    )
    
    // A status of errSecSuccess indicates success
    if status == errSecSuccess {
        // Convert bytes to Int
        let int = bytes.withUnsafeBytes { pointer in
            return pointer.load(as: Int.self)
        }

        return int
    }
    else {
        // Handle error
    }
}
```

