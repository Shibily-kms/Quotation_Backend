const mongoose = require('mongoose');
const Schema = mongoose.Schema

const customerSchema = new mongoose.Schema(
    {
        cid: {
            type: String,
            required: true
        },
        first_name: {
            type: String,
            required: true
        },
        last_name: {
            type: String
        },
        star_rate: {
            type: Number
        },
        care_of_id: {
            type: String
        },
        address: {
            address: {
                type: String
            },
            place: {
                type: String
            },
            post: {
                type: String
            },
            pin_code: {
                type: String
            },
            district: {
                type: String
            },
            state: {
                type: String
            },
            land_mark: {
                type: String
            },
            map_url: {
                type: String
            }
        },
        contact1: {
            country_code: {
                type: String,
                required: true
            },
            number: {
                type: String,
                required: true
            },
            sms: {
                type: Boolean,
                required: true
            }
        },
        contact2: {
            country_code: {
                type: String
            },
            number: {
                type: String
            },
            sms: {
                type: Boolean
            }
        },
        whatsapp1: {
            country_code: {
                type: String
            },
            number: {
                type: String
            },
            sms: {
                type: Boolean
            }
        },
        zone: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'purifier_zone_list'
        },
        total_reward_amount: {
            type: Number
        },
        credit_amount: {
            type: Number
        },
        debit_amount: {
            type: Number
        },
        purifier_customer_status: {
            type: String
        },
        package_id: {
            type: String
        },
        package_installation: {
            type: Boolean
        },
        purifier_details: {
            product_id: {
                type: Schema.Types.ObjectId
            },
            product_usage: {
                type: String
            },
            product_price_at_install: {
                type: Number
            },
            installed_by: {
                type: Schema.Types.ObjectId
            },
            installed_at: {
                type: String
            },
            installation_srl_no: {
                type: String
            },
            last_reinstallation_date: {
                type: String
            },
            last_reinstallation_srl_no: {
                type: String
            },
            spare_list: [{
                spare_id: {
                    type: String
                },
                name: {
                    type: String
                },
                type: {
                    type: String
                },
                category: {
                    type: String
                },
                expire_date: {
                    type: String
                }
            }],
            next_periodical_service_date: {
                type: String
            },
            technician_last_visited_date: {
                type: String
            },
            package_id: {
                type: String
            },
            package_started_date: {
                type: String
            },
            package_expiry_date: {
                type: String
            },
            pkg_start_srl_number: {
                type: String
            },
            carbon_filter_start_date: {
                type: String
            },
            carbon_filter_expiry_date: {
                type: String
            },
            bill_received_date: {
                type: String
            },
            service_count: [{
                status: {
                    type: Boolean
                },
                srl_number: {
                    type: String
                },
                cancel_reason: {
                    type: String
                }
            }],
            complaint_count: [{
                status: {
                    type: Boolean
                },
                srl_number: {
                    type: String
                },
                cancel_reason: {
                    type: String
                }
            }],
            ssp_card_number: {
                type: String
            },
            pending_ssp_token: {
                type: Number
            },
            creation_type: {
                type: String
            },
            enquiry_srl_no: {
                type: String
            },
            enquiry_type: {
                type: String
            },
            who_collected_the_enquiry: {
                type: String
            },
            care_of_id: {
                type: String
            },
            care_of_whom: {
                type: String
            }
        },
        wh_customer_status: {
            type: String
        },
        whole_house_details: {
            product_id: {
                type: Schema.Types.ObjectId
            },
            product_price_at_install: {
                type: Number
            },
            spare_list: [{
                spare_id: {
                    type: String
                },
                name: {
                    type: String
                },
                type: {
                    type: String
                },
                category: {
                    type: String
                },
                expire_date: {
                    type: String
                }
            }],
            installed_at: {
                type: String
            },
            installation_srl_no: {
                type: String
            },
            installed_by: {
                type: Schema.Types.ObjectId
            },
            last_reinstallation_srl_no: {
                type: String
            },
            last_reinstallation_date: {
                type: String
            },
            package_started_date: {
                type: String
            },
            package_expiry_date: {
                type: String
            },
            next_periodical_service_date: {
                type: String
            },
            technician_last_visited_date: {
                type: String
            },
            bill_received_date: {
                type: String
            },
            service_count: {
                type: Number
            },
            complaint_count: {
                type: Number,
            },
            creation_type: {
                type: String
            },
            enquiry_srl_no: {
                type: String
            },
            enquiry_type: {
                type: String
            },
            enquiry_collected_staff: {
                type: String
            },
            enquiry_collected_cid: {
                type: String
            },
            care_of_srl: {
                type: String
            },
            adz_type: {
                type: String
            },
            last_refilling_date: {
                type: String
            },
            last_refilled_by: {
                type: Schema.Types.ObjectId
            }
        },
        nature_of_customer: [{
            type: {
                type: String,
                required: true
            },
            title: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true
            }
        }],
        profile_image: {
            key: {
                type: String
            },
            url: {
                type: String
            }
        },
        remark: [{
            type: {
                type: String,
                required: true
            },
            title: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true
            }
        }],
        purifier_work_description: [
            {
                date: Date,
                description: String,
                by: String,
                by_id: Schema.Types.ObjectId
            }
        ]
    },
    {
        timestamps: true
    })

const CustomerModel = mongoose.model('customer_detail', customerSchema)
module.exports = CustomerModel