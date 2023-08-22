
module.exports = {
    token: { // 1###
        invalid: { // 14##
            invalidToken: {
                error: 'El token provisto es incorrecto o inválido.',
                errorCode: 1401
            },
            invalidTokenAdmin: {
                error: 'El token de administración provisto es incorrecto o inválido.',
                errorCode: 1402
            }
        },
        expired: { // 13##
            tokenExpired: {
                error: 'Ha expirado el tiempo seguro de validez del token.',
                errorCode: 1301
            }
        }
    },
    services: { // 2###
        notHired: { // 21##
            admin: {
                error: 'Para esta función es necesaria la API de admin. Actualice para usarla.',
                errorCode: 2101
            },
            user: {
                error: 'Para esta función es necesaria la API de user. Actualice para usarla.',
                errorCode: 2102
            },
            interfacex: {
                error: 'Para esta función es necesaria la API de interfaceX. Actualice para usarla.',
                errorCode: 2103
            },
            email: {
                error: 'Para esta función es necesaria la API de email. Actualice para usarla.',
                errorCode: 2104
            },
        }
    }
}