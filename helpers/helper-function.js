const URL = require('url');
const { DDMMYYYYFormat } = require('./date-formate')

function findCurrentDataType(url) {
    const parsedUrl = URL.parse(url);
    const urlWithoutQuery = parsedUrl.pathname;

    switch (urlWithoutQuery) {
        case '/water-test-report-source':
            return 'WATER_TEST_REPORT_SOURCE'

        case '/work-sites':
            return 'WORK_SITES'

        case '/water-usage':
            return 'WATER_USAGES'

        case '/installation-mode':
            return 'INSTALLATION_MODE'

        case '/purifier-component':
            return 'PURIFIER_COMPONENTS'

        case '/purifier-solution-model':
            return 'PURIFIER_SOLUTION_MODELS'

        case '/wh-solution-model':
            return 'WH_SOLUTION_MODELS'

        case '/vfs-component':
            return 'VFS_COMPONENT'

        case '/vfs-materials':
            return 'VFS_MATERIALS'

        default:
            break;
    }

}

function createQuotationId(type, ISOdate, index) {
    let text = null
    switch (type) {
        case 'purifier':
            text = 'PQ'
            break;

        case 'whole-house':
            text = 'WHQ'
            break;

        case 'wh-and-purifier':
            text = 'WHPQ'
            break;

        default:
            break;
    }

    let date = DDMMYYYYFormat(ISOdate, '')

    return text + date + index
}


const customerStatusInSmall = (status) => {
    switch (status) {
        case 'I/W':
            return 'iw'
        case 'O/W':
            return 'ow'
        case 'O/C':
            return 'oc'
        case 'AMC':
            return 'amc'
        case 'SSP':
            return 'ssp'
        default:
            break;
    }
}


module.exports = { findCurrentDataType, createQuotationId, customerStatusInSmall }