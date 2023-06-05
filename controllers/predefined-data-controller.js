const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const PreDataQuotationModel = require('../models/quotation_predefined_data')
const { findCurrentDataType } = require('../helpers/helper-function')


// Single Value CRUD
const addSingleValue = async (req, res) => {

    try {
        const title = findCurrentDataType(req.originalUrl)

        const { item } = req.body
        const data = await PreDataQuotationModel.findOne({ title, 'data.item': item })

        if (!data && item) {
            PreDataQuotationModel.findOneAndUpdate({ title }, {
                $push: {
                    data: { item: item }
                }
            }, {
                upsert: true, new: true
            }).then((response) => {
                const newAddedValue = response.data[response.data.length - 1]; // Retrieve the last added value
                res.status(201).json({ status: true, newValue: newAddedValue, message: 'new data added' })
            })
        } else {
            res.status(400).json({ status: false, message: 'This already existed' })
        }

    } catch (error) {
        throw error;
    }
}

const getAllValue = (req, res) => {
    try {
        const title = findCurrentDataType(req.originalUrl)
        PreDataQuotationModel.findOne({ title }).then((data) => {
            res.status(201).json({ status: true, source: data, message: 'All items' })
        })
    } catch (error) {
        throw error;
    }
}

const editSingleValue = async (req, res) => {
    try {
        const title = findCurrentDataType(req.originalUrl)
        const { _id, item } = req.body
        const data = await PreDataQuotationModel.findOne({ title, 'data.item': item })

        if (!data && item) {
            PreDataQuotationModel.updateOne({ title, 'data._id': new ObjectId(_id) }, {
                $set: {
                    'data.$.item': item
                }
            }).then(() => {
                res.status(201).json({ status: true, message: 'Updated' })
            })
        } else {
            res.status(400).json({ status: false, message: 'This already existed' })
        }
    } catch (error) {
        throw error;
    }
}

const deleteSingleValue = (req, res) => {
    try {
        const title = findCurrentDataType(req.originalUrl)
        const { id } = req.query

        if (id) {
            PreDataQuotationModel.updateOne({ title, 'data._id': new ObjectId(id) }, {
                $pull: {
                    data: {
                        _id: new ObjectId(id)
                    }
                }
            }).then(() => {
                res.status(201).json({ status: true, message: 'Removed' })
            })
        } else {
            res.status(400).json({ status: false, message: 'Pass id with query' })
        }
    } catch (error) {
        throw error;
    }
}


module.exports = {
    addSingleValue, editSingleValue, deleteSingleValue, getAllValue
}