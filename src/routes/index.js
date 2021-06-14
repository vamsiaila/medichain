const router = require('express').Router();

router.use('/network', require('./network.router'));
router.use('/transaction', require('./transaction.router'));
router.use('/blockchain', require('./blockchain.router'));

module.exports = router;
