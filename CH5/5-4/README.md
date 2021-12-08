# 5-4 要別人看不懂，自己也看不懂的 - 混淆



### 5-4-1     字串混淆（Obfuscated String）

#### 準備解密char和轉回iOS NSString函式

```objective-c
/* 字串混淆解密函數，將char[] 形式字符數組和 0xAA XOR運算 */ 
extern char* decryptConfusionCS(char* string) {
 char* origin_string = string;
 while(*string) {
  *string ^= 0xAA; string++; 
 } 
 return origin_string; 
}


extern NSString* decryptConstString(char* string) {
 /* 先執行decryptConfusionString函數解密字串 */ 
 char* str = decryptConfusionCS(string);
 unsigned long len = strlen(str);
 NSUInteger length = [[NSString stringWithFormat:@"%lu",len] integerValue];
 NSString *resultString = [[NSString alloc]initWithBytes:str length:length encoding:NSUTF8StringEncoding];
 return resultString;
}
```

#### 定義 #define

```
#ifdef app_confusion 
    /* app_confusion #define被定義，那麼就進行執行解密腳本 */
    /* confusion_NSSTRING #define的返回結果是NSString 類型的 */
    #define confusion_NSSTRING(string) decryptConstString(string)
    /* confusion_CSTRING #define的返回結果是char* 類型的 */ 
    #define confusion_CSTRING(string) decryptConfusionCS(string) 
  #else 
    /* app_confusion #define沒有被定義，那麼就執行加密腳本 */
    /* 加密NSString類型的 */
    #define confusion_NSSTRING(string) @string 
    /* 加密char *類型的 */
    #define confusion_CSTRING(string) string 
#endif
```



```
NSString *str = confusion_NSSTRING("Hello World");
```



#### 原始檔案

```objc
/* 字串混淆解密函數，將char[] 形式字符數組和 aa異或運算揭秘 */
extern char* decryptConfusionCS(char* string) {
	char* origin_string = string;
	while(*string) {
	 *string ^= 0xAA;
	 string++;
	}
	return origin_string;
}
/* 解密函數，返回的是NSString類型的 */
extern NSString* decryptConstString(char* string) {
	/* 先執行decryptConfusionString函數解密字串 */
	char* str = decryptConfusionCS(string);
	/* 獲取字串的長度 */
	unsigned long len = strlen(str);
	NSUInteger length = [[NSString stringWithFormat:@"%lu",len] integerValue];
	NSString *resultString = [[NSString alloc]initWithBytes:str length:length encoding:NSUTF8StringEncoding];
	return resultString;
}

/* * 使用app_confusion 
#define 控制加密解密 * 當app_confusion 
#define 被定義的時候，執行加密腳本，對字串進行加密 * 當app_confusion 
#define 被刪除或為定義時，執行解密腳本，對字串解密 
*/
#define app_confusion 
#ifdef app_confusion 
/* app_confusion  #define 被定義，那麼就進行執行解密腳本 */
/* confusion_NSSTRING #define 的返回結果是NSString 類型的 */
#define confusion_NSSTRING(string) decryptConstString(string) /* confusion_CSTRING #define 的返回結果是char* 類型的 */
#define confusion_CSTRING(string) decryptConfusionCS(string) #else /* app_confusion  #define 沒有被定義，那麼就執行加密腳本 */
/* 加密NSString類型的 */
#define confusion_NSSTRING(string) @string /* 加密char *類型的 */
#define confusion_CSTRING(string) string 
#endif 

@interface ViewController () 
@end 

@implementation ViewController 

- (void)viewDidLoad {
	[super viewDidLoad];
	// Do any additional setup after loading the view, typically from a nib. /* 使用confusion_NSSTRING #define 包含需要加密的NSString字串 */
	NSString *str = confusion_NSSTRING("Hello World");
	NSLog(@"%@",str);
	/* 使用confusion_NSSTRING #define 包含需要加密的char*字串 */
	char* cStr = confusion_CSTRING("Super Man");
	NSLog(@"%s",cStr);
}
```



#### Python 混淆腳本 confusion.py

```python
#!/usr/bin/env python
# encoding=utf8
# -*- coding: utf-8 -*-
# 腳本將會用於對指定目錄下的.h .m 原始檔中的字串進行轉換
# 替換所有字串常量為加密的char數組，形式((char[]){1, 2, 3, 0})

import importlib
import os
import re
import sys


# replace替換字串為((char[]){1, 2, 3, 0})的形式，同時讓每個字節與0xAA XOR運算進行加密
# 當然可以不使用0xAA 使用其他的十六進位也行 例如0XBB、0X22、0X11
def replace(match):
    string = match.group(2) + '\x00'
    replaced_string = '((char []) {' + ', '.join(["%i" % ((ord(c) ^ 0xAA) if c != '\0' else 0) for c in list(string)]) + '})'
    return match.group(1) + replaced_string + match.group(3)


# obfuscate方法是修改傳入文件原始碼中用confusion_NSSTRING標記的所有字串
# 使用replace函數對字串進行異或轉換

def obfuscate(file):
    with open(file, 'r') as f:
        code = f.read()
        f.close()
        code = re.sub(r'(confusion_NSSTRING\(|confusion_CSTRING\()"(.*?)"(\))', replace, code)
        code = re.sub(r'//#define ggh_confusion', '#define ggh_confusion', code)
        with open(file, 'w') as f:
            f.write(code)
            f.close()


# openSrcFile方法是讀取原始碼路徑下的所有.h和.m 文件
# 對每個文件執行obfuscate函數
def openSrcFile(path):
    print("混淆的路徑為 "+ path)
    # this folder is custom
    for parent,dirnames,filenames in os.walk(path):
        #case 1:
        #        for dirname in dirnames:
        #            print((" parent folder is:" + parent).encode('utf-8'))
        #            print((" dirname is:" + dirname).encode('utf-8'))
        #case 2
        for filename in filenames:
            extendedName = os.path.splitext(os.path.join(parent,filename))
            if (extendedName[1] == '.h' or extendedName[1] == '.m'):
                print("處理原始碼文件: "+ os.path.join(parent,filename))
                obfuscate(os.path.join(parent,filename))


#這裡需要修改原始碼的路徑為自己工程的文件夾名稱
srcPath = '../AppSec'

if __name__ == '__main__':
    print("本腳本用於對原始碼中被標記的字串進行加密")
    
    if len(srcPath) > 0:
        openSrcFile(srcPath)
    else:
        print("請輸入正確的原始碼路徑")
        sys.exit()
```



#### Python 混淆腳本 decrypt.py

```python
#!/usr/bin/env python
# encoding=utf8
# -*- coding: utf-8 -*-
# 解密腳本
# 替換所有標記過的加密的char數組為字串常量，""

import importlib
import os
import re
import sys


# 替換((char[]){1, 2, 3, 0})的形式為字串，同時讓每個數組值與0xAA XOR進行解密
def replace(match):
    string = match.group(2)
    decodeConfusion_string = ""
    for numberStr in list(string.split(',')):
        if int(numberStr) != 0:
            decodeConfusion_string = decodeConfusion_string + "%c" % (int(numberStr) ^ 0xAA)
    replaced_string = '\"' + decodeConfusion_string + '\"'

    print("replaced_string = " + replaced_string)
    
    return match.group(1) + replaced_string + match.group(3)


# 修改原始碼，加入字串加密的函數
def obfuscate(file):
    with open(file, 'r') as f:
        code = f.read()
        f.close()
        code = re.sub(r'(confusion_NSSTRING\(|confusion_CSTRING\()\(\(char \[\]\) \{(.*?)\}\)(\))', replace, code)
        code = re.sub(r'[/]*#define ggh_confusion', '//#define ggh_confusion', code)
        with open(file, 'w') as f:
            f.write(code)
            f.close()


#讀取原始碼路徑下的所有.h和.m 文件
def openSrcFile(path):
    print("解密路徑： "+ path)
    # this folder is custom
    for parent,dirnames,filenames in os.walk(path):
        #case 1:
        #        for dirname in dirnames:
        #            print((" parent folder is:" + parent).encode('utf-8'))
        #            print((" dirname is:" + dirname).encode('utf-8'))
        #case 2
        for filename in filenames:
            extendedName = os.path.splitext(os.path.join(parent,filename))
            #讀取所有.h和.m 的源文件
            if (extendedName[1] == '.h' or extendedName[1] == '.m'):
                print("已解密文件:"+ os.path.join(parent,filename))
                obfuscate(os.path.join(parent,filename))


#原始碼路徑
srcPath = '../daimahunxiao'
if __name__ == '__main__':
    print("字串解混淆腳本，將被標記過的char數組轉為字串，並和0xAA異或。還原代碼")
    if len(srcPath) > 0:
        openSrcFile(srcPath)
    else:
        print("請輸入正確的原始碼路徑！")
        sys.exit()

```







### 5-4-2 程式碼混淆（CodeObfuscation）



#### l iOS 程式碼混淆

大部分的會自己寫混淆腳本，但也有工具推薦使用，優缺點就是靈活度跟花費時間斟酌。

- Obj-C：https://github.com/CUITCHE/code-obfuscation

- Swift：https://github.com/rockbruno/swiftshield

 

#### l Android 程式碼混淆

以下兩種是常用的Android 混淆：

- [Android R8（系統內建）]( https://developer.android.com/studio/build/shrink-code#obfuscate)

- [ProGuard](https://github.com/Guardsquare/proguard)





#### 1.設定 `build.gradle` 

release 模式 下minifyEnabled值改為true，開啟混淆；
加上shrinkResources true，打开資源壓縮。

```yaml
android {
      buildTypes {
          release {
              minifyEnabled true
              shrinkResources true
              proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
          }
      }
  }
```

#### 2.自定混淆規則

```
#指定壓縮級別
-optimizationpasses 5

#不跳過非公共的庫的類成員
-dontskipnonpubliclibraryclassmembers

#混淆時採用的算法
-optimizations !code/simplification/arithmetic,!field/*,!class/merging/*

#把混淆類中的方法名也混淆了
-useuniqueclassmembernames

#優化時允許訪問並修改有修飾符的類和類的成員 
-allowaccessmodification

#將文件來源重命名為“SourceFile”字符串
-renamesourcefileattribute SourceFile
#保留行號
-keepattributes SourceFile,LineNumberTable

#保持所有實現 Serializable 接口的類成員
-keepclassmembers class * implements java.io.Serializable {
    static final long serialVersionUID;
    private static final java.io.ObjectStreamField[] serialPersistentFields;
    private void writeObject(java.io.ObjectOutputStream);
    private void readObject(java.io.ObjectInputStream);
    java.lang.Object writeReplace();
    java.lang.Object readResolve();
}

#Fragment不需要在AndroidManifest.xml中註冊，需要額外保護下
-keep public class * extends android.support.v4.app.Fragment
-keep public class * extends android.app.Fragment

# 保持測試相關的代碼
-dontnote junit.framework.**
-dontnote junit.runner.**
-dontwarn android.test.**
-dontwarn android.support.test.**
-dontwarn org.junit.**
```



### 5-4-4    Android 混淆機制+

#### l 推薦工具：

- [AndroidShell](https://github.com/longtaoge/AndroidShell)

  防止直接對APK反編譯，提高Android安全性，給真APK加上一個外殼，當外殼運行的時侯，再把真正的程序解密出來，動態加載到系統中。

-  [AndResGuard](https://github.com/shwenzhang/AndResGuard)

  資源混淆，把冗長的資源路徑變短，res/drawable/wechatr變成r/d/a ，而檔案wechat.png變成a.png，配合系統混淆使用。
