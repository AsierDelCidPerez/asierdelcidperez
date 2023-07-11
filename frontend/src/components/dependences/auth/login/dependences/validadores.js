
export const validarTexto = texto => {
    if(texto && texto.length > 0) return true
    return false
}

export const validarContrasena = contrasena => {
    //if(!contrasena.match(/^\S.$/)) return false
    if(!contrasena.match(/^[A-Za-z\d!@#$%^&*]*$/)) return false
    if(!contrasena.match(/[!@#$%^&*]/)) return false
    if(!contrasena.match(/[A-Z]/)) return false
    if(!contrasena.match(/[a-z]/)) return false
    if(!contrasena.match(/[0-9]/)) return false
    if(30 > contrasena.length && contrasena.length > 8) return true
    return false
}


export const validacionCodigoSexaNumerico = codigo => {
    if(!codigo.match(/^[0-9]{6}$/)) return false
    return true
}

export const validacionDatos = ({name="Nombrevalido", apellidos="Apellidos Válidos", email="email@valido.com", password="7UzA9Jj73$B2%#KCc#2y"}) => {
    if(name.length === 0 || apellidos.length === 0) return false
    // console.log("Oki")
    if(!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) return false
    // console.log("oki 2")
    if(validarContrasena(password)) return true
    return false
}

export const validarEmail = email => {
    return email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
}


