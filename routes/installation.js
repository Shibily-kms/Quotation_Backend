const express = require('express')
const router = express.Router();
const { verifyUser } = require('../middleware/verify-middleware');
const installationController = require('../controllers/installation-controller')

router.post('/installation', verifyUser, installationController.doInstall)
router.post('/reinstallation', verifyUser, installationController.doReInstall)

module.exports = router