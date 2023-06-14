const StaffModel = require('../models/staff-model')
const DesignationModel = require('../models/designation_models')
const jwt = require('jsonwebtoken')

const userVerifyForSales = (req, res) => {
    try {
        const userId = req.params.userId
        const maxAge = 60 * 60 * 24 * 30

        StaffModel.findById(userId).then(async (user) => {
           
            if (user) {
                const designation_details = await DesignationModel.findById({ _id: user.designation })
              
                if (designation_details._doc.allow_sales) {
                    
                    const token = jwt.sign({ user: user._id }, process.env.TOKEN_KEY, { expiresIn: maxAge })
                    delete user._doc.password
                    user._doc.token = token
                    user._doc.designation = {
                        id: designation_details._id,
                        designation: designation_details.designation
                    }
                    res.status(201).json({ status: true, user, message: 'user is valid' })
                } else {
                    res.status(400).json({ status: false, message: 'Access denied' })
                }
            }
        }).catch((error) => {
            res.status(400).json({ status: false, message: 'invalid userId' })
        })

    } catch (error) {
        throw error;
    }
}

module.exports = { userVerifyForSales }