function setCurrency(price) {
    return price.toLocaleString("id-ID", { style: "currency", currency: "IDR" })
}

function setNumber(number) {
    return new Intl.NumberFormat().format(number)
}

module.exports = {
    setCurrency,
    setNumber,
}