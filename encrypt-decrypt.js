'use strict';
 
var fs = require('fs')
  , ursa = require('ursa')
  , pubkey
  , privkey
  , msg
  , encryptedMsg
  , decryptedMsg
  ;
 

//take a data to encrypt
msg = "username: shoumik , password: shoumikpw"

// Encrypt with Private key
privkey = ursa.createPrivateKey( fs.readFileSync('./certs/client/private.pem') , "abcde" );
encryptedMsg = privkey.privateEncrypt(msg, 'utf8', 'base64');

//Decrypt with Public key
pubkey = ursa.createPublicKey(fs.readFileSync('./certs/client/public.pem'), "abcde" );
decryptedMsg = pubkey.publicDecrypt(encryptedMsg, 'base64', 'utf8');


console.log('original message :',msg)
console.log('encrypted message :', encryptedMsg, '\n');
console.log('decrypted msg :', decryptedMsg, '\n');