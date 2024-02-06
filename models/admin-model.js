const mongoose = require('mongoose');
const Schema = mongoose.Schema

const adminSchema = new mongoose.Schema(
    {
        access_key: {
            type: String,
            require: true,
            validate: {
                validator: (key) => {
                    return [
                        'Tally', 'Staff', 'Purifier', 'WholeHouse'
                    ].includes(key);
                },
                message: 'Invalid key value'
            }
        },
        last_data_access_time: Date,                    // For Tally
        origins_list: [],                               // For Staff
        last_complaint_reg_no: Number,                  // For Purifier, WholeHouse,
        last_service_reg_no: Number,                    // For Purifier, WholeHouse,
        last_spare_id: Number,
        last_amc_id: Number,                            // For Purifier, WholeHouse,
        last_ssp_id: Number,                         // For Purifier, WholeHouse,
        last_iw_id: Number,                         // For Purifier, WholeHouse,

    },
    {
        timestamps: true
    })

const AdminModel = mongoose.model('admin', adminSchema, 'admin')
module.exports = AdminModel