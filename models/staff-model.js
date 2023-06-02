const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema(
    {
      
        user_name: {
            type: String,
            required: true
        },
        email_id: {
            type: String,
            required: true
        },
        contact: {
            type: String,
            required: true
        },
        designation: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'existing_designations',
            required: true
        },
        dob: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    })

const StaffModel = mongoose.model('staff_data', staffSchema)
module.exports = StaffModel