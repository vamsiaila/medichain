class Transaction {
    constructor(toAddress, fromAddress, data, timestamp, id) {
        this.id = id;
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.data = data;
        this.timestamp = timestamp;
    }
}

module.exports = Transaction;
