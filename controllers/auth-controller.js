const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const StaffModel = require('../models/staff-model')
const DesignationModel = require('../models/designation_models')
const jwt = require('jsonwebtoken')
const { successResponse, errorResponse } = require('../helpers/response-helper')

const userVerifyForSales = async (req, res, next) => {
    try {
        const { userId } = req.params

        if (!userId) {
            return res.status(409).json(errorResponse('Request query is missing', 409))
        }

        const user = await StaffModel.findOne({ _id: new ObjectId(userId), delete: { $ne: true } })
        if (!user) {
            return res.status(401).json(errorResponse('Invalid user Id', 401))
        }

        const designation_details = await DesignationModel.findById({ _id: user.designation })
        if (!designation_details._doc.allow_sales) {
            return res.status(401).json(errorResponse('Sales access denied', 401))
        }

        const maxAge = 60 * 60 * 24 * 30
        const token = jwt.sign({ user: user._id }, process.env.TOKEN_KEY, { expiresIn: maxAge })

        delete user._doc.password
        delete user._doc.delete
        delete user._doc.updatedAt
        delete user._doc.__v
        user._doc.token = token
        user._doc.designation = {
            id: designation_details._id,
            designation: designation_details.designation,
            allow_sales: designation_details.allow_sales || false
        }
        res.status(201).json(successResponse('User login success', user))

    } catch (error) {
        next(error)
    }
}

module.exports = { userVerifyForSales }