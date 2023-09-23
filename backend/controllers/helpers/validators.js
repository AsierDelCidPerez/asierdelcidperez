const config = require("../../settings/config")

const validarContrasena = password => {
    //if(!password.match(/^\S.$/)) return false
    if(password.match(config.caracteresProhibidos)) return false
    if(!password.match(/^[A-Za-z\d!@#$%^&*]*$/)) return false
    if(!password.match(/[!@#$%^&*]/)) return false
    if(!password.match(/[A-Z]/)) return false
    if(!password.match(/[a-z]/)) return false
    if(!password.match(/[0-9]/)) return false
    if(30 > password.length && password.length > 8) return true
    return false
}

const validacionDatos = ({name="Nombrevalido", apellidos="Apellidos Válidos", email="email@valido.com", password="7UzA9Jj73$B2%#KCc#2y"}) => {
    const combined = name + apellidos + email + password
    console.log(combined)
    if(combined.match(config.caracteresProhibidos)) return false
    console.log(combined)
    if(name.length === 0 || apellidos.length === 0) return false
    // console.log("Oki")
    if(!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) return false
    // console.log("oki 2")
    if(validarContrasena(password)) return true
    return false
}
 

module.exports = {validacionDatos}