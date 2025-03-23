const mongoose = require('mongoose');

const installationSchema = new mongoose.Schema(
    {
        prospect_id: {
            type: String
        },
        technician_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'staff_datas'
        },
        installation_srl_no: {
            type: String
        },
        index: {
            type: Number
        },
        installation_id: {
            type: String
        },
        date: {
            type: String
        },
        site_category: {
            type: String
        },
        products_list: [{
            cid: {
                type: String,
                ref: 'customer_details'
            },
            product_id: {
                type: mongoose.Schema.Types.ObjectId
            },
            product_type: {
                type: Number
            },
            product_name: {
                type: String  // for old
            },
            comment: {
                type: String  // for old
            },
            checkup: {
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
            images: [{
                url: {
                    type: String
                },
                key: {
                    type: String
                }
            }]
        }],
        customer_needs_changes: {
            type: String
        },
        extra_work_comment: {
            type: String
        },
        tech_confirm: {
            product_verification: {
                type: Boolean
            },
            pdc_collection: {
                type: Boolean
            },
            quotation_handover: {
                type: Boolean
            }
        },
        received_amount: {
            amount: {
                type: Number
            },
            pay_id: {
                type: mongoose.Schema.Types.ObjectId
            }
        },
        condition_sign: {           // for old
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
        db_version: {
            type: String,
            default: '1.0'
        }
    },
    {
        timestamps: true
    })

const InstallationV1Model = mongoose.model('installation_form', installationSchema)
module.exports = InstallationV1Model

