import UIKit
@testable import CryptoSwift

var str = "羊小咩"

var data = str.bytes

let hash1 = data.md5().toHexString()
let hash2 = data.sha1().toHexString()
let hash4 = data.sha256().toHexString()
let hash6 = data.sha512().toHexString()
