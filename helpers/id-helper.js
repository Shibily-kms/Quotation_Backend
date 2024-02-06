const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const InstallationModel = require('../models/installation-model')
const ReInstallationModel = require('../models/reinstallation-model')
const AdminModel = require('../models/admin-model');
const { YYYYMMDDFormat } = require('./date-formate');

// const Id HELPER
const findLastNumber = async (access_label) => {
    const purifierAdminData = await AdminModel.findOne({ access_key: "Purifier" })
    const newNumber = purifierAdminData?.[access_label] + 1 || 1
    await AdminModel.updateOne({ access_key: "Purifier" },
        { $set: { [access_label]: Number(newNumber) } },
        { upsert: true }
    )

    return newNumber
}

const createInstallationSrlNumber = async () => {
    const todayServices = await InstallationModel.find({ date: YYYYMMDDFormat(new Date()) })
    if (todayServices?.[0]) {
        const index = todayServices?.length + 1
        return [`${YYYYMMDDFormat(new Date(), '')}${index}`, index]
    } else {
        return [`${YYYYMMDDFormat(new Date(), '')}1`, 1]
    }
}

const createReInstallationSrlNumber = async () => {
    const todayServices = await ReInstallationModel.find({ date: YYYYMMDDFormat(new Date()) })
    if (todayServices?.[0]) {
        const index = todayServices?.length + 1
        return [`${YYYYMMDDFormat(new Date(), '')}${index}`, index]
    } else {
        return [`${YYYYMMDDFormat(new Date(), '')}1`, 1]
    }
}

//  Package Id
const createPackageId = async (type) => {
    const lastId = await findLastNumber(`last_${type}_id`)
    return `P${(type).toUpperCase()}${lastId}`;
}




module.exports = { createInstallationSrlNumber, createPackageId, createReInstallationSrlNumber }