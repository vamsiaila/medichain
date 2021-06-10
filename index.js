const { v1:uuid } = require('uuid');
global.RandomId = () => uuid().split('-').join('');

global.ROOT_PATH = __dirname;
require('./src/lib/folders')();

const KeyGenerator = require('./src/lib/keyGenerator');
const rsa = new KeyGenerator();
const port = process.argv[2] || 9005;
let host = null;

const { networkInterfaces } = require('os');
const nets = networkInterfaces();
Object.keys(nets).forEach(key => nets[key].forEach(net => net.family === 'IPv4' && !net.internal && net.address.startsWith('192.168.232') ? host = net.address : null));
if(!host) {
    console.error('Please connect to rapidops vpn to enter medichain network');
    process.exit(0);
}

const Network = require('./src/lib/network');
global.NETWORK = new Network(host, port, rsa.keys.publicKey, rsa.keys.privateKey);

const Blockchain = require('./src/lib/blockchain');
global.Blockchain = new Blockchain();

const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/ping', (request, response) => response.send({ status: true }));
// app.use(); //reserved for frontend
app.use('/api', require('./src/routes'));

app.listen(port, host,() => console.log(`node running on port ${port}`));
