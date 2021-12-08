

import CryptoJS from 'crypto-js';



const page = (data) => {
  

    
    // 
    return (
        <>
        <h3>Padding</h3>
        
        </>
    );
}





export async function getServerSideProps(context) {

    
    
    var key =  CryptoJS.enc.Hex.parse("00000000000000000000000000000000");
    var iv = CryptoJS.enc.Hex.parse('1'); 
    
    const message = "Message";


    var encrypted = CryptoJS.AES.encrypt(message, key,{
      mode:CryptoJS.mode.ECB,
      padding:CryptoJS.pad.Pkcs7
      // padding: CryptoJS.pad.AnsiX923    
    });

    var encrypted_cbc = CryptoJS.AES.encrypt(message, key,{ 
      iv:iv,
      mode:CryptoJS.mode.CBC,
      padding:CryptoJS.pad.Pkcs7
    });

    // console.log(key)
    // console.log(iv)
    console.log(`key : ${encrypted.key}`)
    console.log(`iv : ${encrypted.iv}`)
    console.log(`salt : ${encrypted.salt}`)

    console.log(`-------------------------`)
    
    console.log(`cbc key : ${encrypted_cbc.key}`)
    console.log(`cbc iv : ${encrypted_cbc.iv}`)
    console.log(`cbc salt : ${encrypted_cbc.salt}`)

    return {
      props: {

      }, 
    }
  }

export default page;

