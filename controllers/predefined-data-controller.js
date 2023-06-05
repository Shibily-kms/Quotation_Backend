const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const PreDataQuotationModel = require('../models/quotation_predefined_data')


// Water Test result Source (WTRS)
const addWTRS = async (req, res) => {
    try {
        const { item } = req.body
        const data = await PreDataQuotationModel.findOne({ title: 'WATER_TEST_REPORT_SOURCE', 'data.item': item })

        if (!data && item) {
            PreDataQuotationModel.findOneAndUpdate({ title: 'WATER_TEST_REPORT_SOURCE' }, {
                $push: {
                    data: { item: item }
                }
            }, {
                upsert: true, new: true
            }).then((response) => {
                const newAddedValue = response.data[response.data.length - 1]; // Retrieve the last added value
                console.log(newAddedValue, 'data');
                res.status(201).json({ status: true, newValue: newAddedValue, message: 'new data added' })
            })
        } else {
            res.status(400).json({ status: false, message: 'This already existed' })
        }

    } catch (error) {
        throw error;
    }
}

const getAllWTRS = (req, res) => {
    try {
        PreDataQuotationModel.findOne({ title: 'WATER_TEST_REPORT_SOURCE' }).then((data) => {
            res.status(201).json({ status: true, source: data, message: 'get WTRS items' })
        })
    } catch (error) {
        throw error;
    }
}

const editWTRS = async (req, res) => {
    try {
        const { _id, item } = req.body
        const data = await PreDataQuotationModel.findOne({ title: 'WATER_TEST_REPORT_SOURCE', 'data.item': item })

        if (!data && item) {
            PreDataQuotationModel.updateOne({ title: 'WATER_TEST_REPORT_SOURCE', 'data._id': new ObjectId(_id) }, {
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

const deleteWTRS = (req, res) => {
    try {
        const { id } = req.query
        if (id) {
            PreDataQuotationModel.updateOne({ title: 'WATER_TEST_REPORT_SOURCE', 'data._id': new ObjectId(id) }, {
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

module.exports = { addWTRS, getAllWTRS, editWTRS, deleteWTRS }