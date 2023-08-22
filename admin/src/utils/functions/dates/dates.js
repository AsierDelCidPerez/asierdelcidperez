const sumarDias = (date, dias) => {
    date.setDate(date.getDate() + dias)
    return date
}

module.exports = {
    sumarDias
}