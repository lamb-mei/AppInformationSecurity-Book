
var forge = require('node-forge');
const NodeRSA = require('node-rsa');
import { Card ,Accordion ,Button ,Container , Row ,Col } from 'react-bootstrap';

const pri_str=`-----BEGIN RSA PRIVATE KEY-----
MIICWwIBAAKBgQDAZ2xVK4hG/QrR75IUmgYijNLMy0sdGFfcUcl4r+y0cNBvaUnB
EKbzzEYXNEztoRcIsvcUeKrFx53UthaF7C639Q763+aXjL/pMgtTXHRuwyVSl2IZ
X5ItMNL0Nl8TOoWaPLyErbWKoR9cVPZpzhtVLEHCk6DIXhip4DWN6eKOnwIDAQAB
AoGAAmDk7R1HfH/Wo+dpxLkYt/xKA3/EiHILbVenfXHzTlG8tJE2eQgF1aq3TRnM
6lJyUJ23Fzjcp5WYT7pb3JZMXN1R870E6g7lUtsRjeD6Ja+Ab9+JKaXetM4k6VP1
/3M67qIs+VnsJaYM2kL0CsbkXdl5hKBeI4PGamjWLAVwStkCQQDj7KZhcNYIqlLB
SNA2vQaoarYDLjbRbaC9yuiAigpy9BKA4dTJls8E1BLOdX305AS601/cQ5mECnbY
tyTq6drXAkEA2Bqs35Oyg5hTYWkNfGSsNGPp2H8i8/0MQnWYhYql6OOtMlB88esm
+52boymIEic6X9SglHghqQwWTOEYR5n5eQJAGI2hztVs+Tn/+Dpz07HBSdtVCDqu
RRleO5PkQBSe04tfgurRFXZdjtOZwwv9Kah2qfmjVgMiQosuCmKQY44VuQJADlm3
ISGtuQ9kehN/0cLdrJz16mqG56zmI4OrnTKX0d9MoQq3QVlcPVk5/JvFbW8tcS+t
ei6ADbm/wVsxQY/4AQJAEwgwidraYmr7Ofw6PjbgzEwFHBwCTHKMc+GrkKNAycVF
w4cr0FjQi1HjdmgajeCXURgh3+9x+svDjiZKENe66w==
-----END RSA PRIVATE KEY-----`
const pub_str=`-----BEGIN RSA PUBLIC KEY-----
MIGJAoGBAMBnbFUriEb9CtHvkhSaBiKM0szLSx0YV9xRyXiv7LRw0G9pScEQpvPM
Rhc0TO2hFwiy9xR4qsXHndS2FoXsLrf1Dvrf5peMv+kyC1NcdG7DJVKXYhlfki0w
0vQ2XxM6hZo8vISttYqhH1xU9mnOG1UsQcKToMheGKngNY3p4o6fAgMBAAE=
-----END RSA PUBLIC KEY-----`

const ctext = `DeLHBUhJFaFvFD5HNtVllffm23MhCbS+dE3x7H78qliXv34v01OAV9j2g25yZTM4N61ZnEQLUVz0Q3S4f0SdFP71DYIF8X6tOulV1M9rSrItG2OekAp4Lu5V4Dz3uVFa1J/HjPcGbV1RHM0HLVH907ebxJFgj9Z6cFek2fXamOM=`

const page = () => {
    console.log(`***************************************`)
    var rsa = forge.pki.rsa;
    var pki = forge.pki;
 
    // 使用 synchronously 產生 keypair
    var keypair = rsa.generateKeyPair({bits: 1024, e: 0x10001});

    // 轉換 Forge key to PEM-format
    var pem = pki.publicKeyToPem(keypair.publicKey);
    var pem_pub = pki.privateKeyToPem(keypair.privateKey);
    console.log(pem)
    console.log(pem_pub)

 
    // convert a PEM-formatted public key to a Forge public key
    var publicKey = pki.publicKeyFromPem(pub_str);
    var privateKey = pki.privateKeyFromPem(pri_str);

    pki.publicKeyFromPem

    console.log(pki.publicKeyToPem(publicKey))
    console.log(pki.privateKeyToPem(privateKey))

    // const text = 'Clear Text';
    // var encrypted = publicKey.encrypt(text);
    

    //解密需要帶入 Bytes 資料是 base64，需要先進行轉換
    const cipherData = forge.util.decode64(ctext)
    // var bytes = forge.util.hexToBytes(hex);
    var decrypted = privateKey.decrypt(cipherData);
    
    ;
    // console.log(forge.util.bytesToHex(encrypted))
    // console.log(forge.util.decode64(encrypted))
    // console.log(forge.util.encode64(encrypted)) 
    console.log(decrypted)

    return (
        <>
        <Container fluid>
        <Row>
            <Col>
            <h3>RSA</h3>
            </Col>
        </Row>
        <Row>
            <Col>
            
            </Col>
        </Row>
        </Container>
        </>
    );
}

const page1 = () => {
    console.log(`***************************************`)
    // const key = new NodeRSA({b: 1024});
    // const KeyPair = key.generateKeyPair(1024);

    // const key = new NodeRSA('-----BEGIN RSA PRIVATE KEY-----\n'+
    //                   'MIIBOQIBAAJAVY6quuzCwyOWzymJ7C4zXjeV/232wt2ZgJZ1kHzjI73wnhQ3WQcL\n'+
    //                   'DFCSoi2lPUW8/zspk0qWvPdtp6Jg5Lu7hwIDAQABAkBEws9mQahZ6r1mq2zEm3D/\n'+
    //                   'VM9BpV//xtd6p/G+eRCYBT2qshGx42ucdgZCYJptFoW+HEx/jtzWe74yK6jGIkWJ\n'+
    //                   'AiEAoNAMsPqwWwTyjDZCo9iKvfIQvd3MWnmtFmjiHoPtjx0CIQCIMypAEEkZuQUi\n'+
    //                   'pMoreJrOlLJWdc0bfhzNAJjxsTv/8wIgQG0ZqI3GubBxu9rBOAM5EoA4VNjXVigJ\n'+
    //                   'QEEk1jTkp8ECIQCHhsoq90mWM/p9L5cQzLDWkTYoPI49Ji+Iemi2T5MRqwIgQl07\n'+
    //                   'Es+KCn25OKXR/FJ5fu6A6A+MptABL3r8SEjlpLc=\n'+
    //                   '-----END RSA PRIVATE KEY-----');


    const key = new NodeRSA(`-----BEGIN RSA PRIVATE KEY-----
MIICWwIBAAKBgQDAZ2xVK4hG/QrR75IUmgYijNLMy0sdGFfcUcl4r+y0cNBvaUnB
EKbzzEYXNEztoRcIsvcUeKrFx53UthaF7C639Q763+aXjL/pMgtTXHRuwyVSl2IZ
X5ItMNL0Nl8TOoWaPLyErbWKoR9cVPZpzhtVLEHCk6DIXhip4DWN6eKOnwIDAQAB
AoGAAmDk7R1HfH/Wo+dpxLkYt/xKA3/EiHILbVenfXHzTlG8tJE2eQgF1aq3TRnM
6lJyUJ23Fzjcp5WYT7pb3JZMXN1R870E6g7lUtsRjeD6Ja+Ab9+JKaXetM4k6VP1
/3M67qIs+VnsJaYM2kL0CsbkXdl5hKBeI4PGamjWLAVwStkCQQDj7KZhcNYIqlLB
SNA2vQaoarYDLjbRbaC9yuiAigpy9BKA4dTJls8E1BLOdX305AS601/cQ5mECnbY
tyTq6drXAkEA2Bqs35Oyg5hTYWkNfGSsNGPp2H8i8/0MQnWYhYql6OOtMlB88esm
+52boymIEic6X9SglHghqQwWTOEYR5n5eQJAGI2hztVs+Tn/+Dpz07HBSdtVCDqu
RRleO5PkQBSe04tfgurRFXZdjtOZwwv9Kah2qfmjVgMiQosuCmKQY44VuQJADlm3
ISGtuQ9kehN/0cLdrJz16mqG56zmI4OrnTKX0d9MoQq3QVlcPVk5/JvFbW8tcS+t
ei6ADbm/wVsxQY/4AQJAEwgwidraYmr7Ofw6PjbgzEwFHBwCTHKMc+GrkKNAycVF
w4cr0FjQi1HjdmgajeCXURgh3+9x+svDjiZKENe66w==
-----END RSA PRIVATE KEY-----`,'scheme-pkcs1')

const pkey = new NodeRSA(`-----BEGIN RSA PUBLIC KEY-----
MIGJAoGBAMBnbFUriEb9CtHvkhSaBiKM0szLSx0YV9xRyXiv7LRw0G9pScEQpvPM
Rhc0TO2hFwiy9xR4qsXHndS2FoXsLrf1Dvrf5peMv+kyC1NcdG7DJVKXYhlfki0w
0vQ2XxM6hZo8vISttYqhH1xU9mnOG1UsQcKToMheGKngNY3p4o6fAgMBAAE=
-----END RSA PUBLIC KEY-----`,'scheme-pkcs1')
    /**
Clear Text
     */
    // console.log(key)
    // console.log(key.isPrivate())
    // console.log(KeyPair)
    // console.log(KeyPair.isPrivate())
    const ctext = `DeLHBUhJFaFvFD5HNtVllffm23MhCbS+dE3x7H78qliXv34v01OAV9j2g25yZTM4N61ZnEQLUVz0Q3S4f0SdFP71DYIF8X6tOulV1M9rSrItG2OekAp4Lu5V4Dz3uVFa1J/HjPcGbV1RHM0HLVH907ebxJFgj9Z6cFek2fXamOM=`

    const publicDer = key.exportKey('pkcs8');
    const privatePEM = key.exportKey('pkcs1');
    console.log(publicDer)
    console.log(privatePEM)


    const text = 'Clear Text';
    // const encrypted = key.encrypt(text, 'base64');
    // console.log('encrypted: ', encrypted);

    const pencrypted = pkey.encrypt(text, 'base64');
    console.log('p encrypted: ', pencrypted);
    

    // const decrypted = key.decrypt(encrypted, 'utf8'=-pp=);
    // console.log('decrypted: ', decrypted);

    const cc1decrypted = key.decrypt(ctext, 'utf8');
    console.log('ctext1 decrypted: ', cc1decrypted);
    const cc2decrypted = key.decrypt(ctext, 'utf8');
    console.log('ctext2 decrypted: ', cc2decrypted);


    // 
    return (
        <>
        {/* <div>enc {encrypted.toString()}</div> */}
        {/* <div>dec {decrypted.toString(CryptoJS.enc.Utf8)}</div> */}
        <Container fluid>
        <Row>
            <Col>
            <h3>RSA</h3>
            </Col>
        </Row>
        <Row>
            <Col>
            
            </Col>
        </Row>
        </Container>
{/* <Accordion defaultActiveKey="0">
  <Card>
    <Card.Header>
      <Accordion.Toggle as={Button} variant="link" eventKey="0">
        Click me!
      </Accordion.Toggle>
    </Card.Header>
    <Accordion.Collapse eventKey="0">
      <Card.Body>Hello! I'm the body</Card.Body>
    </Accordion.Collapse>
  </Card>
  <Card>
    <Card.Header>
      <Accordion.Toggle as={Button} variant="link" eventKey="1">
        Click me!
      </Accordion.Toggle>
    </Card.Header>
    <Accordion.Collapse eventKey="1">
      <Card.Body>Hello! I'm another body</Card.Body>
    </Accordion.Collapse>
  </Card>
</Accordion> */}
        </>
    );
}

export default page;