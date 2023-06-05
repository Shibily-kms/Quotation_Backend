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
        default:
            break;
    }

}


module.exports = { findCurrentDataType }