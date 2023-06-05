const mongoose = require('mongoose');

const preDataQuotationSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        data: [{
            item: String,
            price : Number
        }]
    },
    {
        timestamps: true
    })

const PreDataQuotationModel = mongoose.model('predefined_data_of_quotation', preDataQuotationSchema)
module.exports = PreDataQuotationModel