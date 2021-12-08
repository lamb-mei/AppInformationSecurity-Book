import React, { useState , useEffect} from 'react'
var asn = require("asn1.js");

import { Card ,Accordion ,Button ,Container , Row ,Col } from 'react-bootstrap';
var crypto = require("crypto");
var eccrypto = require("eccrypto");

const page = () => {

// A new random 32-byte private key.
var privateKey = eccrypto.generatePrivate();
// Corresponding uncompressed (65-byte) public key.
var publicKey = eccrypto.getPublic(privateKey);

var str = "message to sign";
// Always hash you message to sign!
var msg = crypto.createHash("sha256").update(str).digest();

const [eccSign , setEccSign] = useState(null);
const [signStatus , setSignStatus] = useState(false);



useEffect(() => {
  eccrypto.sign(privateKey, msg).then(function(sig) {
    console.log("Signature in DER format:", sig);
  
    
    var hex =  String(sig.toString('hex'))
    console.log(hex)
    setEccSign(hex)
  
    eccrypto.verify(publicKey, msg, sig).then(function() {
      console.log("Signature is OK");
      // setEccSign({s:true})
      setSignStatus(true)
      // signStatus = true
      
    }).catch(function() {
      console.log(error)
      console.log("Signature is BAD");
      // setEccSign({s:false})
      
    })
  })
}, []);


const [a2b , setA2b] = useState(null);
const [b2a , setB2a] = useState(null);

useEffect(() => {
  var privateKeyA = eccrypto.generatePrivate();
  var publicKeyA = eccrypto.getPublic(privateKeyA);
  var privateKeyB = eccrypto.generatePrivate();
  var publicKeyB = eccrypto.getPublic(privateKeyB);

  // Encrypting the message for B.
  eccrypto.encrypt(publicKeyB, Buffer.from("msg to b")).then(function(encrypted) {
    // B decrypting the message.
    eccrypto.decrypt(privateKeyB, encrypted).then(function(plaintext) {
      setA2b(plaintext.toString())
      console.log("Message to part B:", plaintext.toString());
    });
  });

  // Encrypting the message for A.
  eccrypto.encrypt(publicKeyA, Buffer.from("msg to a")).then(function(encrypted) {
    // A decrypting the message.
    eccrypto.decrypt(privateKeyA, encrypted).then(function(plaintext) {
      setB2a(plaintext.toString())
      console.log("Message to part A:", plaintext.toString());
    });
  });

}, []);
    return (
        <>
        <Container fluid>
        <Row>
            <Col>
            <h3>ECC </h3>
            </Col>
        </Row>
        <Row>
            <Col>
            <h3>ECDSA</h3>
            <div>{`str '${str}'`}</div>
            <div>msg {msg}</div>
            <div>signHex {String(eccSign)}</div>
            <div>sign : {String(signStatus)}</div>
           
           
           {signStatus?
           (<div>Signature is OK</div>)
           :
           (<div>Signature is BAD</div>)
           }
            </Col>
        </Row>
        <Row>
          <hr />
        </Row>
        <Row>
            <Col>
            <h3>ECIES</h3>
            <div>{`A : '${a2b}'`}</div>
            <div>{`B : '${a2b}'`}</div>
            </Col>
        </Row>
        </Container>
        </>
    );
}


export default page;