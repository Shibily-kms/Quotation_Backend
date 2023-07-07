function verifyQuotationInputs(data) {
    if (data && data?.type) {
        if (!data?.customer?.name || !data?.customer?.address || !data?.customer?.mobile) {
            return { status: false, message: 'Must Add Name, address and Mobile' }
        } else if (!data?.visit_date) {
            return { status: false, message: 'Add Visit Date' }
        } else {
            return { status: true }
        }
    } else {
        return { status: false, message: 'No inputs' }
    }
}

module.exports = { verifyQuotationInputs }