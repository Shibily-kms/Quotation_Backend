const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const PreDataQuotationModel = require('../models/quotation_resource_data')
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
            data && res.status(400).json({ status: false, message: 'This already existed' })
            !item && res.status(400).json({ status: false, message: 'All Field Required' })
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
            data && res.status(400).json({ status: false, message: 'This already existed' })
            !item && res.status(400).json({ status: false, message: 'All Field Required' })
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

// Soluction's Models

const addSolutionModel = async (req, res) => {

    try {
        const title = findCurrentDataType(req.originalUrl)

        const { item, price } = req.body
        const data = await PreDataQuotationModel.findOne({ title, 'data.item': item })

        if (!data && item && price) {
            PreDataQuotationModel.findOneAndUpdate({ title }, {
                $push: {
                    data: { item, price: Number(price) }
                }
            }, {
                upsert: true, new: true
            }).then((response) => {
                const newAddedValue = response.data[response.data.length - 1]; // Retrieve the last added value
                res.status(201).json({ status: true, newValue: newAddedValue, message: 'new data added' })
            })
        } else {
            data && res.status(400).json({ status: false, message: 'This already existed' })
            !item || !price ? res.status(400).json({ status: false, message: 'All Field Required' }) : ''
        }

    } catch (error) {
        throw error;
    }
}

const getAllSolutionModel = (req, res) => {
    try {
        const title = findCurrentDataType(req.originalUrl)
        PreDataQuotationModel.findOne({ title }).then((data) => {
            res.status(201).json({ status: true, items: data, message: 'All items' })
        })
    } catch (error) {
        throw error;
    }
}

const editSolutionModel = async (req, res) => {
    try {
        const title = findCurrentDataType(req.originalUrl)
        const { _id, item, price } = req.body
        let data = await PreDataQuotationModel.findOne({ title, 'data.item': item }, { data: { $elemMatch: { item: item } } })
        data = data?.data?.[0]?._id == _id ? null : data


        if (!data && item && price) {
            PreDataQuotationModel.updateOne({ title, 'data._id': new ObjectId(_id) }, {
                $set: {
                    'data.$.item': item,
                    'data.$.price': Number(price)
                }
            }).then(() => {
                res.status(201).json({ status: true, message: 'Updated' })
            })
        } else {
            data && res.status(400).json({ status: false, message: 'This already existed' })
            !item || !price ? res.status(400).json({ status: false, message: 'All Field Required' }) : ''
        }
    } catch (error) {
        throw error;
    }
}

const deleteSolutionModel = (req, res) => {
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


// Purifier Components

const addComponents = async (req, res) => {

    try {
        const title = findCurrentDataType(req.originalUrl)

        const { name, brand } = req.body
        let data = await PreDataQuotationModel.findOne({ title, 'data.item': name, 'data.brands.brand': brand },
            { data: { $elemMatch: { item: name, brands: { $elemMatch: { brand } } } } })
        data = data?.data.length === 0 ? null : data

        if (!data && name && brand) {
            let check = await PreDataQuotationModel.findOne({ title, 'data.item': name })
            if (check) {
                PreDataQuotationModel.findOneAndUpdate({ title, 'data.item': name }, {
                    $push: {
                        'data.$.brands': { brand }
                    }
                }, {
                    upsert: true, new: true
                }).then((response) => {
                    const newAddedValue = response.data.filter((obj) => obj.item === name).map((obj) => {
                        return {
                            item: obj.item,
                            _id: obj._id,
                            brands: obj.brands.filter((obj2) => obj2.brand === brand)
                        }
                    });
                    res.status(201).json({ status: true, newValue: newAddedValue[0], message: 'new data added' })
                })
            } else {
                PreDataQuotationModel.findOneAndUpdate({ title }, {
                    $push: {
                        data: {
                            item: name,
                            brands: [{ brand }]
                        }
                    }
                }, {
                    upsert: true, new: true
                }).then((response) => {
                    const newAddedValue = response.data.filter((obj) => obj.item === name).map((obj) => {
                        return {
                            item: obj.item,
                            _id: obj._id,
                            brands: obj.brands.filter((obj2) => obj2.brand === brand)
                        }
                    });
                    res.status(201).json({ status: true, newValue: newAddedValue[0], message: 'new data added' })
                })
            }
        } else {

            data && res.status(400).json({ status: false, message: 'This already existed' })
            !name || !brand ? res.status(400).json({ status: false, message: 'All Field Required' }) : ''
        }

    } catch (error) {
        throw error;
    }
}

const getAllComponents = (req, res) => {
    try {
        const title = findCurrentDataType(req.originalUrl)
        PreDataQuotationModel.findOne({ title }).then((data) => {
            res.status(201).json({ status: true, items: data, message: 'All items' })
        })
    } catch (error) {
        throw error;
    }
}

const editComponents = async (req, res) => {
    try {
        const title = findCurrentDataType(req.originalUrl)
        const { nameId, brandId, name, brand } = req.body

        let data = await PreDataQuotationModel.findOne({ title, 'data.item': name, 'data.brands.brand': brand },
            { data: { $elemMatch: { item: name, brands: { $elemMatch: { brand } } } } })
        data = data?.data.length === 0 ? null : data

        if (!data && name && brand) {
            PreDataQuotationModel.updateMany({ title, 'data._id': new ObjectId(nameId), 'data.brands._id': new ObjectId(brandId) }, {
                $set: {
                    'data.$[dataElem].brands.$[brandElem].brand': brand
                }
            }, {
                arrayFilters: [
                    { 'dataElem._id': new ObjectId(nameId) },
                    { 'brandElem._id': new ObjectId(brandId) }
                ]
            }).then(() => {
                res.status(201).json({ status: true, message: 'Updated' })
            })
        } else {
            data && res.status(400).json({ status: false, message: 'This already existed' })
            !name || !brand ? res.status(400).json({ status: false, message: 'All Field Required' }) : ''
        }
    } catch (error) {
        throw error;
    }
}

const deleteComponents = (req, res) => {
    try {
        const title = findCurrentDataType(req.originalUrl)
        const { nameId, brandId } = req.query

        if (nameId && brandId) {
            PreDataQuotationModel.updateOne({ title, 'data._id': new ObjectId(nameId), 'data.brands._id': new ObjectId(brandId) }, {
                $pull: {
                    'data.$[dataElem].brands': { _id: new ObjectId(brandId) }
                }
            }, {
                arrayFilters: [
                    { 'dataElem._id': new ObjectId(nameId) }
                ]
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
    addSingleValue, editSingleValue, deleteSingleValue, getAllValue,
    addSolutionModel, editSolutionModel, deleteSolutionModel, getAllSolutionModel,
    addComponents, editComponents, deleteComponents, getAllComponents
}