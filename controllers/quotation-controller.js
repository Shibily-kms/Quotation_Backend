const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const QuotationInputModel = require('../models/quotation-inputs-data')
const { verifyQuotationInputs } = require('../helpers/validate-function')
const { createQuotationId } = require('../helpers/helper-function')
const { uploadSignature, deleteSignature } = require('../helpers/upload-image')
const { successResponse, errorResponse } = require('../helpers/response-helper')

const postQuotationForm = async (req, res, next) => {
    try {

        const verifyInputs = verifyQuotationInputs(req.body)
        if (!verifyInputs.status) {
            return res.status(401).json(errorResponse(verifyInputs.message, 401))
        }

        let today = new Date()
        today.setHours(0, 0, 0, 0);

        let lastData = await QuotationInputModel.find({ type: req.body.type, createdAt: { $gte: today } })

        //index
        req.body.index = lastData[lastData.length - 1]?.index ? lastData[lastData.length - 1]?.index + 1 : 1

        // Quotation srl number
        req.body.quotation_srl_no = createQuotationId(req.body.type, new Date(), (req.body.index))

        // Save Signature in Folder
        if (req.body?.sign?.customer?.url) {
            let customer = await uploadSignature(req.body.sign.customer.url, req.body.quotation_srl_no, 'customer')
            req.body.sign = { customer }
        }

        // Upload to DB
        const addData = await QuotationInputModel.create(req.body)

        res.status(201).json(successResponse('Quotation created', addData))

    } catch (error) {
        if (error.name === 'UnknownEndpoint') {
            return res.status(400).json(errorResponse('No proper internet connection', 400))
        } else {
            next(error)
        }
    }
}

const updateQuotationForm = async (req, res, next) => {
    try {

        // Save Signature in Folder
        if (req.body?.sign?.customer?.url && !req.body?.sign?.customer?.key) {
            const customer = await uploadSignature(req.body.sign.customer.url, req.body.quotation_srl_no, 'customer')
            req.body.sign = { customer }
        }
        await QuotationInputModel.updateOne({ _id: new ObjectId(req.body._id) }, {
            $set: {
                visit_date: req.body.visit_date,
                enquiry_srl_no: req.body.enquiry_srl_no,
                customer: req.body.customer,
                test_report: req.body.test_report,
                findings: req.body.findings,
                pws_report: req.body.pws_report,
                vfs_report: req.body.vfs_report,
                preferred_solution: req.body.preferred_solution,
                cust_preferred_solution: req.body.cust_preferred_solution,
                warranty: req.body.warranty,
                materials: req.body.materials,
                vfs_component: req.body.vfs_component,
                purifier_component: req.body.purifier_component,
                tac: req.body.tac,
                purifier_max_usage: req.body.purifier_max_usage,
                vfs_max_usage: req.body.vfs_max_usage,
                expr_date: req.body.expr_date,
                ps_total: req.body.ps_total,
                css_total: req.body.css_total,
                sign: req.body.sign
            }
        })

        res.status(201).json(successResponse('Quotation updated'))

    } catch (error) {
        next(error)
    }
}

const getQuotations = async (req, res, next) => {
    try {
        const { id } = req.query
        let data = []
        if (id) {
            data = await QuotationInputModel.findOne({ _id: new ObjectId(id) })
        } else {
            data = await QuotationInputModel.find({}, { quotation_srl_no: 1, type: 1, enquiry_srl_no: 1, customer: 1 })
        }
        res.status(201).json(successResponse('All quotations', data))

    } catch (error) {
        next(error)
    }
}

const deleteQuotation = async (req, res) => {
    try {
        const { slno } = req.query
        if (!slno) {
            return res.status(409).json(errorResponse('Request query is missing', 409))
        }

        const result = await QuotationInputModel.deleteOne({ quotation_srl_no: slno })
        if (!result.deletedCount) {
            return res.status(400).json(errorResponse('Invalid serial number'))
        }

        // ? delete signature 
        // await deleteSignature(quotation?.sign?.customer?.key)
        res.status(201).json(successResponse('Quotation deleted'))

    } catch (error) {
        next(error)
    }
}

module.exports = { postQuotationForm, getQuotations, deleteQuotation, updateQuotationForm }