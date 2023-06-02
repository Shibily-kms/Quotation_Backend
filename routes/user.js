const express = require('express')
const router = express.Router();

const { getUserData, } = require('../controllers/auth-controller')

router.get('/user-data/:userId', getUserData)


module.exports = router;