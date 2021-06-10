class Transaction {
    constructor(toAddress, data) {
        this.fromAddress = '';
        this.toAddress = toAddress;
        this.data = data;
        this.signature
    }

    signTransaction (key) {
        this.fromAddress = key.public;
        const sig = key.private.sign(JSON.stringify(this.data), 'base64');
        this.data = sig.toDER('hex');
    }
}

module.exports = Transaction;
