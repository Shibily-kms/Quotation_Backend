const mongoose = require('mongoose');

const reinstallationSchema = new mongoose.Schema(
    {
        cid: {
            type: String,
            required: true,
            ref: 'customer_details'
        },
        reinstallation_srl_no: {
            type: String,
            required: true
        },
        index: {
            type: Number,
            required: true
        },
        date: {
            type: String,
            required: true
        },
        type_of_product: {
            type: String,
            required: true
        },
        mode_of_installation: {
            type: String,
            required: true
        },
        purifier_id: {
            type: mongoose.Schema.Types.ObjectId,
        },
        purifier_name: {
            type: String
        },
        purifier_usage: {
            type: String
        },
        pr_description: {
            type: String
        },
        wh_id: {
            type: mongoose.Schema.Types.ObjectId,
        },
        wh_name: {
            type: String
        },
        wh_description: {
            type: String
        },
        total_amount: {
            type: Number
        },
        installed_by: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'staff_datas'
        },
        spare_list: [{
            spare_id: {
                type: String
            },
            spare_type: {
                type: String
            },
            quantity: {
                type: Number
            }
        }],
        condition_sign: {
            name: {
                type: String
            },
            url: {
                type: String
            },
            key: {
                type: String
            }
        },
    },
    {
        timestamps: true
    })

const ReInstallationModel = mongoose.model('product_reinstallation', reinstallationSchema, 'product_reinstallation')
module.exports = ReInstallationModel