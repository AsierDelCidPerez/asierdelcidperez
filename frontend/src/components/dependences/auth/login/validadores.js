
export const validarTexto = texto => {
    if(texto && texto.length > 0) return true
    return false
}

export const validarContrasena = contrasena => {
    let posible = true
    if(contrasena.length < 8) posible = false
    if(!contrasena.match(/\W/) || !contrasena.match(/[A-Z]/) || !contrasena.match(/[a-z]/)) posible = false
    return posible
}

export const validarEmail = email => {
    return email.match(/\w+@\w+.\w+/i)
}


