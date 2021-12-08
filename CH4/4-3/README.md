# 4-3 幫訊息申請一個簽證 - 訊息鑑別碼 MAC





## 使用 HMAC 

### Swift

```swift
import CryptoSwift
let message = "咩"
let key = "key"
let signature = try! HMAC(key: key.bytes, variant: .sha256).authenticate(message.bytes)
print("HMAC \(signature.toHexString())")
```

> output: HMAC 4231f7ea6d0ddf2b9029f58513dbbb8f279b7e1261facaf60043991a7fdb8812



原始檔：  source/AppSecDev_ios/Playground/2-hmac.playground

[使用教學](../../README.md) #開啟.playground 方式



### NodeJS / ES6

```jsx
import hmacSHA256 from 'crypto-js/hmac-sha256';
import Hex from 'crypto-js/enc-hex';

const message = "咩"
const key = "key"
let hmac = hmacSHA256(message , key )
const hmacHex = hmac.toString();
```

> hmacHex :  4231f7ea6d0ddf2b9029f58513dbbb8f279b7e1261facaf60043991a7fdb8812



### Android

```java
private void generateHashWithHmac256(String message, String key) {
    try {
        final String hashingAlgorithm = "HmacSHA256"; //or "HmacSHA1", "HmacSHA512"

        byte[] bytes = hmac(hashingAlgorithm, key.getBytes(), message.getBytes());

        final String messageDigest = bytesToHex(bytes);

        Log.i(TAG, "message digest: " + messageDigest);

    } catch (Exception e) {
        e.printStackTrace();
    }
}

public static byte[] hmac(String algorithm, byte[] key, byte[] message) throws NoSuchAlgorithmException, InvalidKeyException {
    Mac mac = Mac.getInstance(algorithm);
    mac.init(new SecretKeySpec(key, algorithm));
    return mac.doFinal(message);
}

public static String bytesToHex(byte[] bytes) {
    final char[] hexArray = "0123456789abcdef".toCharArray();
    char[] hexChars = new char[bytes.length * 2];
    for (int j = 0, v; j < bytes.length; j++) {
        v = bytes[j] & 0xFF;
        hexChars[j * 2] = hexArray[v >>> 4];
        hexChars[j * 2 + 1] = hexArray[v & 0x0F];
    }
    return new String(hexChars);
}

```



