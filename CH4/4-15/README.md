# 4-15 非對稱式加密演算法 - 橢圓曲線密碼學 (實戰篇)



## 4-15-1 iOS

在 Swift ECC 可以使套件 BlueECC / CryptorECC

https://github.com/Kitura/BlueECC

支援 curves

- prime256v1
- secp384r1
- secp521r1

### 安裝

Cocoapods

```
pod "BlueECC"
```

#### 引用

```swift
import CryptorECC
```



#### 建立金鑰 - 私鑰

```swift
let eccPrivateKey1 = try! ECPrivateKey.make(for: .prime256v1)
//let eccPrivateKey1 = try! ECPrivateKey.make(for: .secp384r1)
let privateKeyPEM1 = eccPrivateKey1.pemString //私鑰 PEM格式
print(privateKeyPEM)
```

```
-----BEGIN EC PRIVATE KEY-----
 MHcCAQEEID7535QYt+y/ObP202MBBkbxCWmXuMbK/twNQOnf+uehoAoGCCqGSM49
 AwEHoUQDQgAEJnMKq9TviSt2NRH1UV1t6AGDotMA0zmhQDxy605BzxcAhYJpBaTd
 JjKERrhK+v4l6LgCm5Y7UnFvmNXHe3Qe2A==
 -----END EC PRIVATE KEY-----
```



#### 載入已有金鑰

##### With a PEM string

```swift
let privateKey = "-----BEGIN EC PRIVATE KEY----- ........ -----END EC PRIVATE KEY-----"
let eccPrivateKey = try! ECPrivateKey(key: privateKey)
print(eccPrivateKey.pemString)
```



#### 計算公鑰

```swift
let eccPublicKey = try! eccPrivateKey.extractPublicKey()
print(eccPublicKey.pemString)
```

```
-----BEGIN PUBLIC KEY-----
MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEJnMKq9TviSt2NRH1UV1t6AGDotMA
0zmhQDxy605BzxcAhYJpBaTdJjKERrhK+v4l6LgCm5Y7UnFvmNXHe3Qe2A==
-----END PUBLIC KEY-----
```

#### 使用公鑰加密

```swift
let plainText = "Clear Text"
let encryptedData = try! plainText.encrypt(with: eccPublicKey)
print(encryptedData.base64EncodedString())
```

#### 使用私鑰解密

```swift
let decryptedData = try! encryptedData.decrypt(with: eccPrivateKey)
print(String(data: decryptedData, encoding: .utf8))
```

----------------------------------------------------------------------------------------------------------------------------------

#### l Apple原生函式庫CryptoKit

OS需要iOS13以上

Apple官方文件：https://developer.apple.com/documentation/cryptokit



支援曲線:

- Curve25519

- P521

- P384

- P256



#### 引用套件

```swift
 import Cryptokit
```

 

#### **依曲線建立私鑰** 

```swift
//使用Curve25519曲線建立
let eccPrivateKey = Curve25519.KeyAgreement.PrivateKey()
//使用p256曲線建立
let ecc256PrivateKey = P256.KeyAgreement.PrivateKey()
```

  

#### 計算公鑰

```swift
//計算公鑰
let eccPublicKeyData = eccPrivateKey.publicKey.rawRepresentation
print("私鑰 \(eccPrivateKey.rawRepresentation.base64EncodedString())")
print("公鑰 \(eccPublicKeyData.base64EncodedString())"
```

#### 使用私鑰簽名

```swift
//使用私鑰簽名
let signingPrivateKey = Curve25519.Signing.PrivateKey()
let signingPublicKeyData =
    signingPrivateKey.publicKey.rawRepresentation
let data = "clear text".data(using: .utf8)!
let signatureForData = try! signingPrivateKey.signature(for: data)
```

#### 使用公鑰驗證簽名

```swift
let publicKey = try! Curve25519.Signing.PublicKey(
  rawRepresentation: signingPublicKeyData)
  if publicKey.isValidSignature(signatureForData, for: data) {
    print("isValidSignature data.")
}
```

 







## 4-15-2 NodeJS

NodeJS ECC 相關的套件主要是 ECDH ECDSA居多

官方系統函式庫不支援ECIES，詳情可見Node 官方Crypto 文件 https://nodejs.org/dist/latest-v14.x/docs/api/crypto.html



因此有神人就寫了一個套件  `eccrypto` 可支援ECDH ECDSA 以及 ECIES

https://github.com/bitchan/eccrypto

功能算完善，可惜支援曲線和演算法太少

> Only secp256k1 curve, only SHA-512 (KDF), HMAC-SHA-256 (HMAC) and AES-256-CBC for ECIES



#### 安裝

```shell
npm install eccrypto
```

#### 引用

```jsx
var eccrypto = require("eccrypto");
```



#### 建立金鑰 - 私鑰

```swift
var privateKey = eccrypto.generatePrivate();
```

#### 載入已有金鑰

```javascript
var asn = require("asn1.js");
var der_b64 = pri_str.match(/-----$([^]+)^-----/m)[1];
var der = Buffer(der_b64, "base64");
var Key = asn.define("Key", function() {
  this.seq().obj(
    this.key("_n").int(),
    this.key("priv").octstr()
  );
});
var privateKey = Key.decode(der, "der");
```

#### 計算公鑰

```swift
var publicKey = eccrypto.getPublic(privateKey);
```

#### 使用公鑰加密

```jsx
let textData = Buffer.from("Message"))
eccrypto.encrypt(publicKey, textData).then(function(encrypted) {
  console.log(encrypted.toString())
});
```

#### 使用私鑰解密

```jsx
eccrypto.decrypt(privateKey, encrypted).then(function(plaintext) {
    console.log("Message :", plaintext.toString());
  });
```





## 4-15-3 Android

產生金鑰對（KeyPair）



直接產生

```kotlin
KeyPairGenerator generator = KeyPairGenerator.getInstance("EC");
generator.initialize(new ECGenParameterSpec("secp521r1"));
KeyPair keyPair = generator.generateKeyPair();
ECPublicKey publicKey = (ECPublicKey) keyPair.getPublic();
ECPrivateKey privateKey = (ECPrivateKey) keyPair.getPrivate();
```



使用KeyStore產生金鑰對（KeyPair）
```kotlin
val kpg: KeyPairGenerator = KeyPairGenerator.getInstance(
        KeyProperties.KEY_ALGORITHM_EC,
        "AndroidKeyStore"
)
val parameterSpec: KeyGenParameterSpec = KeyGenParameterSpec.Builder(
        alias,
        KeyProperties.PURPOSE_SIGN or KeyProperties.PURPOSE_VERIFY
).run {
    setAlgorithmParameterSpec(new ECGenParameterSpec("secp256r1"))  
    setDigests(KeyProperties.DIGEST_SHA256, KeyProperties.DIGEST_SHA512)
    build()
}

kpg.initialize(parameterSpec)
val kp = kpg.generateKeyPair()
```


資料簽名
```kotlin
val ks: KeyStore = KeyStore.getInstance("AndroidKeyStore").apply {
    load(null)
}
val entry: KeyStore.Entry = ks.getEntry(alias, null)
if (entry !is KeyStore.PrivateKeyEntry) {
    Log.w(TAG, "Not an instance of a PrivateKeyEntry")
    return null
}
val signature: ByteArray = Signature.getInstance("SHA256withECDSA").run {
    initSign(entry.privateKey)
    update(data)
    sign()
}
```

驗證簽名

```kotlin
val ks = KeyStore.getInstance("AndroidKeyStore").apply {
    load(null)
}
val entry = ks.getEntry(alias, null) as? KeyStore.PrivateKeyEntry
if (entry == null) {
    Log.w(TAG, "Not an instance of a PrivateKeyEntry")
    return false
}
val valid: Boolean = Signature.getInstance("SHA256withECDSA").run {
    initVerify(entry.certificate)
    update(data)
    verify(signature)
}
```

https://developer.android.com/training/articles/keystore#kotlin



## 4-15-4 Python

sslcrypto

https://github.com/imachug/sslcrypto



```py
import sslcrypto

#建立曲線
curve = sslcrypto.ecc.get_curve("brainpoolP256r1")
#建立私鑰
private_key = curve.new_private_key()
#計算公鑰
public_key = curve.private_to_public(private_key)

data = b"Hello, world!"
#簽名
signature = curve.sign(data, private_key)
#驗證
assert curve.verify(signature, data, public_key) == True  # Would raise on error
```





