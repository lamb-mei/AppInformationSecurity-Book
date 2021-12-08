

// import hmacSHA256 from 'crypto-js/hmac-sha256';
// import Hex from 'crypto-js/enc-hex';

// import TripleDES from 'crypto-js/tripledes'
// import Utf8 from 'crypto-js/enc-utf8'
// const CryptoJS = require("crypto-js");
import CryptoJS from 'crypto-js';
// var CryptoJS = require("crypto-js");


const page = () => {
   

    const message = "咩"
    var key =  CryptoJS.enc.Hex.parse("00000000000000000000000000000000");
      
    var option={
        // iv:iv,
          mode:CryptoJS.mode.ECB, //預設值，可以不設定
          };
          
    var encrypted = CryptoJS.AES.encrypt(message, key,option);
    

    console.log(`key : ${encrypted.key}`)
    console.log(`iv : ${encrypted.iv}`)
    console.log(`salt : ${encrypted.salt}`)
    console.log(`enc : ${encrypted.toString()}`)

    // console.log(`ciphertext : ${encrypted.ciphertext}`)
    // console.log(`ciphertext-B64 : ${ encrypted.ciphertext.toString(CryptoJS.enc.Base64) }`)
    
    
    // 
    return (
        <>
        <h3>AES</h3>
        <div>message {message.toString()}</div>
        <div>key {encrypted.key.toString()}</div>
        <div>iv {String(encrypted.iv)}</div>
        <div>enc {encrypted.toString()}</div>
        {/* <div>dec {decrypted.toString(CryptoJS.enc.Utf8)}</div> */}
        </>
    );
}

export default page;