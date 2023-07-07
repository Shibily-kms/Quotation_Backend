const YYYYMMDDFormat = (ISOdate, symbol = '-') => {
    symbol = symbol ? symbol : ''
    const year = ISOdate.getFullYear();
    const month = String(ISOdate.getMonth() + 1).padStart(2, '0');
    const day = String(ISOdate.getDate()).padStart(2, '0');

    return `${year}${symbol}${month}${symbol}${day}`;

}

const DDMMYYYYFormat = (ISOdate, symbol = '-') => {
    symbol = symbol ? symbol : ''
    const year = ISOdate.getFullYear();
    const month = String(ISOdate.getMonth() + 1).padStart(2, '0');
    const day = String(ISOdate.getDate()).padStart(2, '0');

    return `${day}${symbol}${month}${symbol}${year}`;

}


module.exports = { YYYYMMDDFormat, DDMMYYYYFormat }