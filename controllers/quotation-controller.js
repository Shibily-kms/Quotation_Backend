const QuotationInputModel = require('../models/quotation-inputs-data')
const { verifyQutationInputs } = require('../helpers/validate-function')
const { createQutationId } = require('../helpers/helper-function')

const postQuotationForm = async (req, res) => {
    try {
        let verifyInputs = verifyQutationInputs(req.body)
        if (verifyInputs.status) {
            let lastData = await QuotationInputModel.findOne({ type: req.body.type, visit_date: req.body.visit_date })
            req.body.index = lastData?.index ? lastData?.index + 1 : 1
            req.body.service_srl_number = createQutationId(req.body.type, req.body.visit_date, (req.body.index))
            QuotationInputModel.create(req.body).then((response) => {
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

module.exports = { postQuotationForm, getAllQuotations }