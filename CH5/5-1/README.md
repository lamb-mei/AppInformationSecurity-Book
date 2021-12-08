# 5-1 憑證綁定（Certificate Pinning）-綁起來



### 5-1-5    憑證綁定 Certificate Pinning - iOS實例

#### Alamofire 4

```swift
import Alamofire
//自定 manager
fileprivate static var manager: Alamofire.SessionManager = {

    // Create custom manager
    let configuration = URLSessionConfiguration.default
    configuration.httpAdditionalHeaders = Alamofire.SessionManager.defaultHTTPHeaders
    return Alamofire.SessionManager(
        configuration: configuration,
        serverTrustPolicyManager: CustomServerTrustPoliceManager()
    )
}()

class CustomServerTrustPoliceManager : ServerTrustPolicyManager {
    //自訂信任協議
    override func serverTrustPolicy(forHost host: String) -> ServerTrustPolicy? {
        //如果網域符合
        if host.hasSuffix("www.example.com") {
						//從檔案資料夾取出憑證
            let dir_bundle:Bundle = Bundle.init(path: "/certificates")!           
            let serverTrustPolicy = ServerTrustPolicy.pinCertificates(
                //進行比對的參數
                certificates: ServerTrustPolicy.certificates(in:dir_bundle),
                validateCertificateChain: true,
                validateHost: true
            )
            return serverTrustPolicy
        }
        return .performDefaultEvaluation(validateHost: true)
    }
    public init() {    
        super.init(policies: [:])
    }
}
```



#### Alamofire 5

```swift
fileprivate static var manager: Session = {
        let configuration = URLSessionConfiguration.af.default

        class SelfClass { }
        let bundle = Bundle(for: SelfClass.self)
        let url = bundle.bundleURL
        let certBundle: Bundle = Bundle.init(url: url.appendingPathComponent("certificates", isDirectory: true))!

        var evaluators: [String: ServerTrustEvaluating] = [:]
        let cs = certBundle.af.certificates
        let pinnedEvaluating = PinnedCertificatesTrustEvaluator(certificates: cs, acceptSelfSignedCertificates: false, performDefaultValidation: true, validateHost: true)
        evaluators["*.test.com.tw"] = pinnedEvaluating

        let manager = WildcardServerTrustPolicyManager(evaluators: evaluators)
        let session = Session(configuration: configuration, serverTrustManager: manager)
        return session
}()
```



```swift
class WildcardServerTrustPolicyManager: ServerTrustManager {
    override func serverTrustEvaluator(forHost host: String) throws -> ServerTrustEvaluating? {
        if let policy = evaluators[host] {
            return policy
        }
        var domainComponents = host.split(separator: ".")
        if domainComponents.count > 2 {
            domainComponents[0] = "*"
            let wildcardHost = domainComponents.joined(separator: ".")
            return evaluators[wildcardHost]
        }
        return nil
    }
}
```





### 5-1-6    憑證綁定 Certificate Pinning - Android實例

#### 網路安全配置

>  官方文件：https://developer.android.com/training/articles/security-config.html#CertificatePinning

透過 [<Pin-Set>](https://developer.android.com/training/articles/security-config.html#CertificatePinning)  進行設定

> res/xml/network_security_config.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
    <domain-config>
        <domain includeSubdomains="true">example.com</domain>
        <pin-set expiration="2018-01-01">
            <pin digest="SHA-256">7HIpactkIAq2Y49orFOOQKurWxmmSFZhBCoQYcRhJ3Y=</pin>
            <!-- backup pin -->
            <pin digest="SHA-256">fwza0LRMXouZHRC8Ei+4PyuldPDcf3UKgO/04cDM1oE=</pin>
        </pin-set>
    </domain-config>
</network-security-config>
```

或是使用程式碼的方式，將金鑰放入KeyStore，再連線的時候進行比對

```java
KeyStore keyStore = ...;
String algorithm = TrustManagerFactory.getDefaultAlgorithm();
TrustManagerFactory tmf = TrustManagerFactory.getInstance(algorithm);
tmf.init(keyStore);

SSLContext context = SSLContext.getInstance("TLS");
context.init(null, tmf.getTrustManagers(), null);

URL url = new URL("https://www.example.com/");
HttpsURLConnection urlConnection = (HttpsURLConnection) url.openConnection();
urlConnection.setSSLSocketFactory(context.getSocketFactory());
InputStream in = urlConnection.getInputStream();
```





## 5-1-8 使用OpenSSL進行憑證格式轉換

#### OpenSSL安裝

####  **Windows**

1. 使用 Git 內建的 OpenSSL 工具

   當安裝 Git for Windows （https://www.git-scm.com/download/win） 的時候，就已經內建OpenSSL 工具，預設執行檔路徑為  C:\Program Files\Git\usr\bin\openssl.exe，可以將 C:\Program Files\Git\usr\bin 路徑加入到 PATH 環境變數之中，以後就可以直接輸入 openssl 來執行此命令。

2. 透過預先編譯好的 OpenSSL 安裝程式 

   安裝程式 OpenSSL Installer for Windows - Shining Light Productions (下載連結：https://slproweb.com/products/Win32OpenSSL.html 下載第一個)



#### Mac OS

- 系統預設

  新的系統內都已經有openSSL 命令，直接開啟終端機即可使用

-  Homebrew

  可以透過homebrew 安裝指定版本

  ```bash
  brew update
  brew install openssl
  echo 'export PATH="/usr/local/opt/openssl/bin:$PATH"' >> ~/.bash_profile
  source ~/.bash_profile
  ```





#### 檢視憑證

```
openssl s_client -connect google.com.tw:443 < /dev/null
```



### 下載憑證

#### DER 格式

```bash
openssl s_client -connect google.com.tw:443 </dev/null \
  | openssl x509 -outform DER -out google.der
```

#### PEM 格式

```bash
openssl s_client -connect google.com.tw:443 </dev/null \
  | openssl x509 -outform PEM -out google.pem
```



#### 一鍵下載憑證鏈上所有憑證

有時會需要 頂層的Root CA憑證，或者其中的憑證商的中繼憑證，小咩把私藏的用一行命令把整個憑證鏈（certificate chain）依照檔案下載



```bash
#!/bin/bash
openssl s_client -showcerts -verify 3 -connect google.com.tw:443 < /dev/null | awk '/BEGIN/,/END/{ if(/BEGIN/){a++}; out="cert"a".pem"; print >out}'; for cert in *.pem; do newname=$(openssl x509 -noout -subject -in $cert | sed -nE 's/.*CN ?= ?(.*)/\1/; s/[ ,.*]/_/g; s/__/_/g; s/_-_/-/; s/^_//g;p' | tr '[:upper:]' '[:lower:]').pem; echo "${newname}"; mv "${cert}" "${newname}";openssl x509 -outform der -in $newname -out $newname.der; done
```









