module.exports = {
    expirePeriodInDays: 30,
    allowedKeysToEdit: [
        "name", 
        "apellidos",
        "imageIcon"
    ],
    caracteresProhibidos: "[\|?]" // Se analiza a través de RegEx incluir en el mismo string. Debe ser parámetro RegEx
}