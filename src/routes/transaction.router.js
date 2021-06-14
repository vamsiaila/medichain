const router = require('express').Router();
const transactionController = require('../controllers/transaction.controller');

router.post('/create', transactionController.createTransaction);
router.post('/broadcast', transactionController.broadcastTransaction);
router.get('/transaction/:transactionId', transactionController.getTransaction);

module.exports = router;
