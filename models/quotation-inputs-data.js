const mongoose = require('mongoose');

const quotationInputSchema = new mongoose.Schema(
    {
        quotation_srl_no: String,
        index: Number,
        type: String,
        visit_date: String,
        enquiry_srl_no: String,
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
            type_of : String,
            source: String,
            tds: Number,
            ph: Number,
            fe: Number,
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
        vfs_report: {
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
        warranty: { pws: String, vfs: String },
        materials: [{ item: String, brand: String }],
        vfs_component: [{ item: String, brand: String }],
        purifier_component: [{ item: String, brand: String }],
        tac: [{ text: String }],
        purifier_max_usage: Number,
        vfs_max_usage: Number,
        expr_date: String,
        ps_total: Number,
        css_total: Number,
        sign: { customer: {} }
    },
    {
        timestamps: true
    })

const QuotationInputModel = mongoose.model('quotation_inputs_data', quotationInputSchema)
module.exports = QuotationInputModel