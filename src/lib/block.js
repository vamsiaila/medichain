const SHA256 = require('sha256');

class Block {
  constructor(index, timestamp, data, previousHash = '') {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.nounce = 0;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    return SHA256(`${this.index}${this.previousHash}${this.timestamp}${JSON.stringify(this.data)}${this.nounce}`)
  }

  mineBlock(difficulty) {
    while (this.hash.substr(0, difficulty) !== '0'.repeat(difficulty)) {
      this.nounce++;
      this.hash = this.calculateHash();
    }
  }
}

module.exports = Block;
