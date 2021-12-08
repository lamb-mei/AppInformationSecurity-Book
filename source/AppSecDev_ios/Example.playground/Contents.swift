import UIKit
@testable import CryptoSwift
//
//var str = "羊小咩"
//
//var data = str.bytes
//
//let hash1 = data.md5().toHexString()
//let hash2 = data.sha1().toHexString()
//let hash4 = data.sha256().toHexString()
//let hash6 = data.sha512().toHexString()
//
//
//
//
//let aes_message = "咩"
//let aes_key_HexString = "00000000000000000000000000000000"
//let keyArray = Array<UInt8>.init(hex: aes_key_HexString)
//if
//    let aes = try? AES(key: keyArray, blockMode: ECB()) , // aes128
//    let encrypted = try? aes.encrypt(aes_message.bytes) ,
//    let EncData = encrypted.toBase64()
//{
//    print(EncData)
//}


import SwiftyRSA
//let publicKey = try PublicKey(pemNamed: "public")
//let privateKey = try PrivateKey(pemNamed: "private")

let keyPair =  try? SwiftyRSA.generateRSAKeyPair(sizeInBits: 2048)


let privateKey = keyPair?.privateKey
let publicKey = keyPair?.publicKey

print(try? publicKey?.pemString())








