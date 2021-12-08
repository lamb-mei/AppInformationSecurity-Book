// import hmacSHA256 from 'crypto-js/hmac-sha256';
// import Hex from 'crypto-js/enc-hex';

// import TripleDES from 'crypto-js/tripledes'
// import Utf8 from 'crypto-js/enc-utf8'
// const CryptoJS = require("crypto-js");
import CryptoJS from 'crypto-js';
// var CryptoJS = require("crypto-js");


const page = () => {
   
    // https://asecuritysite.com/encryption/keygen
    
    const ta3Obj = {
        "source": "動物園",
        "service": { "sg_id": 1 },
        "vendor": {
          "id": "E01",
          "name": "大象"
        },
        "createAt":1617161301426
      }
    const message = JSON.stringify(ta3Obj)
    
    // const keyStr = "B095FD1EF598F204B4957EBC2B432E33"
    // const keyStr = "B095FD1EF598F204B4957EBC2B432E33"
    // const ivStr  = "1251C95A5B28F78000FC21E3161E79D0"
    
    var key =  CryptoJS.enc.Hex.parse("61CA20054ABDAC60B97E7A51A1D84A05606892214A6659A3");
    var iv = CryptoJS.enc.Hex.parse('8F6070F6ECE9DBC385DF34466DC39FEB'); 
      
    var option={
        iv:iv,
        mode:CryptoJS.mode.CBC, //預設值，可以不設定
        padding:CryptoJS.pad.Pkcs7//同上
    };
    
    var encrypted = CryptoJS.AES.encrypt(message, key,option);
    console.log(message)
    console.log(key)
    console.log(iv)
    console.log(`key : ${encrypted.key}`)
    console.log(`iv : ${encrypted.iv}`)
    console.log(`salt : ${encrypted.salt}`)
    console.log(`ciphertext : ${encrypted.ciphertext}`)
    console.log(`enc : ${encrypted.toString()}`)
    console.log(`ciphertext-B64 : ${ encrypted.ciphertext.toString(CryptoJS.enc.Base64) }`)
    
    

    // var decrypted = CryptoJS.AES.decrypt(encrypted, key);
    // console.log(`加密：${encrypted.toString()}`)
    // console.log(`解密：${decrypted.toString(CryptoJS.enc.Utf8)}`)


    

//     var message = "Secret Message";
// var key = CryptoJS.enc.Hex.parse('36ebe205bcdfc499a25e6923f4450fa8');
// var iv  = CryptoJS.enc.Hex.parse('be410fea41df7162a679875ec131cf2c');

// var encrypted = CryptoJS.AES.encrypt(
//     message,
//     key,
//     {
//       iv: iv,
//       mode: CryptoJS.mode.CBC,
//       padding: CryptoJS.pad.Pkcs7
//     }
//   );
//   console.log('            encrypted: '+encrypted.toString());


//     var key =  CryptoJS.enc.Hex.parse("00000000000000000000000000000000");
// // Encrypt
// var encrypted = CryptoJS.AES.encrypt('my message', key ,{salt:''});
//     console.log(`key : ${encrypted.key}`)
//     console.log(`iv : ${encrypted.iv}`)
//     console.log(`salt : ${encrypted.salt}`)
//     console.log(`ciphertext : ${encrypted.ciphertext}`)


// var ciphertext = encrypted.toString()

// // Decrypt
// var bytes  = CryptoJS.AES.decrypt(ciphertext, 'secret key 123');
// var originalText = bytes.toString(CryptoJS.enc.Utf8);

// console.log(originalText); // 'my message'



    // 
    return (
        <>
        <h3>AES</h3>
        <div>{`key : ${encrypted.key}`}</div>
        <div>{`iv : ${encrypted.iv}`}</div>
        <div>{`salt : ${encrypted.salt}`}</div>
        <div>{`ciphertext : ${encrypted.ciphertext}`}</div>
        <div>{`enc : ${encrypted.toString()}`}</div>
        <div>{`ciphertext-B64 : ${ encrypted.ciphertext.toString(CryptoJS.enc.Base64) }`}</div>
        {/* <div>enc {encrypted.toString()}</div> */}
        {/* <div>dec {decrypted.toString(CryptoJS.enc.Utf8)}</div> */}
        </>
    );
}

export default page;