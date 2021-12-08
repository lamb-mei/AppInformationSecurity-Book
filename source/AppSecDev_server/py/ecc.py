# pip install sslcrypto

import base64
import sslcrypto

# Create curve object
# curve = sslcrypto.ecc.get_curve("secp256k1")
curve = sslcrypto.ecc.get_curve("prime256v1")

# Generate private key, both compressed and uncompressed keys are supported
# private_key = curve.new_private_key(is_compressed=True)
private_key = curve.new_private_key()

print( curve.private_to_wif(private_key) )
# print( curve.new_private_key)
# print( curve.private_to_wif)

# privateString = b'MHcCAQEEID7535QYt+y/ObP202MBBkbxCWmXuMbK/twNQOnf+uehoAoGCCqGSM49AwEHoUQDQgAEJnMKq9TviSt2NRH1UV1t6AGDotMA0zmhQDxy605BzxcAhYJpBaTdJjKERrhK+v4l6LgCm5Y7UnFvmNXHe3Qe2A=='
# private_key = base64.b64decode(privateString)

#  ALarBlPBUGhFD04HmVCF0QLLACDfvv7kMAMILo8YL9RoI1IAy/Ad6HrSkRgiUuGL+LE0sQAgw7qiwdP/VVlrMGkRXBNPyiVVdNw4A4xVw6sNmz5euoTHNM6h5YJh5SA23a6IIVbjmZ6ViKD1dQ8PFghAwWi8SD2dxhK21xAeA1phmc30mvU=
# privateString = '''MHcCAQEEID7535QYt+y/ObP202MBBkbxCWmXuMbK/twNQOnf+uehoAoGCCqGSM49AwEHoUQDQgAEJnMKq9TviSt2NRH1UV1t6AGDotMA0zmhQDxy605BzxcAhYJpBaTdJjKERrhK+v4l6LgCm5Y7UnFvmNXHe3Qe2A=='''
# privateString = b'ALarBlPBUGhFD04HmVCF0QLLACDfvv7kMAMILo8YL9RoI1IAy/Ad6HrSkRgiUuGL+LE0sQAgw7qiwdP/VVlrMGkRXBNPyiVVdNw4A4xVw6sNmz5euoTHNM6h5YJh5SA23a6IIVbjmZ6ViKD1dQ8PFghAwWi8SD2dxhK21xAeA1phmc30mvU='
# private_key = curve.wif_to_private(privateString) 


# print(private_to_wif)
# Find a matching public key
public_key = curve.private_to_public(private_key)  

# print(public_key)

# If required, you can change public key format to whatever you want
x, y = curve.decode_public_key(public_key)
electrum_public_key = x + y

# Encrypt something. You can specify a cipher if you want to, aes-256-cbc is the
# default value
data = b"Hello, world!"


# ciphertext = curve.encrypt(data, public_key, algo="aes-256-ofb")
# assert curve.decrypt(ciphertext, private_key, algo="aes-256-ofb") == data

ciphertext = curve.encrypt(data, public_key)
# Decrypt
assert curve.decrypt(ciphertext, private_key) == data


# ciphertextBase64 = base64.b64encode(bytes('abc', 'utf-8'))
ciphertextBase64 = base64.b64encode(ciphertext)

# print(ciphertext)
print(ciphertextBase64)