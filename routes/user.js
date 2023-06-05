const express = require('express')
const router = express.Router();

const { verifyUser } = require('../middlewares/verify-middleware');
const { getUserData, } = require('../controllers/auth-controller')
const { addWTRS, editWTRS, deleteWTRS, getAllWTRS } = require('../controllers/predefined-data-controller');


router.get('/user-data/:userId', getUserData)

// predefined data of quotation Start

// water Test report source (WTRS)
router.route('/water-test-report-source')
    .get(verifyUser, getAllWTRS)
    .post(verifyUser, addWTRS)
    .put(verifyUser, editWTRS)
    .delete(verifyUser, deleteWTRS)   // ?id=  pass id with query



// predefined data of quotation End



module.exports = router;