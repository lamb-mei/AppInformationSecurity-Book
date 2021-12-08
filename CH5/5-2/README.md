# 5-2 手機螢幕截圖安全性問題，小心被看光光





## 5-2-2 如何觸發Anddroid 非使用者主動截圖

> **debug** 模式下截圖

```bash
 adb shell screencap - p /sdcard/Download/1.png
```



## 5-2-3 實作- iOS截圖偵測

使用 **[userDidTakeScreenshotNotification](https://developer.apple.com/documentation/uikit/uiapplication/1622966-userdidtakescreenshotnotificatio)** 

```swift
let mainQueue = OperationQueue.main
NotificationCenter.default.addObserver(forName: UIApplication.userDidTakeScreenshotNotification, object: nil, queue: mainQueue) { notification in
     print("擷取圖片")
}

```



## 5-2-4 實作-Android偵測截圖



 **FileObserver** 為例

權限設定

```xml
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
```

程式碼

```java
public class ScreenshotActivity extends AppCompatActivity {
  private final String TAG = "Screenshot";
  private static final String PATH = Environment.getExternalStorageDirectory()   File.separator 
  Environment.DIRECTORY_PICTURES   File.separator   "Screenshots"   File.separator;
  
  protected void onCreate(@Nullable Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_screenshot);
    mFileObserver = new CustomFileObserver(PATH);
  }
  @Override
  protected void onResume() {
    super.onResume();
    mFileObserver.startWatching();
    Log.d(TAG, PATH);
  }
  @Override
    protected void onStop() {
    super.onStop();
    mFileObserver.stopWatching();
  }
  /**
  * 目錄監聽器
  */
  private class CustomFileObserver extends FileObserver {
    private String mPath;
    public CustomFileObserver(String path) {
    super(path);
    this.mPath = path;
  }
  public CustomFileObserver(String path, int mask) {
    super(path, mask);
    this.mPath = path;
  }
  @Override
  public void onEvent(int event, String path) {
    Log.d(TAG, path   " "   event);
    // 監聽到事件，做一些過濾去重處理操作
    }
  }
}
```





## 5-2-5 Android 禁止截圖

#### FLAG_SECURE 官方說明文件

https://developer.android.com/reference/android/view/Display#FLAG_SECURE 

https://developer.android.com/reference/android/view/WindowManager.LayoutParams#FLAG_SECURE



#### 設定FLAG_SECURE

方法1

```java
getWindow().setFlags(LayoutParams.FLAG_SECURE, LayoutParams.FLAG_SECURE);
```

方法2

```java
window.addFlags(WindowManager.LayoutParams.FLAG_SECURE);
```







