const router = require('express').Router();

router.use('/network', require('./network.router'));

module.exports = router;
