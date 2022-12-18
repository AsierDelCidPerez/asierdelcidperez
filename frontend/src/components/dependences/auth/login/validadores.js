
export const validarTexto = texto => {
    if(texto && texto.length > 0) return true
    return false
}

export const validarContrasena = contrasena => {
    if(!contrasena.match(/\W+/)) return false
    if(!contrasena.match(/[A-Z]+/)) return false
    if(!contrasena.match(/[a-z]+/)) return false
    if(!contrasena.match(/[0-9]+/)) return false
    if(30 > contrasena.length && contrasena.length > 8) return true
    return false
}


export const validarEmail = email => {
    return email.match(/\w+@\w+.\w+/i)
}


