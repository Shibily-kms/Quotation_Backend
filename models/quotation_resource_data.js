const mongoose = require('mongoose');

const preDataQuotationSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        data: [{
            item: String,
            price: Number,
            brands: [{
                brand: String
            }],
            warranty: String
        }]
    },
    {
        timestamps: true
    })

const PreDataQuotationModel = mongoose.model('quotation_resource_datas', preDataQuotationSchema)
module.exports = PreDataQuotationModel