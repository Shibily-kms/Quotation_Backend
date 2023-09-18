const mongoose = require('mongoose');

const workSchema = new mongoose.Schema(
    {
        service_srl_number: {
            type: String
        },
        index: {
            type: Number,
        },
        date: {
            type: String,
        },
        cid: {
            type: Number
        },
        name: {
            type: String,
        },
    },
    {
        timestamps: true
    })

const WorkModel = mongoose.model('purifier_service_full_datas_V2', workSchema, 'purifier_service_full_datas_V2')
module.exports = WorkModel