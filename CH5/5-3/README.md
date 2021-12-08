# 5-3 通通脫掉 - 反編譯Decompiling

### 5-3-1 反編譯(Decompiling) - 砸殼

砸殼工具：

- [dumpdecrypted](https://juejin.im/post/5d31e948f265da1bd2612788)
- [frida-ios-dump](https://github.com/AloneMonkey/frida-ios-dump)
- https://frida.re/
- [clutch](https://github.com/KJCracks/Clutch/releases)



### 5-3-2  反編譯(Decompiling) - Class-Dump



在Terminal 執行

```bash
./class-dump -H APP路徑/APP名稱.app -o 匯出目標資料夾
```

```bash
class-dump -H .../DerivedData/AppSecDev-xxxxxx/Build/Products/Debug-iphonesimulator/AppSecDev.app -o ./out
```

[參考資料夾](./Class-Dump) 





### 5-3-4    逆向及反編譯工具
 - #### 免費的工具：

   - [class-dump（Nygard）](http://stevenygard.com/projects/class-dump/)
     屬於靜態分析的一種，將公開類別名及方法匯出，只支援Objective-C。
   - [class-dump-z：](https://code.google.com/archive/p/networkpx/wikis/class_dump_z.wiki)
     class-dump-z速度比其前任（class-dump）快近10倍。
   - [dsdump：](https://github.com/DerekSelander/dsdump)
     支援Objective-C和Swift。支持Swift 5+命令工具，用於檢查Mach-O（Mach object）主要針對 Objective-C classes, categories, and protocols。
   - [Ghidra：](https://ghidra-sre.org/)
     美國國家安全局開發的開源的逆向工程工具。能適用於各種平台包含Windows、Mac和Linux。
   - [frida：](https://frida.re/)
     可透過Javascript腳本，在函數或方法呼叫前，透過Hook技術綁訂，可追蹤回傳值，或動態修改資料。
   - [dex2jar：](https://github.com/pxb1988/dex2jar)
     可將dex轉回.class工具。

 - #### 付費或有限制免費使用的工具：

   - [IDA Pro](https://www.hex-rays.com/products/ida/)
     屬可以處理iOS二進製文件。有內建 iOS Debuger。UI 操作很棒，但很貴，很多不錯的功能(插件)也都是另外買。
   - [Hopper](https://www.hopperapp.com/)
     用於macOS和Linux的逆向工具，用於disassemble, decompile，能反編譯32/64 Mac、Linux、Windows和iOS的可執行檔，最大的優點是比IDA便宜多了。