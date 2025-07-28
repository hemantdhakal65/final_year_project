const express = require('express');
const router = express.Router();
const aurdinoController = require('../controllers/aurdinoController');

router.get('/serial-stream', aurdinoController.handleSerialConnection);

module.exports = router;