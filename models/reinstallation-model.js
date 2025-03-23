const mongoose = require('mongoose');

const reworkSchema = new mongoose.Schema(
    {
        cid: {
            type: String
        },
        rework_srl_no: {
            type: String,
            required: true
        },
        index: {
            type: Number
        },
        product_type: {
            type: Number
        },
        date: {
            type: String
        },
        work_type: {
            type: String
        },
        product_id: {
            type: mongoose.Schema.Types.ObjectId,
        },
        site_category: {
            type: String
        },
        description: {
            type: String
        },
        re_filling_included: {
            type: Boolean,
            default: false
        },
        technician: {
            type: mongoose.Schema.Types.ObjectId,
        },
        in_time: {
            type: Date
        },
        out_time: {
            type: Date
        },
        product_checkup: {
            tds_status: {
                type: String
            },
            input_tds: {
                type: Number
            },
            output_tds: {
                type: Number
            },
            ph_status: {
                type: String
            },
            ph: {
                type: Number
            },
            filtered_water_flow_ltrs: {
                type: Number
            },
            v_free_space: {
                type: Number
            }
        },
        received_amount: {
            amount: {
                type: Number
            },
            method: {
                type: String
            },
            pay_id: {
                type: mongoose.Schema.Types.ObjectId,
            }
        },
        verification: {
            type: Boolean,
            default: false
        },
        db_version: {
            type: String,
            default: '1.0'
        },

        // old version
        product_name: {
            type: String
        },
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

const ReworkModel = mongoose.model('installation_reworks', reworkSchema, 'installation_reworks')
module.exports = ReworkModel