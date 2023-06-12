const mongoose = require('mongoose');

const quotationInputSchema = new mongoose.Schema(
    {
        quotation_srl_no: String,
        index : Number,
        type: String,
        visit_date: String,
        customer: {
            name: String,
            address: String,
            place: String,
            post: String,
            dt: String,
            pin: String,
            mobile: String
        },
        test_report: {
            source: String,
            tds: Number,
            ph: Number,
            fa: Number,
            ca: Number
        },
        findings: [{ text: String }],
        pws_report: {
            site: String,
            usage: String,
            iMode: String,
            water_point: Boolean,
            plug_point: Boolean
        },
        vfws_report: {
            site: String,
            usage: String,
            tank_capasity: Number,
            motor_details: String,
            floor_details: String,
            floor_hight: Number,
            inlet: Number,
            outlet: Number,
            bathroom_in_top: Number
        },
        preferred_solution: [{ item: String, price: Number }],
        cust_preferred_solution: [{ item: String, price: Number }],
        warranty: { pws: String, vfws: String },
        materials: [{ item: String, brand: String }],
        vfs_component: [{ item: String, brand: String }],
        purifier_component: [{ item: String, brand: String }],
        tac: [{ text: String }],
        sign: { customer: String, authorized: String }
    },
    {
        timestamps: true
    })

const QuotationInputModel = mongoose.model('quotation_inputs_data', quotationInputSchema)
module.exports = QuotationInputModel