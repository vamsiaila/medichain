const RSA = require('node-rsa');
const pemFilesPath = `${global.ROOT_PATH}/.keys/`;
const fs = require('fs');

class KeyGenerator {
    constructor() {
        this.keys = this.getKeys();
    }

    getKeys() {
        const publicKeyExists = fs.existsSync(`${pemFilesPath}public.pem`);
        const privateKeyExists = fs.existsSync(`${pemFilesPath}private.pem`);
        if(publicKeyExists && privateKeyExists) {
            return {
                publicKey : fs.readFileSync(`${pemFilesPath}public.pem`, 'utf8'),
                privateKey : fs.readFileSync(`${pemFilesPath}private.pem`, 'utf8')
            }
        }
        const newKey = new RSA({b:1024});
        const keys = {
            publicKey: newKey.exportKey('public'),
            privateKey: newKey.exportKey('private')
        }
        fs.writeFileSync(`${pemFilesPath}public.pem`, keys.publicKey);
        fs.writeFileSync(`${pemFilesPath}private.pem`, keys.privateKey);
        return keys;
    }
}

module.exports = KeyGenerator;
