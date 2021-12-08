# 4-6 使用3DES（實戰篇）



### IOS

#### 方法1 (swift)

```
pod 'SCrypto', '~> 2.0.0'
```

```swift
let plaintext = "咩".data(using: String.Encoding.utf8)!
let sharedSecretKey = "Secret key".data(using: String.Encoding.utf8)!
let IV = "0000000000000000".data(using: String.Encoding.utf8)!

let encrypted = try! plaintext.encrypt(.tripleDES, options: .PKCS7Padding, key: sharedSecretKey, iv: IV)     
let decrypted = try! ciphertext.decrypt(.tripleDES, options: .PKCS7Padding, key: sharedSecretKey, iv: IV)
```



#### 方法2(obj-c)

採用舊版 CommonCrypto 套件

> CommonCrypto 是由[AlanQuatermain/aqtoolkit](https://github.com/AlanQuatermain/aqtoolkit) 移植出來的此為obj-c library 且最後更新 2013/3 

```
pod 'CommonCrypto', '~> 1.1'
```

另外如果要在swift 需要人做好的 Swift wrapper 使用 https://github.com/alexaubry/Crypto 也是個不錯的選擇



#### 方法3(obj-c)

採用CommonCrypto 

[Objc原始碼](../../source/CommonCrypto-objC)



### NodeJS / ES6

```
const CryptoJS = require("crypto-js");

const message = "咩"
const key = "Secret key"

var encrypted = CryptoJS.TripleDES.encrypt(message, key);
var decrypted = CryptoJS.TripleDES.decrypt(encrypted, key);
console.log(`加密：${encrypted.toString()}`)
console.log(`解密：${decrypted.toString(CryptoJS.enc.Utf8)}`)
```



### Android / JAVA

```java
package com.qust;  
import java.io.UnsupportedEncodingException;  
import javax.crypto.Cipher;  
import javax.crypto.SecretKey;  
import javax.crypto.spec.SecretKeySpec;  
/** 
 *  
 * @ClassName: com.qust.SecretUtils 
 * @Description: 3DES加密解密工具類 
 * @author zhaokaiqiang 
 * @date 2014-11-13 下午11:28:14 
 *  
 */
publicclass DES3Utils {  
    // 定義加密演算法，DESede即3DES
    privatestaticfinal String Algorithm = "DESede";  
    // 加密金鑰
    privatestaticfinal String PASSWORD_CRYPT_KEY = "zhaokaiqiang1992";  
    /** 
     * 加密方法 
     *  
     * @param src 
     *            源資料的位元組陣列 
     * @return 
     */
    publicstaticbyte[] encryptMode(byte[] src) {  
        try {  
            // 生成金鑰
            SecretKey deskey = new SecretKeySpec(  
                    build3DesKey(PASSWORD_CRYPT_KEY), Algorithm);  
            // 例項化Cipher
            Cipher cipher = Cipher.getInstance(Algorithm);  
            cipher.init(Cipher.ENCRYPT_MODE, deskey);  
            return cipher.doFinal(src);  
        } catch (java.security.NoSuchAlgorithmException e1) {  
            e1.printStackTrace();  
        } catch (javax.crypto.NoSuchPaddingException e2) {  
            e2.printStackTrace();  
        } catch (java.lang.Exception e3) {  
            e3.printStackTrace();  
        }  
        returnnull;  
    }  
    /** 
     * 解密函式 
     *  
     * @param src 
     *            密文的位元組陣列 
     * @return 
     */
    publicstaticbyte[] decryptMode(byte[] src) {  
        try {  
            SecretKey deskey = new SecretKeySpec(  
                    build3DesKey(PASSWORD_CRYPT_KEY), Algorithm);  
            Cipher c1 = Cipher.getInstance(Algorithm);  
            c1.init(Cipher.DECRYPT_MODE, deskey);  
            return c1.doFinal(src);  
        } catch (java.security.NoSuchAlgorithmException e1) {  
            e1.printStackTrace();  
        } catch (javax.crypto.NoSuchPaddingException e2) {  
            e2.printStackTrace();  
        } catch (java.lang.Exception e3) {  
            e3.printStackTrace();  
        }  
        returnnull;  
    }  
    /** 
     * 根據字串生成金鑰24位的位元組陣列 
     *  
     * @param keyStr 
     * @return 
     * @throws UnsupportedEncodingException 
     */
    publicstaticbyte[] build3DesKey(String keyStr)  
            throws UnsupportedEncodingException {  
        byte[] key = newbyte[24];  
        byte[] temp = keyStr.getBytes("UTF-8");  
        if (key.length > temp.length) {  
            System.arraycopy(temp, 0, key, 0, temp.length);  
        } else {  
            System.arraycopy(temp, 0, key, 0, key.length);  
        }  
        return key;  
    }  
}  
```

```java
package com.qust;  
publicclass Main {  
    publicstaticvoid main(String[] args) {  
        String msg = "使用3DES對資料進行加密";  
        System.out.println("【加密前】：" + msg);  
        // 加密
        byte[] secretArr = DES3Utils.encryptMode(msg.getBytes());  
        System.out.println("【加密後】：" + new String(secretArr));  
        // 解密
        byte[] myMsgArr = DES3Utils.decryptMode(secretArr);  
        System.out.println("【解密後】：" + new String(myMsgArr));  
    }  
}  
```



