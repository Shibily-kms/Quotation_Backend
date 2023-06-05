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

const PreDataQuotationModel = mongoose.model('purifier_resource_datas', preDataQuotationSchema)
module.exports = PreDataQuotationModel