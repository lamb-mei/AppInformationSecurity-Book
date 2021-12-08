//
//  ViewController.m
//  CommonCrypto
//
//  Created by 羊小咩 on 2021
//  Copyright © 2021 羊小咩. All rights reserved.
//

#import "ViewController.h"
#import "NSData+CommomCryptor.h"
#import "NSData+CustomPadding.h"
@interface ViewController ()

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    //for example
    
    NSString *key = @"1234567890123456";
    NSString *iv = @"1234567890123456";
    NSString *source = @"咩";
    
    //String -> Data
    NSData *sourceData = [source dataUsingEncoding:NSUTF8StringEncoding];
    // Data -> AESEncrypt
    NSData *ansix923Data = [sourceData cc_encryptUsingAlgorithm:CcCryptoAlgorithmAES key:key InitializationVector:iv Mode:CcCryptorCBCMode Padding:CcCryptorANSIX923];
    NSString *ansix923String = [ansix923Data base64EncodedStringWithOptions:NSDataBase64Encoding64CharacterLineLength];
    NSLog(@"%@",ansix923String);
    
    // Data -> AESDecrypt
    NSData *decryptAnsix923Data = [ansix923Data cc_decryptUsingAlgorithm:CcCryptoAlgorithmAES key:key InitializationVector:iv Mode:CcCryptorCBCMode Padding:CcCryptorANSIX923];
    NSString *decryptString = [[NSString alloc] initWithData:decryptAnsix923Data  encoding:NSUTF8StringEncoding];
    NSLog(@"%@",decryptString);
    

}


- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}


@end
