const QuotationInputModel = require('../models/quotation-inputs-data')
const { verifyQuotationInputs } = require('../helpers/validate-function')
const { createQuotationId } = require('../helpers/helper-function')
const { uploadSignature, deleteSignature } = require('../helpers/upload-image')
const { YYYYMMDDFormat } = require('../helpers/date-formate')

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
            if (req.body?.customer?.url) {
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

module.exports = { postQuotationForm, getAllQuotations, deleteQuotation }