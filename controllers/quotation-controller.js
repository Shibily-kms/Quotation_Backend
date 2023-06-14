const QuotationInputModel = require('../models/quotation-inputs-data')
const { verifyQutationInputs } = require('../helpers/validate-function')
const { createQutationId } = require('../helpers/helper-function')
const { uploadSignature } = require('../helpers/upload-image')

const postQuotationForm = async (req, res) => {
    try {
      
        let verifyInputs = verifyQutationInputs(req.body)
        if (verifyInputs.status) {

            let lastData = await QuotationInputModel.find({ type: req.body.type, visit_date: req.body.visit_date })
            //index
            req.body.index = lastData[lastData.length - 1]?.index ? lastData[lastData.length - 1]?.index + 1 : 1
            // Qutation srl number
            req.body.quotation_srl_no = createQutationId(req.body.type, req.body.visit_date, (req.body.index))
            // Save Signature in Folder
            let customer = await uploadSignature(req.body.sign.customer, req.body.quotation_srl_no, 'customer')
            let authorized = await uploadSignature(req.body.sign.authorized, req.body.quotation_srl_no, 'authorized')
            req.body.sign = { customer, authorized }

            // Upload to DB
            await QuotationInputModel.create(req.body).then((response) => {
                res.status(201).json({ status: true, quotation: response, message: 'new quotation' })
            })

        } else {
            res.status(400).json({ status: true, message: verifyInputs.message })
        }

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

const deleteQuotation = (req, res) => {
    try {
        let { slno } = req.query
        if (slno) {
            QuotationInputModel.deleteOne({ quotation_srl_no: slno }).then((response) => {
                if(response.deletedCount){
                    res.status(201).json({ status: true, message: 'deleted' })
                }else{
                    res.status(400).json({ status: false, message: 'no mated quotation' })
                }
            }).catch((error) => {
            })
        } else {
            res.status(400).json({ status: false, message: 'add slno in query' })
        }
    } catch (error) {

    }
}

module.exports = { postQuotationForm, getAllQuotations, deleteQuotation }