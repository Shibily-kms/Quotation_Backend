const URL = require('url');

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

function createQutationId(type, date, slNo) {
    let text = type === 'purifier' ? "PQ" : null

    let ISODate = new Date(date)
    let months = ISODate.getMonth() + 1
    months = months < 10 ? '0' + months : months

    return text + ISODate.getDate() + months + ISODate.getFullYear() + slNo
}


module.exports = { findCurrentDataType, createQutationId }