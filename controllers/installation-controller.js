const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const CustomerModel = require('../models/customer-model')
const InstallationModel = require('../models/installation-model')
const ReInstallationModel = require('../models/reinstallation-model')
const { createInstallationSrlNumber, createPackageId, createReInstallationSrlNumber } = require('../helpers/id-helper')
const { customerStatusInSmall } = require('../helpers/helper-function')
const { successResponse, errorResponse } = require('../helpers/response-helper');
const { YYYYMMDDFormat } = require('../helpers/date-formate');
const { uploadSignature } = require('../helpers/upload-image')


const doInstall = async (req, res, next) => {
    try {
        const { cid, installed_at } = req.body

        // Check required elements
        if (!cid || !installed_at ) {
            return res.status(409).json(errorResponse('Request body is missing', 409))
        }

        const findCustomer = await CustomerModel.findOne({ cid })
        if (!findCustomer?.cid) {
            return res.status(409).json(errorResponse('Invalid Customer Id', 404))
        }

        let customerAdd = {}
        let installationSrl = await createInstallationSrlNumber(installed_at)

        // Upload Signature
        if (req.body?.signature?.url) {
            // let customer = await uploadSignature(req.body?.signature?.url, `I${installationSrl[0]}`)
            req.body.sign = {
                // ...customer,
                name: req.body.customer_name
            }
        } else {
            req.body.sign = {
                name: req.body.customer_name
            }
        }

        const installationObj = {
            technician_id: req.user.id,
            installation_srl_no: `I${installationSrl[0]}`,
            index: installationSrl[1],
            date: installed_at,
            products_list: [],
            site_category: req.body.purifier_usage || null,
            extra_work_comment: req.body.mode_of_installation,
            condition_sign: req.body.sign,
            db_version: '0.5'
        }

        if (req.body.product === 'package' || req.body.product === 'purifier') {

            customerAdd = {
                ...customerAdd,
                purifier_customer_status: 'I/W',
                package_installation: req.body.product === 'package' ? true : false,
                "purifier_details.product_id": req.body.purifier_id,
                "purifier_details.product_usage": req.body.purifier_usage,
                "purifier_details.installed_by": new ObjectId(req.user.id),
                "purifier_details.installed_at": installed_at,
                "purifier_details.installation_srl_no": `I${installationSrl[0]}`,
                "purifier_details.next_periodical_service_date": YYYYMMDDFormat(new Date(new Date(installed_at).setMonth(new Date(installed_at).getMonth() + 3))),
                "purifier_details.technician_last_visited_date": installed_at,
                "purifier_details.package_id": await createPackageId(customerStatusInSmall('I/W')),
                "purifier_details.package_started_date": installed_at,
                "purifier_details.package_expiry_date": YYYYMMDDFormat(new Date(new Date(installed_at).setFullYear(new Date(installed_at).getFullYear() + 1))),
                "purifier_details.carbon_filter_start_date": installed_at,
                "purifier_details.carbon_filter_expiry_date": YYYYMMDDFormat(new Date(new Date(installed_at).setFullYear(new Date(installed_at).getFullYear() + 1))),
                "purifier_details.creation_type": 'NEW MACHINE',
            }

            installationObj.products_list.push({
                cid: req.body.cid,
                product_id: req.body.purifier_id ? new ObjectId(req.body.purifier_id) : undefined,
                product_type: 1,
                product_name: req.body.purifier_name,
                comment: req.body.pr_description
            })
        }

        if (req.body.product === 'package' || req.body.product === 'wh_filter') {

            customerAdd = {
                ...customerAdd,
                wh_customer_status: 'I/W',
                "whole_house_details.product_id": req.body.wh_id,
                "whole_house_details.installed_by": new ObjectId(req.user.id),
                "whole_house_details.installed_at": installed_at,
                "whole_house_details.installation_srl_no": `I${installationSrl[0]}`,
                "whole_house_details.technician_last_visited_date": installed_at,
                "whole_house_details.package_id": await createPackageId(customerStatusInSmall('I/W')),
                "whole_house_details.package_started_date": installed_at,
                "whole_house_details.package_expiry_date": YYYYMMDDFormat(new Date(new Date(installed_at).setFullYear(new Date(installed_at).getFullYear() + 2))),
                "whole_house_details.creation_type": 'NEW MACHINE',
            }

            installationObj.products_list.push({
                cid: req.body.cid,
                product_id: req.body.wh_id ? new ObjectId(req.body.wh_id) : undefined,
                product_type: 2,
                product_name: req.body.wh_name,
                comment: req.body.wh_description
            })
        }

        // Update Customer Details
        await CustomerModel.updateOne({ cid }, {
            $set: {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                "address.address": req.body.address,
                "address.place": req.body.place,
                'address.pin_code': req.body.pin_code,
                'address.city_id': req.body.city_id ? new ObjectId(req.body.city_id) : undefined,
                "address.land_mark": req.body.land_mark,
                'contact1.number': req.body.contact1,
                'contact2.number': req.body.contact2,
                'whatsapp1.number': req.body.whatsapp1,
                ...customerAdd
            }
        })

        // Installation DB

        await InstallationModel.create(installationObj)

        res.status(201).json(successResponse('Installation form Submitted'))

    } catch (error) {
        next(error)
    }
}

const doReInstall = async (req, res, next) => {
    try {
        const { cid } = req.body
        if (!cid) {
            return res.status(409).json(errorResponse('Request body is missing', 409))
        }

        const findCustomer = await CustomerModel.findOne({ cid })
        if (!findCustomer?.cid) {
            return res.status(409).json(errorResponse('Invalid Customer Id', 404))
        }

        let customerAdd = {}
        let reinstallationSrl = await createReInstallationSrlNumber()

        if (req.body.product === 'package' || req.body.product === 'purifier') {

            customerAdd = {
                ...customerAdd,
                "purifier_details.product_id": req.body.purifier_id,
                "purifier_details.product_usage": req.body.purifier_usage,
                "purifier_details.last_reinstallation_date": YYYYMMDDFormat(new Date()),
                "purifier_details.last_reinstallation_srl_no": `RI${reinstallationSrl[0]}`,
                "purifier_details.technician_last_visited_date": YYYYMMDDFormat(new Date())

            }
        }

        if (req.body.product === 'package' || req.body.product === 'wh_filter') {

            customerAdd = {
                ...customerAdd,
                wh_customer_status: 'I/W',
                "whole_house_details.product_id": req.body.wh_id,
                "whole_house_details.last_reinstallation_date": YYYYMMDDFormat(new Date()),
                "whole_house_details.last_reinstallation_srl_no": `RI${reinstallationSrl[0]}`,
                "whole_house_details.technician_last_visited_date": YYYYMMDDFormat(new Date()),

            }
        }

        // Update Customer Details
        const updateCustomer = await CustomerModel.updateOne({ cid }, {
            $set: {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                "address.address": req.body.address,
                "address.place": req.body.place,
                'address.pin_code': req.body.pin_code,
                'address.city_id': req.body.city_id ? new ObjectId(req.body.city_id) : undefined,
                "address.land_mark": req.body.land_mark,
                'contact1.number': req.body.contact1,
                'contact2.number': req.body.contact2,
                'whatsapp1.number': req.body.whatsapp1,
                ...customerAdd
            }
        })

        // Upload Signature
        if (req.body?.signature?.url) {
            let customer = await uploadSignature(req.body?.signature?.url, `RI${reinstallationSrl[0]}-test`)
            req.body.sign = {
                ...customer,
                name: req.body.customer_name
            }
        } else {
            req.body.sign = {
                name: req.body.customer_name
            }
        }

        const reInstallationObj = {
            cid: req.body.cid,
            rework_srl_no: `RI${reinstallationSrl[0]}`,
            index: reinstallationSrl[1],
            product_type: req.body.product === 'purifier' ? 1 : 2,
            date: YYYYMMDDFormat(new Date()),
            work_type: 're-installation',
            product_id: req.body.purifier_id ? new ObjectId(req.body.purifier_id) : req.body.wh_id ? new ObjectId(req.body.wh_id) : undefined,
            site_category: req.body.purifier_usage || null,
            description: req?.body?.purifier_usage || req?.body?.wh_description || '',
            technician: req.user.id,
            received_amount: req.body?.amount ? {
                amount: req.body.amount,
                method: 'CASH'
            } : undefined,
            db_version: '0.5',
            product_name: req?.body?.purifier_name || req?.body?.wh_name,
            condition_sign: req.body.sign,
        }

        await ReInstallationModel.create(reInstallationObj)

        res.status(201).json(successResponse('ReInstallation form Submitted'))

    } catch (error) {
        next(error)
    }
}


module.exports = { doInstall, doReInstall }