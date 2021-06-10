const router = require('express').Router();
const networkController = require('../controllers/network.controller');

router.get('/me', networkController.me);
router.get('/nodes', networkController.getAllNodes);
router.post('/node/details', networkController.addMyNodeDetails);
router.post('/register/node', networkController.registerNode);
router.post('/register/node/bulk', networkController.bulkRegisterNodes);
router.post('/register/node/broadcast', networkController.registerAndBroadcastNode);

module.exports = router;
