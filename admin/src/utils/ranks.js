const rights = {
    adminUser: [
        "readUser", // Ver información de un usuario del tenant
        "addUser", // Agergar un usuario al tenant
        "listUsers", // Obtener todos los usuarios del tenant
        "editUser", // Editar solo nombre, apellidos o foto de perfil de un usuario del tenant
        "operateUser", // Editar solo correo o contraseña de un usuario del tenant
        "blockUser", // Bloquear un usuario del tenant
        "seeStatistics" // Ver estadisticas acerca de los usuarios
    ],
    adminAPI: [
        "addSubscriptionUnlimited", // Agregar suscripcion gratuitamente de uso ilimitado
        "listServices", // Obtener todos los servicios que ofrece el tenant
        "readSubscription", // Ver la información de una suscripción
        "editSubscription", // Editar la información de una suscripción
        "renewSubscription", // Renovar suscripción
        "manageSubscription", // 
        "seeStatistics", // Ver estadísticas de uso de las suscripciones
        "addTenant", // Agregar subtenant <-> si tiene feature "subTenant"
        "deleteTenant", // Eliminar subtenant <-> si tiene feature "subTenant"
        "assignSubscription", // Asignar suscripcion a un subtenant <-> si tiene feature "subTenant"
        "blockTenant" // Bloquear subtenant <-> si tiene feature "subTenant"
    ],
    adminRank: [
        "assignRank", // Asignar un rango, solo se pueden asignar aquellos rangos menores al usuario en prioridad.
        "unassignRank", // Desasginar rango, solo se pueden desasignar aquellos rangos menores al usuario en prioridad.
        "editRanks", // Editar rangos
        "listRanks", // Ver todos los rangos
        "addRank", // Crear un rango
        "deleteRank" // Eliminar un rango
    ],

    adminEmail: [
        "sendEmail", // Enviar email desde tenant.adelcidp@gmail.com
        "listEmails" // Ver todos los emails enviados desde este tenant.
    ],

    adminWeb: [
        "readWeb", // Leer la web completa, no cambios.
        "editBlog", // Editar blog, moderador de blogs, no escribe.
        "writeBlog", // Colaborador de blogs, escribe blogs, no modifica.
        "editLegal", // Edita la documentación legal.
        "editLanguage", // Editar gráfica lenguajes programacion.
        "editSkill", // Editar las aptitudes "dominio aptitudes de tecnologia",
        "editCertification", // Editar las certificaciones obtenidas (carrousel principal de la página)
        "seePurchasesStatistics", // Ver estadísticas de las ventas de suscripciones
        "detainWeb", // Detener web durante un tiempo indefinido
        "updateWeb" // Aplicar contador debido a mantenimiento/actualización, podría conllevar detenimiento de web
    ]
}

let allRights = []
for(let key in rights){
    allRights.push(...rights[key])
}


export const getEffectiveRanksOf = (...adminRank) => {
    const ranks = []
    adminRank.forEach(rank => ranks.push(...rights[rank]))
    return ranks
}

export const includeAtLeastOneRank = (ranks, container) => {
    for(let i of ranks){
        for(let j of container){
            if(i===j) return true
        }
    }
    return false
}


// allRanks contiene todos los rangos en un array con una sola dimension.

