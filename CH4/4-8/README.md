# 4-8 使用AES（實戰篇）







Key 長度 128 ,  ECB 加密模式

### iOS Swift

```swift
import CryptoSwift

let aes_message = "咩"
let aes_key_HexString = "00000000000000000000000000000000" // aes128
let keyArray = Array<UInt8>.init(hex: aes_key_HexString)
if
    let aes = try? AES(key: keyArray, blockMode: ECB()) , 
    let encrypted = try? aes.encrypt(aes_message.bytes) ,
    let EncData = encrypted.toBase64()
{
    print(EncData)
}
```



### NodeJS / ES6

```jsx
import CryptoJS from 'crypto-js';

const message = "咩"
var key =  CryptoJS.enc.Hex.parse("00000000000000000000000000000000");
var option={
    mode:CryptoJS.mode.ECB,
};
          
var encrypted = CryptoJS.AES.encrypt(message, key, option);
    
console.log(`key : ${encrypted.key}`)
console.log(`enc : ${encrypted.toString()}`)

```



### Android / JAVA

```java
import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;
import org.apache.commons.codec.binary.Base64;
/**
 *
 */
public class AES {

    //Encrypt
    public static String Encrypt(String sSrc, String sKey) throws Exception {
        if (sKey == null) {
            System.out.print("Key is null");
            return null;
        }
        byte[] raw = sKey.getBytes("utf-8");
        SecretKeySpec skeySpec = new SecretKeySpec(raw, "AES");
        Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");
        cipher.init(Cipher.ENCRYPT_MODE, skeySpec);
        byte[] encrypted = cipher.doFinal(sSrc.getBytes("utf-8"));

        return new Base64().encodeToString(encrypted);
    }

    //Decrypt
    public static String Decrypt(String sSrc, String sKey) throws Exception {
        try {
            if (sKey == null) {
                System.out.print("Key is null");
                return null;
            }
            byte[] raw = sKey.getBytes("utf-8");
            SecretKeySpec skeySpec = new SecretKeySpec(raw, "AES");
            Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");
            cipher.init(Cipher.DECRYPT_MODE, skeySpec);
            byte[] encrypted1 = new Base64().decode(sSrc);
            try {
                byte[] original = cipher.doFinal(encrypted1);
                String originalString = new String(original,"utf-8");
                return originalString;
            } catch (Exception e) {
                System.out.println(e.toString());
                return null;
            }
        } catch (Exception ex) {
            System.out.println(ex.toString());
            return null;
        }
    }

    public static void main(String[] args) throws Exception {
        /*
         * 使用AES-128-ECB加密模式，key需要16位
         */
        String cKey = "0000000000000000";
        String cSrc = "咩";
        System.out.println(cSrc);
        //Encrypt
        String enString = AES.Encrypt(cSrc, cKey);
        System.out.println("Encrypt：" + enString);

        //Decrypt
        String DeString = AES.Decrypt(enString, cKey);
        System.out.println("Decrypt：" + DeString);
    }
}
```



AES加密過程

![nm3YhO0.gif](https://i.imgur.com/nm3YhO0.gif)





