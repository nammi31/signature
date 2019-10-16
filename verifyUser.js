
var cp = require('child_process')
  , fs = require('fs')
  , mkdirp = require("mkdirp")
  , ursa = require('ursa')
  ;


function genKeys(username){
    var status = false
    let dir = './' + username + '/keyStore'

    mkdirp(dir, function(err) {
        if (err) console.log(err);
        console.log("Successfully created"+dir+"  directory");
    });
    cp.exec('openssl genrsa 2048', function(err, privKey, stderr) {       // gen private key

        fs.writeFileSync(dir+'/private.pem', privKey);   
        // gen coresponding public key                
        cp.exec('openssl rsa -in '+ dir+'/private.pem'+' -pubout', function(err, pubKey, stderr) {       
            fs.writeFileSync(dir+'/public.pem', pubKey);  
            status = true
            return status
                      
        });
 
   });

}
function verifySignature(username,msg){

    let dir = './' + username + '/keyStore'
    let privkey = ursa.createPrivateKey( fs.readFileSync(dir+'/private.pem') );        // read private key from file
    let encryptedMsg = privkey.privateEncrypt(msg, 'utf8', 'base64');        // Encrypt msg with Private key

    let pubkey = ursa.createPublicKey(fs.readFileSync(dir+'/public.pem') );            // read public key from file
    let decryptedMsg = pubkey.publicDecrypt(encryptedMsg, 'base64', 'utf8'); //Decrypt cipher text with Public key

    console.log('original message :',msg)
    console.log('encrypted message :', encryptedMsg, '\n');
    console.log('decrypted msg :', decryptedMsg, '\n');
    

}
function verifyUser(username,msg){
    genKeys(username)
    //need to use promise here 
    verifySignature(username,msg)

    
}

let msg = "username: shoumik , password: shoumikpw"
let username = 'shoumik'
verifyUser(username, msg)