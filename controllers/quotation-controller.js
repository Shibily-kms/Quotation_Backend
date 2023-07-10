const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const QuotationInputModel = require('../models/quotation-inputs-data')
const { verifyQuotationInputs } = require('../helpers/validate-function')
const { createQuotationId } = require('../helpers/helper-function')
const { uploadSignature, deleteSignature } = require('../helpers/upload-image')

const postQuotationForm = async (req, res) => {
    try {

        let verifyInputs = verifyQuotationInputs(req.body)
        if (verifyInputs.status) {
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
            await QuotationInputModel.create(req.body).then((response) => {
                res.status(201).json({ status: true, quotation: response, message: 'new quotation' })
            })

        } else {
            res.status(400).json({ status: false, message: verifyInputs.message })
        }

    } catch (error) {
        if (error.name === 'UnknownEndpoint') {
            res.status(400).json({ status: false, message: 'No proper internet connection' })
        } else {
            throw error;
        }
    }
}

const updateQuotationForm = async (req, res) => {
    try {

        // Save Signature in Folder
        if (req.body?.sign?.customer?.url && !req.body?.sign?.customer?.key) {
            let customer = await uploadSignature(req.body.sign.customer.url, req.body.quotation_srl_no, 'customer')
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
        }).then(() => {

            res.status(201).json({ status: true, message: 'Quotation Updated' })
        })
    } catch (error) {
        throw error;
    }
}

const getAllQuotations = (req, res) => {
    try {
        QuotationInputModel.find().then((response) => {
            res.status(201).json({ status: true, quotations: response, message: 'all quotations' })
        })

    } catch (error) {
        throw error;
    }
}

const deleteQuotation = async (req, res) => {
    try {
        let { slno } = req.query
        if (slno) {
            let quotation = await QuotationInputModel.findOne({ quotation_srl_no: slno })
            if (quotation) {
                QuotationInputModel.deleteOne({ quotation_srl_no: slno }).then(async (response) => {
                    if (response.deletedCount) {
                        // ? delete signature 
                        // await deleteSignature(quotation?.sign?.customer?.key)
                        // await deleteSignature(quotation?.sign?.authorized?.key)
                        res.status(201).json({ status: true, message: 'quotation deleted' })
                    } else {
                        res.status(400).json({ status: false, message: 'no mated quotation' })
                    }
                })
            } else {
                res.status(400).json({ status: false, message: 'no quotation available' })
            }
        } else {
            res.status(400).json({ status: false, message: 'add slno in query' })
        }
    } catch (error) {
        throw error;
    }
}

module.exports = { postQuotationForm, getAllQuotations, deleteQuotation, updateQuotationForm }