

const sumarDias = (fecha, dias) => {
    fecha.setDate(fecha.getDate() + dias)
    return fecha
}


module.exports = {
    sumarDias
}