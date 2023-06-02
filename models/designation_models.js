const mongoose = require('mongoose');

const designationSchema = new mongoose.Schema(
    {
        designation: {
            type: String,
            required: true
        },
        name: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'users',
            }
        ]
    },
    {
        timestamps: true
    })

const DesignationModel = mongoose.model('existing_designation', designationSchema)
module.exports = DesignationModel