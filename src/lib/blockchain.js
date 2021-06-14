const Block = require('./block');
const request = require('request-promise');

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
    addBlockToChain (block) {
        this.chain.push(block);
        this.pendingTransactions = [];
    }
    minePendingTransactions() {
        const previousBlock = this.getLatestBlock();
        const block = new Block(previousBlock.index + 1, Date.now(), this.pendingTransactions, previousBlock.hash);
        block.mineBlock(this.difficulty);
        this.chain.push(block);
        this.pendingTransactions = [];
        return block;
    }

    async broadcastBlock (block) {
        try {
            await Promise.all(global.NETWORK.networkNodes.map(async node => {
                try {
                    const options = {
                        uri: `${node.host}:${node.port}/api/network/register/node`,
                        method: 'POST',
                        body: {block},
                        json: true
                    }
                    await request(options)
                } catch (error) {
                    //do nothing;
                }
            }));
        } catch (error) {
            // do nothing
        }
    }

    addTransaction (transaction) {
        this.pendingTransactions.push(transaction);
    }

    transactionById (id) {
        return {};
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

module.exports = Blockchain;
