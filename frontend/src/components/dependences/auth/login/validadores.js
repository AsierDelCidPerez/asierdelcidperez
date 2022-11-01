export const validarTexto = texto => {
    if(texto && texto.length > 0) return true
    return false
}

export const validarContrasena = contrasena => {
    let posible = true
    if(contrasena.length < 8) posible = false
    if(!contrasena.match(new RegExp('\W')) || !contrasena.match(new RegExp('[A-Z]')) || !contrasena.match(new RegExp('[a-z]'))) posible = false
    return posible
}

