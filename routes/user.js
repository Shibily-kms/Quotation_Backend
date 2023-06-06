const express = require('express')
const router = express.Router();

const { verifyUser } = require('../middlewares/verify-middleware');
const { getUserData, } = require('../controllers/auth-controller')
const {
    addSingleValue, editSingleValue, deleteSingleValue, getAllValue,
    addSolutionModel, editSolutionModel, deleteSolutionModel, getAllSolutionModel,
    addPurifierComponents, editPurifierComponents, deletePurifierComponents, getAllPurifierComponents,
    addWarranty, editWarranty, deleteWarranty, getAllWarranty
} = require('../controllers/predefined-data-controller');


router.get('/user-data/:userId', getUserData)

// predefined data of quotation Start

// water Test report source (WTRS)
router.route('/water-test-report-source')
    .get(verifyUser, getAllValue)
    .post(verifyUser, addSingleValue)
    .put(verifyUser, editSingleValue)
    .delete(verifyUser, deleteSingleValue)   // ?id=  pass id with query

// Work site - home type
router.route('/work-sites')
    .get(verifyUser, getAllValue)
    .post(verifyUser, addSingleValue)
    .put(verifyUser, editSingleValue)
    .delete(verifyUser, deleteSingleValue)   // ?id=  pass id with query

// Water usage types
router.route('/water-usage')
    .get(verifyUser, getAllValue)
    .post(verifyUser, addSingleValue)
    .put(verifyUser, editSingleValue)
    .delete(verifyUser, deleteSingleValue)   // ?id=  pass id with query

// Installation mode
router.route('/installation-mode')
    .get(verifyUser, getAllValue)
    .post(verifyUser, addSingleValue)
    .put(verifyUser, editSingleValue)
    .delete(verifyUser, deleteSingleValue)   // ?id=  pass id with query


// Solution Model
router.route('/solution-model')
    .get(verifyUser, getAllSolutionModel)
    .post(verifyUser, addSolutionModel)
    .put(verifyUser, editSolutionModel)
    .delete(verifyUser, deleteSolutionModel)   // ?id=  pass id with query

// Purifier Components
router.route('/purifier-component')
    .get(verifyUser, getAllPurifierComponents)
    .post(verifyUser, addPurifierComponents)
    .put(verifyUser, editPurifierComponents)
    .delete(verifyUser, deletePurifierComponents)   // ?id=  pass id with query

// Warranty
router.route('/warranty')
    .get(verifyUser, getAllWarranty)
    .post(verifyUser, addWarranty)
    .put(verifyUser, editWarranty)
    .delete(verifyUser, deleteWarranty)   // ?id=  pass id with query



// predefined data of quotation End



module.exports = router;