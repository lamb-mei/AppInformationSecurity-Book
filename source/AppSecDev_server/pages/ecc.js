var asn = require("asn1.js");

import { Card ,Accordion ,Button ,Container , Row ,Col } from 'react-bootstrap';

const pri_str=`-----BEGIN EC PRIVATE KEY-----
MHcCAQEEID7535QYt+y/ObP202MBBkbxCWmXuMbK/twNQOnf+uehoAoGCCqGSM49
AwEHoUQDQgAEJnMKq9TviSt2NRH1UV1t6AGDotMA0zmhQDxy605BzxcAhYJpBaTd
JjKERrhK+v4l6LgCm5Y7UnFvmNXHe3Qe2A==
-----END EC PRIVATE KEY-----`
const pub_str=`-----BEGIN PUBLIC KEY-----
MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEJnMKq9TviSt2NRH1UV1t6AGDotMA
0zmhQDxy605BzxcAhYJpBaTdJjKERrhK+v4l6LgCm5Y7UnFvmNXHe3Qe2A==
-----END PUBLIC KEY-----`

const ciphertext = `BN7m79VsKV0GUK1buXy7QOYBPeoOa+cRPuOOyNFDYBEUxmuUn2x+jHik4+UTPJ50Tk+iwa0eo1Omo8Xdh2vv2PwXyNtVMcO9jroiSzRsMEsrwMz6L464gilaIQ==`

const page = () => {

  function ecc(message = "message"){
    const ECDHCrypto = require('ecdh-crypto');

    var key = new ECDHCrypto(pri_str, 'pem');
    var jwk = JSON.stringify(key, null, 2);
 
    
    var signature = key.createSign('SHA384')
                      .update(message)
                      .sign('base64');

    console.log(jwk);
    console.log(signature)
    return {jwk,signature}
  }
  
  
  const {jwk,signature} = ecc()
  console.log(`***************************************`)
    

    return (
        <>
        <Container fluid>
        <Row>
            <Col>
            <h3>ECC</h3>
            </Col>
        </Row>
        <Row>
            <Col>
            <div>{jwk}</div>
            <div>{signature}</div>
            </Col>
        </Row>
        </Container>
        </>
    );
}


export default page;