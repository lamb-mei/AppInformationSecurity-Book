# 4-13 非對稱式加密演算法 - RSA (實戰篇)



## 4-13- iOS / Swift

在 Swift 使用RSA 有個很棒的套件 `SwiftyRSA`

https://github.com/TakeScoop/SwiftyRSA

### 安裝

Cocoapods

```
pod 'SwiftyRSA'
```

Carthage

```
github "TakeScoop/SwiftyRSA"
```



### 建立金鑰組（公鑰/私鑰）

```swift
let keyPair = try! SwiftyRSA.generateRSAKeyPair(sizeInBits: 1024)

let privateKey = keyPair.privateKey
let publicKey = keyPair.publicKey

print(try! privateKey.pemString())
print(try! publicKey.pemString())
```



```
-----BEGIN RSA PRIVATE KEY-----
MIICXQIBAAKBgQDfbg0VxZaetJAOMHQnECXTUSrsGW++UHa01OsJCmYJuSVSSlF0
j2LtlZ83PADeyq/wtjN1pdJG++SDUVbB0gH4lT+v3yXXQJabyaat4Eu3GwDJSx1s
X9U+hiDlPSxwNlZYASgPZnJYUXIn1rxCL4q+I9Tea9YjJEO5iLxIy9BArQIDAQAB
AoGAN5LbBFhSP4Vv82eP7ItyrR4aTAGDrtW6wP3YvDXu7Wo040QDALgNhkTaBlYR
bVkC7B+VqySkqe1LiHI53xnKTUBFvLw2x/gJ4pCilEY6IRN1B2ey0pD+7wLKmlV3
HjGkhGdPRLRtYIFMGDFXA2sdVcTcheQ7uDgoYvNEPB9iqU0CQQD8NiuLp8RX6cbO
EU4ZK+Ux9qIQ/9faJZ7FAa5q+QLR8tdiZIV4Qy3tt+bxIEX6LXcJWcoGtDAw+sOR
pppYrOOrAkEA4sk05KxKHP1C4AUM+IJAWewg1uwHMyKQytFVUXqvKqXGYe304hss
vBJtSXCg8n+MAw+J6oR87rieVtUdKDsVBwJBAPojJ5D8tMiUPO4HT7O7SzcAar/9
XjEm+o5dGoVRrjBXbrJRC+a4igaoS819uqljChomCS4Y62rIaco8t/uWjL0CQEUb
sV2Zzv/kgXOItnooHvoIBb3YsRz5BIx5m/k3XJevarO+8qfQRiKNrvX5N2KOUZlB
K/LmKrgIVF/7k2YGExMCQQDQBq4gJRP3xzwQYKhYjKUt/Q/bBsRkX09roPTh+/WX
4flxg1JLMZe7ZSeAscTw0MHwkyhRUUkCQ7LEjz10xtDs
-----END RSA PRIVATE KEY-----

-----BEGIN RSA PUBLIC KEY-----
MIGJAoGBAN9uDRXFlp60kA4wdCcQJdNRKuwZb75QdrTU6wkKZgm5JVJKUXSPYu2V
nzc8AN7Kr/C2M3Wl0kb75INRVsHSAfiVP6/fJddAlpvJpq3gS7cbAMlLHWxf1T6G
IOU9LHA2VlgBKA9mclhRcifWvEIvir4j1N5r1iMkQ7mIvEjL0ECtAgMBAAE=
-----END RSA PUBLIC KEY-----

```

### 載入已有金鑰

##### With a PEM string

```swift
let publicKey = try PublicKey(pemEncoded: str)
let privateKey = try PrivateKey(pemEncoded: str)
```

##### With a Base64 string

```swift
let publicKey = try PublicKey(base64Encoded: base64String)
let privateKey = try PrivateKey(base64Encoded: base64String)
```



### 使用公鑰加密

```swift
let plainText = "Clear Text"
let publicKey = try! PublicKey(pemEncoded:try! publicKey.pemString())
let clear = try! ClearMessage(string: plainText, using: .utf8)
let encrypted = try! clear.encrypted(with: publicKey, padding: .PKCS1)
let cipherText = encrypted.base64String
print(cipherText)
```



### 使用私鑰解密

```swift
let encryptedDec = try! EncryptedMessage(base64Encoded: cipherText)
let clearDec = try! encryptedDec.decrypted(with: privateKey, padding: .PKCS1)
//let data = clearDec.data  //二進位資料
//let base64String = clearDec.base64Encoded //base64
let orgistring = try! clearDec.string(encoding: .utf8)
print(orgistring)
```





## 4-13- NodeJS / ES6



使用 node-forge 套件

https://www.npmjs.com/package/node-forge

### 安裝

```shell
npm install node-forge
```



### 建立金鑰組（公鑰/私鑰）

```jsx
var rsa = forge.pki.rsa;
var pki = forge.pki;

// 使用 synchronously 產生 keypair
var keypair = rsa.generateKeyPair({bits: 1024, e: 0x10001});

// 轉換 Forge key to PEM-格式
var pem = pki.publicKeyToPem(keypair.publicKey);
var pem_pub = pki.privateKeyToPem(keypair.privateKey);
console.log(pem)
console.log(pem_pub)
```

### 載入已有金鑰

#### With a PEM string

```jsx
// convert a PEM-formatted public key to a Forge public key
var publicKey = pki.publicKeyFromPem(pub_str);
var privateKey = pki.privateKeyFromPem(pri_str);
```



### 使用公鑰加密

```jsx
const text = 'Clear Text';
// 預設使用 RSAES PKCS#1 v1.5
var encrypted = publicKey.encrypt(text);
var cipherText = forge.util.encode64(encrypted)

```



### 使用私鑰解密

```jsx
//解密需要帶入 Bytes 資料，如果拿到的資料是 base64或 hex，需要先進行轉換
const cipherData = forge.util.decode64(text)
//const cipherData  = forge.util.hexToBytes(hex);

var decrypted = privateKey.decrypt(cipherData);
console.log(decrypted)
```







## 4-13- Android



### 建立金鑰

```java
1.	class RSAKeystoreUtil {
2.	    private val keyStoreProvider = "AndroidKeyStore"
3.	    private val alias = "ALIAS_CA"
4.	
5.	    private val keystore: KeyStore = KeyStore.getInstance(keyStoreProvider)
6.	
7.	    init {
8.	        keystore.load(null)
9.	        if (!keystore.containsAlias(alias)) {
10.	            genRSAKey()
11.	        }
12.	    }
13.	
14.	    private fun genRSAKey() {
15.	        val keyPairGenerator =
16.	            KeyPairGenerator.getInstance(KeyProperties.KEY_ALGORITHM_RSA, keyStoreProvider)
17.	        val keyGenParameterSpec = KeyGenParameterSpec
18.	            .Builder(alias, KeyProperties.PURPOSE_ENCRYPT or KeyProperties.PURPOSE_DECRYPT)
19.	            .setDigests(KeyProperties.DIGEST_SHA256, KeyProperties.DIGEST_SHA512)
20.	            .setEncryptionPaddings(KeyProperties.ENCRYPTION_PADDING_RSA_PKCS1)
21.	            .build()
22.	
23.	        keyPairGenerator.initialize(keyGenParameterSpec)
24.	        keyPairGenerator.generateKeyPair()
25.	    }
26.	    // ...
27.	} 

```

### 加密

```java
class RSAKeystoreUtil {
    // ...
    public fun encrypt(plaintext: String): String {
        val publicKey = keystore.getCertificate(alias).publicKey

        val cipher = Cipher.getInstance(rsaMode)
        cipher.init(Cipher.ENCRYPT_MODE, publicKey)

        return cipher.doFinal(plaintext.toByteArray()).toHexString()
    }
    // ...
}
```



### 解密

```java
class RSAKeystoreUtil {
    // ...
    public fun decrypt(encryptedText: String): String {
        val privateKey = keystore.getKey(alias, null) as PrivateKey

        val cipher = Cipher.getInstance(rsaMode)
        cipher.init(Cipher.DECRYPT_MODE, privateKey)

        return cipher.doFinal(encryptedText.hexToByteArray()).toString(StandardCharsets.UTF_8)
    }
    // ...
}
```



### 將ByteArray轉HEX格式

```java
fun ByteArray.toHexString(): String =
    joinToString(separator = "") { byte ->
        "%02x".format(byte)
    }
```

### 將HEX轉ByteArray

```kotlin
fun String.hexToByteArray(): ByteArray =
    chunked(2)
        .map { it.toInt(16).toByte() }
        .toByteArray()
```





