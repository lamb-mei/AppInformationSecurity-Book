//
//  ViewController.swift
//  AppSecDev
//
//  Created by 羊小咩 on 2020/9/30.
//  Copyright © 2020 咩橘客. All rights reserved.
//

import UIKit
import SwiftyRSA
import CryptorECC
import CryptoSwift

class ViewController: UIViewController {

    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
        
//        rsa()

        let str = "Hello 羊小咩"
    
        let mainQueue = OperationQueue.main
        NotificationCenter.default.addObserver(forName: UIApplication.userDidTakeScreenshotNotification, object: nil, queue: mainQueue) { notification in
            print(str)
        }
    
        
    }
    @IBAction func aesBtnClick(_ sender: Any) {
        
        aes()
    }
    
    
    @IBAction func eccBtnClick(_ sender: Any) {
        ecc()
    }
    
    
    func ecc(){
        
        
        let eccPrivateKey1 = try! ECPrivateKey.make(for: .prime256v1)
//        let eccPrivateKey1 = try! ECPrivateKey.make(for: .secp384r1)
        let privateKeyPEM1 = eccPrivateKey1.pemString //私鑰 PEM格式
        print(eccPrivateKey1)
        print(privateKeyPEM1)

        //從 PME 字串轉 ECPrivateKey
        let privateKey =
        """
         -----BEGIN EC PRIVATE KEY-----
         MHcCAQEEID7535QYt+y/ObP202MBBkbxCWmXuMbK/twNQOnf+uehoAoGCCqGSM49
         AwEHoUQDQgAEJnMKq9TviSt2NRH1UV1t6AGDotMA0zmhQDxy605BzxcAhYJpBaTd
         JjKERrhK+v4l6LgCm5Y7UnFvmNXHe3Qe2A==
         -----END EC PRIVATE KEY-----
         """
        
        let eccPrivateKey = try! ECPrivateKey(key: privateKey)
        print(eccPrivateKey.pemString)
        
        
        let eccPublicKey = try! eccPrivateKey.extractPublicKey()
        print(eccPublicKey.pemString)
        
        let plainText = "Clear Text"
        let encryptedData = try! plainText.encrypt(with: eccPublicKey)
        print(encryptedData.base64EncodedString())
        
        
        let decryptedData = try! encryptedData.decrypt(with: eccPrivateKey)
        print(String(data: decryptedData, encoding: .utf8))
        
        
        
        
        
    }
    
    
    func aes(){
        let aes_message = "aes_message 咩"
        let aes_key_HexString = "01234567890000000000000000000111"
        let keyArray = Array<UInt8>.init(hex: aes_key_HexString)
        if
            let aes = try? AES(key: keyArray, blockMode: ECB()) , // aes128
            let encrypted = try? aes.encrypt(aes_message.bytes) ,
            let EncData = encrypted.toBase64()
        {
            print(EncData)
        }
    }
    
    func rsa(){
        
        let keyPair = try! SwiftyRSA.generateRSAKeyPair(sizeInBits: 1024)
        
        let privateKey = keyPair.privateKey
        let publicKey = keyPair.publicKey
        
        print(try! privateKey.pemString())
        print(try! publicKey.pemString())
        
        //這裡簡化流程，正常情況下要拿對方公鑰加密，傳輸出去對方才能用私鑰解開
        
        let plainText = "Clear Text"
        let defaultEncPublicKey = try! PublicKey(pemEncoded:try! publicKey.pemString())
        let clear = try! ClearMessage(string: plainText, using: .utf8)
        let encrypted = try! clear.encrypted(with: defaultEncPublicKey, padding: .PKCS1)
        let cipherText = encrypted.base64String
        
        print(cipherText)
        
        let encryptedDec = try! EncryptedMessage(base64Encoded: cipherText)
        let clearDec = try! encryptedDec.decrypted(with: privateKey, padding: .PKCS1)
        //        let data = clearDec.data  //二進位資料
        //        let base64String = clearDec.base64Encoded //base64
        let orgistring = try! clearDec.string(encoding: .utf8)
        print(orgistring)
        
        
    }


}

