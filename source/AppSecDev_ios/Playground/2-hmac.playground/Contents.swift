import CryptoSwift
let message = "咩"

let key = "key"
let signature = try! HMAC(key: key.bytes, variant: .sha256).authenticate(message.bytes)
print("HMAC \(signature.toHexString())")
