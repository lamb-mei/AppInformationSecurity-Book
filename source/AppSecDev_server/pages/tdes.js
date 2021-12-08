

// import hmacSHA256 from 'crypto-js/hmac-sha256';
// import Hex from 'crypto-js/enc-hex';

// import TripleDES from 'crypto-js/tripledes'
// import Utf8 from 'crypto-js/enc-utf8'
const CryptoJS = require("crypto-js");

const page = () => {
   

    const message = "咩"
    const key = "Secret key"
    
    // var encrypted = TripleDES.encrypt(message, key);
    // var decrypted = TripleDES.decrypt(encrypted, key);

    var encrypted = CryptoJS.TripleDES.encrypt(message, key);
    var decrypted = CryptoJS.TripleDES.decrypt(encrypted, key);
    console.log(`加密：${encrypted.toString()}`)
    console.log(`解密：${decrypted.toString(CryptoJS.enc.Utf8)}`)
    // 
    return (
        <>
        <h3>TDES</h3>
        <div>Key： {key.toString()}</div>
        <div>加密： {encrypted.toString()}</div>
        <div>解密： {decrypted.toString(CryptoJS.enc.Utf8)}</div>
        </>
    );
}

export default page;