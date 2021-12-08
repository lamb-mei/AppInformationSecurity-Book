
import fs from 'fs';
import CryptoJS from 'crypto-js';
// var images = require("images");


const page = (data) => {
  

    
    // 
    return (
        <>
        <h3>AES 加密模式示意圖</h3>
        {/* <div>enc {encrypted.toString()}</div> */}
        {/* <div>dec {decrypted.toString(CryptoJS.enc.Utf8)}</div> */}
        <style jsx>{`
        #wrap{
          display: flex;
          margin: 15px 15px 15px;
        }
        #wrap div{
          margin: 5px 5px 5px;
        }
        `}</style>
        <div id="wrap">
          <div>
            <div>明文</div>
            <img src={`data:image/bmp;base64,${data.img_base64_orgi}`} style={{width:"250px"}} />
          </div>
          <br/>
          <div>
            <div>ECB</div>
            <img src={`data:image/bmp;base64,${data.img_base64_ebc}`} style={{width:"250px"}}/>
          </div>
          <br/>
          <div>
            <div>CBC</div>
            <img src={`data:image/bmp;base64,${data.img_base64_cbc}`} style={{width:"250px"}}/>
          </div>
        </div>
        </>
    );
}


function bufferInjoin(buffArr){
   var len = 0;
   buffArr.forEach((buff,idx,arr)=>{
      len+=buff.length; 
    });
   var buffer = Buffer.concat(buffArr,len);
   return buffer;
}



export async function getServerSideProps(context) {

    // const contents = fs.readFileSync('./aes_img/FBLamb.bmp', {encoding: 'base64'});
    // var contents = images("./public/mp.jpg").size(50).encode("jpg", {operation:50}).toString('base64')
    const bitmap =  fs.readFileSync('./public/aes_img/FBLamb.bmp');

    var img_base64_orgi = bitmap.toString('base64');
    
    var key =  CryptoJS.enc.Hex.parse("00000000000000000000000000000000");
    var iv = CryptoJS.enc.Hex.parse('00000000000000000000000000000000'); 
    
      
    var option={
        // iv:iv,
        mode:CryptoJS.mode.ECB,
        padding:CryptoJS.pad.Pkcs7//同上
        
    };
    // padding: CryptoJS.pad.AnsiX923      
          
    const message = CryptoJS.enc.Base64.parse(img_base64_orgi);
    var encrypted = CryptoJS.AES.encrypt(message, key,option);

    var encrypted_cbc = CryptoJS.AES.encrypt(message, key,{ 
      iv:iv,
      mode:CryptoJS.mode.CBC
    });
    
    // console.log(key)
    // console.log(iv)
    console.log(`key : ${encrypted.key}`)
    console.log(`iv : ${encrypted.iv}`)
    console.log(`salt : ${encrypted.salt}`)

    // const img_ecb_buf = Buffer.from(encrypted.ciphertext.toString(), 'hex');
    const img_ecb_buf = Buffer.from(encrypted.toString(), 'base64');
    const img_cbc_buf = Buffer.from(encrypted_cbc.toString(), 'base64');

    

    bitmap.copy(img_ecb_buf,0,0,54); //複製bitmap 開頭覆蓋 img_ECB
    bitmap.copy(img_cbc_buf,0,0,54); //複製bitmap 開頭覆蓋 img_CBC
    
    // 
    // img_base64_ebc
    var img_base64_ebc = img_ecb_buf.toString('base64');
    var img_base64_cbc = img_cbc_buf.toString('base64');





    return {
      props: {
        img_base64_orgi,
        img_base64_ebc,
        img_base64_cbc
      }, // will be passed to the page component as props
    }
  }

export default page;





    /*
    這幾個寫法有問題
    // const bmp_head_buf = Buffer.from(bitmap,0,10);
    // const bmp_head_buf = 
    // console.log(img_ecb_buf)
    // console.log()
    // console.log(bmp_head_buf)

    // const new_bmp_ecb_buf = bmp_head_buf.concat(img_ecb_buf)
    // const new_bmp_ecb_buf = bufferInjoin([bmp_head_buf,img_ecb_buf])
    */

// console.log(`ciphertext : ${encrypted.ciphertext}`)
// console.log(`enc : ${encrypted.toString()}`)
// console.log(`ciphertext-B64 : $`{ encrypted.ciphertext.toString(CryptoJS.enc.Base64) }`)

// var bitmap = new Buffer(encrypted.toString(), 'base64');
// fs.writeFileSync("images/example.jpg", bitmap);
//   fs.writeFile('image_orgi.png', contents, {encoding: 'base64'}, function(err) {
//       console.log('File created');
//   });