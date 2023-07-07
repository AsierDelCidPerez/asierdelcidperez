module.exports = {
    sumarDias: (fecha, dias) => {
        fecha.setDate(fecha.getDate() + dias);
        return fecha;
    }
}