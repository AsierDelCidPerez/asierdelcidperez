const validarContrasena = password => {
    if(!password.match(/\W/)) return false
    if(!password.match(/[A-Z]/)) return false
    if(!password.match(/[a-z]/)) return false
    if(!password.match(/[0-9]/)) return false
    if(30 > password.length && password.length > 8) return true
    return false
}

const validacionDatos = ({name="Nombrevalido", apellidos="Apellidos Válidos", email="email@valido.com", password="Cont.$tras3n1a^SeG_ura"}) => {
    if(name.length <= 0 && apellidos.length <= 0) return false
    // console.log("Oki")
    if(!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) return false
    // console.log("oki 2")
    if(validarContrasena(password)) return true
    return false
}

module.exports = {validacionDatos}