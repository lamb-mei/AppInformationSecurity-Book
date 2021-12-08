var crypto = require("crypto");
var eccrypto = require("eccrypto");

//建立公鑰
var privateKey = eccrypto.generatePrivate();
//計算公鑰
var publicKey = eccrypto.getPublic(privateKey);

var str = "message to sign";
//將訊息hash 在進行簽名（非必要）
var msg = crypto.createHash("sha256").update(str).digest();
//簽名
eccrypto.sign(privateKey, msg).then(function(sig) {
    console.log("簽名 DER 格式:", sig);

    //驗證簽名
    eccrypto.verify(publicKey, msg, sig).then(function() {
      console.log("簽名驗證成功");
    }).catch(function() {
      console.log("簽名驗證失敗");
    });
});








