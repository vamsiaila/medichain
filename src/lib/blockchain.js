const Block = require('./block');

class Blockchain {
    constructor() {
        this.chain = [this.genesisBlock()];
        this.difficulty = 5;
        this.pendingTransactions = [];
    }

    genesisBlock () {
        return new Block(0, Date.now(), 'Genesis Block', '0');
    }

    getLatestBlock () {
        return this.chain[this.chain.length - 1];
    }

    minePendingTransactions() {
        const previousBlock = this.getLatestBlock();
        const block = new Block(previousBlock.index + 1, Date.now(), this.pendingTransactions, previousBlock.hash);
        block.mineBlock(this.difficulty);
        this.chain.push(block);
        this.pendingTransactions = [];
    }

    addTransaction (transaction) {
        this.pendingTransactions.push(transaction);
    }

    isChainValid() {
        for(let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];
            if(currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }
            if(currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }
}
