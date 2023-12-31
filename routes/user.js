const express = require('express')
const router = express.Router();
const { verifyUser } = require('../middleware/verify-middleware');
const authController = require('../controllers/auth-controller')
const predefinedDataController = require('../controllers/predefined-data-controller');
const quotationController = require('../controllers/quotation-controller')

// Auto SignUp
router.get('/user-verify/:userId', authController.userVerifyForSales)

// Quotation Inputs
router.route('/quotation')
    .get(verifyUser, quotationController.getQuotations)
    .post(verifyUser, quotationController.postQuotationForm)
    .put(verifyUser, quotationController.updateQuotationForm)
    .delete(verifyUser, quotationController.deleteQuotation)

//* predefined data of quotation Start

// water Test report source (WTRS)
router.route('/water-test-report-source')
    .get(verifyUser, predefinedDataController.getAllValue)
    .post(verifyUser, predefinedDataController.addSingleValue)
    .put(verifyUser, predefinedDataController.editSingleValue)
    .delete(verifyUser, predefinedDataController.deleteSingleValue)   // ?id=  pass id with query

// Work site - home type
router.route('/work-sites')
    .get(verifyUser, predefinedDataController.getAllValue)
    .post(verifyUser, predefinedDataController.addSingleValue)
    .put(verifyUser, predefinedDataController.editSingleValue)
    .delete(verifyUser, predefinedDataController.deleteSingleValue)   // ?id=  pass id with query

// Water usage types
router.route('/water-usage')
    .get(verifyUser, predefinedDataController.getAllValue)
    .post(verifyUser, predefinedDataController.addSingleValue)
    .put(verifyUser, predefinedDataController.editSingleValue)
    .delete(verifyUser, predefinedDataController.deleteSingleValue)   // ?id=  pass id with query

// Installation mode
router.route('/installation-mode')
    .get(verifyUser, predefinedDataController.getAllValue)
    .post(verifyUser, predefinedDataController.addSingleValue)
    .put(verifyUser, predefinedDataController.editSingleValue)
    .delete(verifyUser, predefinedDataController.deleteSingleValue)   // ?id=  pass id with query


// Purifier Solution Model
router.route('/purifier-solution-model')
    .get(verifyUser, predefinedDataController.getAllSolutionModel)
    .post(verifyUser, predefinedDataController.addSolutionModel)
    .put(verifyUser, predefinedDataController.editSolutionModel)
    .delete(verifyUser, predefinedDataController.deleteSolutionModel)   // ?id=  pass id with query

// Purifier Components
router.route('/purifier-component')
    .get(verifyUser, predefinedDataController.getAllComponents)
    .post(verifyUser, predefinedDataController.addComponents)
    .put(verifyUser, predefinedDataController.editComponents)
    .delete(verifyUser, predefinedDataController.deleteComponents)   // ?id=  pass id with query


// Whole House Solution Model
router.route('/wh-solution-model')
    .get(verifyUser, predefinedDataController.getAllSolutionModel)
    .post(verifyUser, predefinedDataController.addSolutionModel)
    .put(verifyUser, predefinedDataController.editSolutionModel)
    .delete(verifyUser, predefinedDataController.deleteSolutionModel)   // ?id=  pass id with query

// Purifier Components
router.route('/vfs-component')
    .get(verifyUser, predefinedDataController.getAllComponents)
    .post(verifyUser, predefinedDataController.addComponents)
    .put(verifyUser, predefinedDataController.editComponents)
    .delete(verifyUser, predefinedDataController.deleteComponents)   // ?id=  pass id with query


// Purifier Components
router.route('/vfs-materials')
    .get(verifyUser, predefinedDataController.getAllComponents)
    .post(verifyUser, predefinedDataController.addComponents)
    .put(verifyUser, predefinedDataController.editComponents)
    .delete(verifyUser, predefinedDataController.deleteComponents)   // ?id=  pass id with query


//! predefined data of quotation End 


module.exports = router;