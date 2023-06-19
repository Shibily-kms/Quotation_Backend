function verifyQuotationInputs(data) {
    if (data && data?.type) {
        if (!data?.customer?.name || !data?.customer?.address || !data?.customer?.place || !data?.customer?.post || !data?.customer?.pin || !data?.customer?.mobile ||
            !data?.customer?.dt) {
            return { status: false, message: 'Quotation To Field not Completed' }
        } else if (!data?.visit_date) {
            return { status: false, message: 'Add Visit Date' }
        } else if (!data?.test_report?.source || !data?.test_report?.tds || !data?.test_report?.ph || !data?.test_report?.fe || !data?.test_report?.ca) {
            return { status: false, message: 'Test report Field not Completed' }
        } else if (!data?.sign?.customer?.url || !data?.sign?.authorized?.url) {
            return { status: false, message: 'Signature not Completed' }
        } else {
            return { status: true }
        }
    } else {
        return { status: false, message: 'No inputs' }
    }
}

module.exports = { verifyQuotationInputs }