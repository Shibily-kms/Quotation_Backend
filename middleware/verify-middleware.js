const jwt = require('jsonwebtoken')
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const StaffModel = require('../models/staff-model')
const { errorResponse } = require('../helpers/response-helper')

const verifyUser = async (req, res, next) => {
    try {

        if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer')) {
            return res.status(401).json(errorResponse('Authorization token not provided', 401))
        }

        const token = req.headers.authorization.split(' ')[1];
        let decodedToken = null
        try {
            decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
        } catch (err) {
            return res.status(401).json(errorResponse('Token expired, Log in again now!', 401));
        }

        if (!decodedToken) {
            return res.status(401).json(errorResponse('Invalid token', 401));
        }

        if (Date.now() >= decodedToken.exp * 1000) {
            return res.status(401).json(errorResponse('Token expired, Log in again now!', 401));
        }

        const user_id = decodedToken.user;
        const user = await StaffModel.findOne({ _id: new ObjectId(user_id), delete: { $ne: true } })
        if (!user) {
            return res.status(401).json(errorResponse('User not found or deleted. Log in again now!', 401));
        }

        req.user = {
            id: user_id,
        };
        next();

    } catch (error) {
        return res.status(401).json(errorResponse('Log in again now!', 401))
    }
}

module.exports = { verifyUser } 