const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const PreDataQuotationModel = require('../models/quotation_resource_data')
const { findCurrentDataType } = require('../helpers/helper-function')
const { successResponse, errorResponse } = require('../helpers/response-helper')

// Single Value CRUD
const addSingleValue = async (req, res, next) => {

    try {
        const { item } = req.body
        if (!item) {
            return res.status(409).json(errorResponse('Request body is missing', 409))
        }

        const title = findCurrentDataType(req.originalUrl)
        const data = await PreDataQuotationModel.findOne({ title, 'data.item': item })

        if (data) {
            return res.status(400).json(errorResponse('This already exists'))
        }

        const preData = await PreDataQuotationModel.findOneAndUpdate({ title }, {
            $push: { data: { item: item } }
        }, { upsert: true, new: true })

        const nowAdded = preData.data[preData.data.length - 1]; // Retrieve the last added value
        res.status(201).json(successResponse('New data added', nowAdded))

    } catch (error) {
        next(error)
    }
}

const getAllValue = async (req, res, next) => {
    try {
        const title = findCurrentDataType(req.originalUrl);
        const allData = await PreDataQuotationModel.findOne({ title })
        res.status(201).json(successResponse('All items', allData))

    } catch (error) {
        next(error)
    }
}

const editSingleValue = async (req, res) => {
    try {
        const { _id, item } = req.body
        if (!_id || !item) {
            return res.status(409).json(errorResponse('Request body is missing', 409))
        }

        const title = findCurrentDataType(req.originalUrl)
        const data = await PreDataQuotationModel.findOne({ title, 'data.item': item })
        if (data) {
            return res.status(400).json(errorResponse('This already exists'))
        }

        const result = await PreDataQuotationModel.updateOne({ title, 'data._id': new ObjectId(_id) }, {
            $set: {
                'data.$.item': item
            }
        })

        if (!result.modifiedCount) {
            return res.status(400).json(errorResponse('Invalid item'))
        }

        res.status(201).json(successResponse('Updated'))

    } catch (error) {
        next(error)
    }
}

const deleteSingleValue = async (req, res, next) => {
    try {
        const { id } = req.query
        if (!id) {
            return res.status(409).json(errorResponse('Request query is missing', 409))
        }

        const title = findCurrentDataType(req.originalUrl)
        const result = await PreDataQuotationModel.updateOne({ title, 'data._id': new ObjectId(id) }, {
            $pull: {
                data: {
                    _id: new ObjectId(id)
                }
            }
        })

        if (!result.modifiedCount) {
            return res.status(400).json(errorResponse('Invalid item'))
        }

        res.status(201).json(successResponse('Removed'))

    } catch (error) {
        next(error)
    }
}

// solution's Models

const addSolutionModel = async (req, res, next) => {

    try {
        const { item, price } = req.body
        if (!item || !price) {
            return res.status(409).json(errorResponse('Request body is missing', 409))
        }

        const title = findCurrentDataType(req.originalUrl)
        const data = await PreDataQuotationModel.findOne({ title, 'data.item': item })
        if (data) {
            return res.status(400).json(errorResponse('This already exists'))
        }

        const preData = await PreDataQuotationModel.findOneAndUpdate({ title }, {
            $push: {
                data: { item, price: Number(price) }
            }
        }, {
            upsert: true, new: true
        })

        const newAddedValue = preData.data[preData.data.length - 1]; // Retrieve the last added value
        res.status(201).json(successResponse('New data added', newAddedValue))

    } catch (error) {
        next(error)
    }
}

const getAllSolutionModel = async (req, res, next) => {
    try {
        const title = findCurrentDataType(req.originalUrl)
        const allData = await PreDataQuotationModel.findOne({ title })
        res.status(201).json(successResponse('All items', allData))
    } catch (error) {
        next(error)
    }
}

const editSolutionModel = async (req, res) => {
    try {
        const { _id, item, price } = req.body
        if (!_id || !item || !price) {
            return res.status(409).json(errorResponse('Request body is missing', 409))
        }

        const title = findCurrentDataType(req.originalUrl)
        let data = await PreDataQuotationModel.findOne({ title, 'data.item': item }, { data: { $elemMatch: { item: item } } })
        data = data?.data?.[0]?._id == _id ? null : data
        if (data) {
            return res.status(400).json(errorResponse('This already exists'))
        }

        const result = await PreDataQuotationModel.updateOne({ title, 'data._id': new ObjectId(_id) }, {
            $set: {
                'data.$.item': item,
                'data.$.price': Number(price)
            }
        })
        if (!result.modifiedCount) {
            return res.status(400).json(errorResponse('Invalid item'))
        }

        res.status(201).json(successResponse('Updated'))

    } catch (error) {
        next(error)
    }
}

const deleteSolutionModel = async (req, res, next) => {
    try {
        const { id } = req.query
        if (!id) {
            return res.status(409).json(errorResponse('Request query is missing', 409))
        }

        const title = findCurrentDataType(req.originalUrl)
        const result = await PreDataQuotationModel.updateOne({ title, 'data._id': new ObjectId(id) }, {
            $pull: {
                data: {
                    _id: new ObjectId(id)
                }
            }
        })
        if (!result.modifiedCount) {
            return res.status(400).json(errorResponse('Invalid item'))
        }

        res.status(201).json(successResponse('Removed'))

    } catch (error) {
        next(error)
    }
}


// Purifier Components

const addComponents = async (req, res, next) => {

    try {
        const { name, brand } = req.body
        if (!name || !brand) {
            return res.status(409).json(errorResponse('Request body is missing', 409))
        }

        const title = findCurrentDataType(req.originalUrl)
        let data = await PreDataQuotationModel.findOne({ title, 'data.item': name, 'data.brands.brand': brand },
            { data: { $elemMatch: { item: name, brands: { $elemMatch: { brand } } } } })
        data = data?.data.length === 0 ? null : data

        if (data) {
            return res.status(400).json(errorResponse('This already exists'))
        }

        const check = await PreDataQuotationModel.findOne({ title, 'data.item': name })
        if (check) {
            const addOnlyBrand = await PreDataQuotationModel.findOneAndUpdate({ title, 'data.item': name }, {
                $push: {
                    'data.$.brands': { brand }
                }
            }, {
                upsert: true, new: true
            })
            const newAddedValue = addOnlyBrand.data.filter((obj) => obj.item === name).map((obj) => {
                return {
                    item: obj.item,
                    _id: obj._id,
                    brands: obj.brands.filter((obj2) => obj2.brand === brand)
                }
            });

            return res.status(201).json(successResponse('New data added', newAddedValue[0]))

        } else {
            const addWithItem = await PreDataQuotationModel.findOneAndUpdate({ title }, {
                $push: {
                    data: {
                        item: name,
                        brands: [{ brand }]
                    }
                }
            }, {
                upsert: true, new: true
            })

            const newAddedValue = addWithItem.data.filter((obj) => obj.item === name).map((obj) => {
                return {
                    item: obj.item,
                    _id: obj._id,
                    brands: obj.brands.filter((obj2) => obj2.brand === brand)
                }
            });

            return res.status(201).json(successResponse('New data added', newAddedValue[0]))
        }

    } catch (error) {
        next(error)
    }
}

const getAllComponents = async (req, res, next) => {
    try {
        const title = findCurrentDataType(req.originalUrl)
        const allData = await PreDataQuotationModel.findOne({ title })
        res.status(201).json(successResponse('All items', allData))
    } catch (error) {
        next(error)
    }
}

const editComponents = async (req, res) => {
    try {
        const { nameId, brandId, name, brand } = req.body
        if (!nameId || !brandId || !name || !brand) {
            return res.status(409).json(errorResponse('Request body is missing', 409))
        }

        const title = findCurrentDataType(req.originalUrl)
        let data = await PreDataQuotationModel.findOne({ title, 'data.item': name, 'data.brands.brand': brand },
            { data: { $elemMatch: { item: name, brands: { $elemMatch: { brand } } } } })
        data = data?.data.length === 0 ? null : data

        if (data) {
            return res.status(400).json(errorResponse('This already exists'))
        }

        const result = await PreDataQuotationModel.updateMany({ title, 'data._id': new ObjectId(nameId), 'data.brands._id': new ObjectId(brandId) }, {
            $set: {
                'data.$[dataElem].brands.$[brandElem].brand': brand
            }
        }, {
            arrayFilters: [
                { 'dataElem._id': new ObjectId(nameId) },
                { 'brandElem._id': new ObjectId(brandId) }
            ]
        })

        if (!result.modifiedCount) {
            return res.status(400).json(errorResponse('Invalid item'))
        }

        res.status(201).json(successResponse('Updated'))

    } catch (error) {
        next(error)
    }
}

const deleteComponents = async (req, res, next) => {
    try {
        const { nameId, brandId } = req.query
        if (!nameId || !brandId) {
            return res.status(409).json(errorResponse('Request query is missing', 409))
        }

        const title = findCurrentDataType(req.originalUrl)
        const result = await PreDataQuotationModel.updateOne({
            title, 'data._id': new ObjectId(nameId),
            'data.brands._id': new ObjectId(brandId)
        }, {
            $pull: {
                'data.$[dataElem].brands': { _id: new ObjectId(brandId) }
            }
        }, {
            arrayFilters: [
                { 'dataElem._id': new ObjectId(nameId) }
            ]
        })

        if (!result.modifiedCount) {
            return res.status(400).json(errorResponse('Invalid item'))
        }

        res.status(201).json(successResponse('Removed'))


    } catch (error) {
        next(error)
    }
}




module.exports = {
    addSingleValue, editSingleValue, deleteSingleValue, getAllValue,
    addSolutionModel, editSolutionModel, deleteSolutionModel, getAllSolutionModel,
    addComponents, editComponents, deleteComponents, getAllComponents
}