const router = require('express').Router();
const blockchainController = require('../controllers/blockchain.controller');

router.post('/chain', blockchainController.getChain);
router.post('/mine/broadcast', blockchainController.mineAndBroadcast);
router.post('/block/add', blockchainController.addBlock);

module.exports = router;
