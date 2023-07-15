
const userRouter = require('express').Router()
const user = require('../model/User')
const bcrypt = require('bcrypt')
require('dotenv').config()
const jwt = require('jsonwebtoken')
// const settings = require('../utils/settings')
const {existeUsuario} = require('./helpers/users')
const { sumarDias } = require('../utils/fechas')
const { validacionToken } = require('../modules/token')
const { validacionDatos } = require('./helpers/validators')
const {getFunctionsForSubscription} = require('./subscriptions')
const ten = require('../model/Tenant')
const Tenant = require('../model/Tenant')
const { registrarUsuarioEnTenant } = require('./tenants')
const {enviarMensaje, validarEmail} = require('./emails')
const AuthToken = require('../model/AuthToken')


const generateTokenForValidation = async (subId) => {
    const banco = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let aleatoria = "";
    for (let i = 0; i < 20; i++) {
        aleatoria += banco.charAt(Math.floor(Math.random() * banco.length));
    }
    const myAuthToken = await AuthToken.findOne({value: aleatoria, tenant: subId})
    if(myAuthToken !== null || myAuthToken) aleatoria = generateTokenForValidation(subId)
    return aleatoria;
}


const subValidUser = sub => {
    if(!sub.tenant.features.includes('user')) return false
    return true
}

const subValidFlux = sub => {
    if(!sub.tenant.features.includes('flux')) return false
    return true
}

const getTokenByUser = (usuario, ip) => {
    return {
        value: {
            name: usuario.name, 
            apellidos: usuario.apellidos, 
            email: usuario.email, 
            tenant: usuario.tenant.nameId, 
            rank: usuario.rank, 
            blocked: usuario.blocked,
            imageIcon: usuario.imageIcon
        }, 
        date: new Date(), 
        ip
    }
}

const subValidEmail = sub => {
    if(!sub.tenant.features.includes('email')) return false
    return true
}

const validarSubscription = async (req, res) => {
    const {sub, isUsable, useSubscription} = await getFunctionsForSubscription(req.get('Subscription'))
    try{
        if(!(await isUsable(req))){
            res.status(401).send({error: 'Su suscripción es inválida, probablemente haya expirado o rebasado el límite de llamadas adquirido.', date: new Date()})
            return false
        }

        if(!subValidUser(sub)){
            res.status(401).send({error: 'Su suscripción no incluye la API de user. Actualice para incluirla.', date: new Date()})
            return false
        }
    }catch(e) {
        res.status(401).send({error: 'Su suscripción no es válida.', date: new Date()})
        return false
    }
    return {useSubscription, sub}
}


const uniqueForTenant = async (email, sub) => { //El usuario debe ser único por tenant pues se registra por tenant. En mi web no podrán iniciar sesión aquellos que sean de otro tenant.
    const tenant = await ten.findOne({value: sub.tenant.id}).populate('users')
    const emails = tenant.users.map(user => user.email)
    return !emails.includes(email)
}


const cambiarPassword = async (req, res, myUser) => {
    const {oldPassword, newPassword} = req.body
    if(await bcrypt.compare(oldPassword, myUser.passwordHash)){
        if(oldPassword === newPassword){
            res.status(400).send({error: "No puedes usar la misma contraseña que tenías", date: new Date()})
            return
        }
        if(validacionDatos({password: newPassword})){
            const nPasswordEnc = await bcrypt.hash(newPassword, 10)
            myUser.passwordHash = nPasswordEnc
            await myUser.save()
            res.status(200).send({changedPassword: true, email: myUser.email, date: new Date()})
        }else{
            res.status(400).send({changedPassword: false, error: "La nueva contraseña no cumple con los estándares de seguridad", date: new Date()})
        }
    }else{
        res.status(400).send({changedPassword: false, error: "La contraseña es incorrecta", date: new Date()})
    }
}


userRouter.get('/exists', async(req, res) => {
    const {useSubscription} = await validarSubscription(req, res)
    if(useSubscription === undefined) return
    const email = req.body.email
    usuario = await existeUsuario(email, sub.tenant.id)
    usuario !== false ? res.status(200).send(usuario) : res.status(400).send({exists: false})
    await useSubscription()
})

userRouter.put('/changePassword', async(req, res) => {
    const {useSubscription, sub} = await validarSubscription(req, res)
    if(useSubscription === undefined) return
    await useSubscription()
    const token = jwt.verify(req.get('Authorization'), process.env.SECRET)
    const value = token.value
    const {oldPassword, newPassword} = req.body
    if(!(await validacionToken(token, req, sub))) {
        res.status(401).send({reset: true, error: "Token inválido o incorrecto", date: new Date()})
        return
    }

    const myUser = await user.findOne({email: value.email, tenant: sub.tenant.id})
    await cambiarPassword(req, res, myUser)
})

userRouter.put('/changePasswordByRemember', async(req, res) => {
    const {useSubscription, sub} = await validarSubscription(req, res)
    if(useSubscription === undefined) return
    if(!subValidFlux(sub)){
        res.status(401).send({error: 'Su suscripción no incluye la API de CORE (antiguo flux). Actualice para incluirla.', date: new Date()})
        return
    }

    if(!subValidEmail(sub)){
        res.status(401).send({error: 'Su suscripción no incluye la API de email. Actualice para incluirla.', date: new Date()})
        return
    }
    await useSubscription()
    const {tokenValidacion, nPass} = req.body
    let token, verifiedEmailForChangePassword, email, date
    try{
        token = jwt.verify(tokenValidacion, process.env.SECRET)
        verifiedEmailForChangePassword = token.verifiedEmailForChangePassword
        email = token.email
        date = token.date
    }catch (e) {
        res.status(401).send({error: 'El token de validación es incorrecto'})
        return
    }
    if(verifiedEmailForChangePassword){
        if(validacionDatos({password: nPass})){
            if(new Date() <= new Date(new Date(date).getTime()+1800000)){
                // console.log(email)
                // console.log(sub.tenant.id)
                const myUser = await user.findOne({email, tenant: sub.tenant.id})
                if(await bcrypt.compare(nPass, myUser.passwordHash)){
                    res.status(400).send({error: 'La contraseña no puede ser la misma que la anterior.', date: new Date()})
                    return
                }
                const newPass = await bcrypt.hash(nPass, 10)
                myUser.passwordHash = newPass
                await myUser.save()
                res.status(200).send({changedPassword: true, date: new Date()})
            }else{
                res.status(400).send({verify: true, error: 'Ha expirado el límite de tiempo, debe verificar nuevamente su email.'})
                return
            }
        }else{
            res.status(400).send({error: 'La contraseña no se ajusta a los estándares de seguridad'})
            return
        }
    }else{
        res.status(401).send({error: 'El token es inválido o incorrecto'})
        return
    }
})

userRouter.post('/verify-email', async(req, res) => {
    const {useSubscription, sub} = await validarSubscription(req, res)
    if(!subValidFlux(sub)){
        res.status(401).send({error: 'Su suscripción no incluye la API de CORE (antiguo flux). Actualice para incluirla.', date: new Date()})
        return
    }

    if(!subValidEmail(sub)){
        res.status(401).send({error: 'Su suscripción no incluye la API de email. Actualice para incluirla.', date: new Date()})
        return
    }
    await useSubscription()

    const {tokenValidacion, vCodigo} = req.body
    let token = ""
    let codigo, date, email = ""
    try{
        token = jwt.verify(tokenValidacion, process.env.SECRET)
        codigo = token.codigo
        date = token.date
        email = token.email
    }catch(e){
        res.status(401).send({error: 'El token de validación es incorrecto'})
        return
    }
    if(await bcrypt.compare(vCodigo, codigo)){
        if(new Date() <= new Date(new Date(date).getTime()+1800000)){
            console.log(email)
            const tokenValidacion = jwt.sign({verifiedEmailForChangePassword: true,email, date: new Date()}, process.env.SECRET)
            res.status(200).send({verified: true, tokenValidacion, email})   
        }else{
            const orCodigo = generarCodigo(6)
            const newCodigo = await bcrypt.hash(orCodigo, 10)
            const tokenValidacion = jwt.sign({email: myEmail, codigo: newCodigo, date: new Date()}, process.env.SECRET)
            const html = `<p>Hemos detectado que desea registrarse con este correo: <strong>${value.email}</strong>. Para ello necesitar&aacute; hacer uso del c&oacute;digo de verificaci&oacute;n que le ser&aacute; solicitado por la p&aacute;gina web. El siguiente c&oacute;digo de seguridad es de un solo uso, es solamente v&aacute;lido durante los 30 minutos posteriores a su generaci&oacute;n. Al ser un c&oacute;digo confidencial, no debe compartirse con nadie. A continuaci&oacute;n encuentra el c&oacute;digo:</p><br/><p style="text-align: center;"><span style="font-size:26px;"><strong>${orCodigo}</strong></span></p><br/><p>Si necesita ayuda de cualquier tipo, no dude en ponerse en contacto con nosotros mediante nuestro correo: <a href="mailto:general.adelcidp@gmail.com?subject=Verificaci%C3%B3n%20del%20correo&amp;body=Necesito%20ayuda%20con%20la%20verificaci%C3%B3n%20del%20correo%20electr%C3%B3nico%20a%20la%20hora%20de%20registrar%20mi%20cuenta%20en%20la%20web.">general.adelcidp@gmail.com</a>.</p><br/><p>Muchas gracias.</p>`
            await enviarMensaje(null, value.email, 'Verificación de email', null, html)
            res.status(401).send({verify: true, error: 'El código de verificación ha expirado. Acabamos de enviar otro.', tokenValidacion})
        }
    }else{
        res.status(401).send({error: 'El código de verificación es incorrecto', date: new Date()})
    }
})

userRouter.post('/rememberPassword', async(req, res) => {
    const {useSubscription, sub} = await validarSubscription(req, res)
    if(useSubscription === undefined) return

    if(!subValidFlux(sub)){
        res.status(401).send({error: 'Su suscripción no incluye la API de CORE (antiguo flux). Actualice para incluirla.', date: new Date()})
        return
    }

    if(!subValidEmail(sub)){
        res.status(401).send({error: 'Su suscripción no incluye la API de email. Actualice para incluirla.', date: new Date()})
        return
    }
    await useSubscription()
    const {email} = req.body
    if(!validacionDatos({email})) {
        res.status(400).send({error: 'El correo introducido no es válido.', date: new Date()})
        return
    }
    const codigoGen = generarCodigo(6)
    const codigo = await bcrypt.hash(codigoGen, 10)
    const token = jwt.sign({email, date: new Date(), codigo}, process.env.SECRET)
    await validarEmail(email, codigoGen)
    res.status(200).send({
        token, verify: true
    })
})

userRouter.put('/edit', async(req, res) => {
    const {useSubscription, sub} = await validarSubscription(req, res)
    await validarSubscription(req, res)
    const token = jwt.verify(req.get('Authorization'), process.env.SECRET)
    if(useSubscription === undefined) return
    await useSubscription()

    // console.log(token)
    // console.log(sub.id)

    if(!(await validacionToken(token, req, sub))){
        res.status(401).send({error: "Token inválido o incorrecto", date: new Date()})
    return
    }

    // console.log(token)
    // console.log("Tenant | " + sub.tenant)
    if(!validacionDatos(req.body)){
        res.status(400).send({error: 'Los datos no se ajustan al formato correcto', date: new Date()})
        return
    }

    const dataUser = {}

    for(let k in req.body){
        if(k === 'name' || k === 'apellidos' || k === 'imageIcon'){
            if(req.body[k]){
                dataUser[k] = req.body[k]
            }
        }else{
            res.status(400).send({error: 'Error en la petición', date: new Date()})
        }
    }
    
    console.log(dataUser)

    const myUser = await user.findOneAndUpdate({email: token.value.email, tenant: sub.tenant.id}, dataUser, {new: true})
    if(myUser === false) {
        res.status(400).send({error: {
            code: 125,
            description: "Token mal configurado"
        }, date: new Date()})
        return
    }

    const newToken = jwt.sign(getTokenByUser(myUser, token.ip), process.env.SECRET)
    try{
    await myUser.save()
    }catch(e) {
        ServiceWorkerRegistration.status(500).send({error: 'Se ha producido un error', date: new Date()})
    }
    res.status(202).send({changed: true, 
        token: newToken,
        newData: {
            email: myUser.email,
            name: myUser.name,
            apellidos: myUser.apellidos,
            imageIcon: myUser.imageIcon,
        }
    })
})

userRouter.post('/auth/token', async(req, res) => {
    const {useSubscription, sub} = await validarSubscription(req, res)
    await validarSubscription(req, res)
    if(useSubscription === undefined) return
    await useSubscription()
    const token = await generateTokenForValidation(sub.tenant.id)
    const auth = {
        value: token,
        tenant: sub.tenant.id,
        date: new Date().getTime().toString(),
        validated: false,
        email: ''
    }
    // console.log("OK")
    const myNewToken = new AuthToken(auth)
    const myToken = jwt.sign(auth, process.env.SECRET)
    try{
        await myNewToken.save()
        res.status(200).send({token: myToken})
        return
    } catch(e){
        console.error(e)
        res.status(400).send({error: e, date: new Date()})
        return
    }
})

userRouter.post('/auth/verify', async(req, res) => {
    const {tokenAuth} = req.body
    const {useSubscription, sub} = await validarSubscription(req, res)
    try{
        await validarSubscription(req, res)
        if(useSubscription === undefined) return
        await useSubscription()
        const {value, tenant, date} = jwt.verify(tokenAuth, process.env.SECRET)
        const myToken = await AuthToken.findOne({value, tenant})
        if(new Date() > new Date(parseInt(date)+1800000)){
            res.status(400).send({error: 'El token de autenticación ha expirado.', date: new Date()})
            return
        }

        if(myToken.validated){
            const usuario = await user.findOne({email: myToken.email, tenant: sub.tenant.id})
            const ip = await bcrypt.hash(req.ip, 10)
            const token = getTokenByUser(usuario, ip)
            if(subValidFlux(sub)){
                res.status(200).send({token, name: usuario.name, apellidos: usuario.apellidos, email: usuario.email, imageIcon: usuario.imageIcon})
            }else{
                res.status(200).send({name: usuario.name, apellidos: usuario.apellidos, email: usuario.email, imageIcon: usuario.imageIcon})
            }
            AuthToken.findOneAndDelete({value, tenant})
        }else{
            res.status(400).send({error: 'El usuario no ha iniciado sesión', date: new Date()})
        }
    }catch (e) {
        res.status(400).send({error: 'El token de autenticación es inválido.', date: new Date()})
    }

})

userRouter.post('/auth/login', async(req, res) => {
    const {email, password, tokenAuth} = req.body
    try{
        const {value, tenant, date} = jwt.verify(tokenAuth, process.env.SECRET)
        const {useSubscription, sub} = await validarSubscription(req, res)
        console.log(`${email} ${tenant}`)
        const usuario = await existeUsuario(email, tenant)
    
        // console.log(tenant)
        if(new Date() > new Date(parseInt(date)+1800000)){
            res.status(404).send({error: 'El token de autenticación ha expirado', date: new Date()})
            return
        }
        // console.log("Usuario " + usuario)
        if(usuario === false){
            res.status(404).send({error: 'No existe el email especificado', date: new Date()})
            return
        }
        if(useSubscription === undefined) return
        await useSubscription()
        if(usuario?.blocked?.value !== -1){
            /*
                -1 -> Activo
                -2 -> Bloqueado
                (fecha en int) -> Bloqueo temporal hasta dicha fecha
            */
            const fechaActual = new Date()
            if(usuario.blocked.value === -2){
                res.status(401).send({error: "Ha sido bloqueado permanentemente. Causa: " + usuario.blocked.reason})
                return
            }
            if(new Date(usuario.blocked.value) <= fechaActual){
                usuario.blocked = {
                    value: -1,
                    reason: ""
                }
                await usuario.save()
            }else{
                const fechaBloqueo = new Date(usuario.blocked.value)
                res.status(401).send({error: `Ha sido bloqueado hasta el ${fechaBloqueo.getDate()}/${fechaBloqueo.getMonth()+1}/${fechaBloqueo.getFullYear()}. Causa: ${usuario.blocked.reason}`})
                return
           }
        }
        if(await bcrypt.compare(password, usuario.passwordHash)){
                if(subValidFlux(sub)){
                    res.status(200).send({token: tokenAuth, name: usuario.name, apellidos: usuario.apellidos, email: usuario.email, imageIcon: usuario.imageIcon})
                }else{
                    res.status(200).send({name: usuario.name, apellidos: usuario.apellidos, email: usuario.email, imageIcon: usuario.imageIcon})
                }
                await AuthToken.findOneAndUpdate({value, tenant: tenant}, {validated: true, email: usuario.email}, {new: true})
        }else{
            res.status(404).send({error: 'La contraseña es incorrecta', date: new Date()})
        }
    }catch(e){
        res.status(400).send({error: 'Debe proveer un token de autenticación', date: new Date()})
    }

})


userRouter.put('/edit/:ajuste', async(req, res) => {
    const {useSubscription, sub} = await validarSubscription(req, res)
    await validarSubscription(req, res)
    const ajuste = req.params.ajuste
    const token = jwt.verify(req.get('Authorization'), process.env.SECRET)
    if(useSubscription === undefined) return
    await useSubscription()
    if(!(await validacionToken(token, req, sub))){
        res.status(401).send({error: "Token inválido o incorrecto", date: new Date()})
        return
    }
    const {[ajuste]: newValue, tokenValidacion=null, vCodigo=null} = req.body
    if(ajuste === "passwordHash") {res.status(405).send({error: {
        code: 324,
        description: "Método no disponible en esta dirección de API",
    }, date: new Date()})
    return
    }
    const availabeAjustes = ["name", "apellidos", "email", "imageIcon"]
    const myEmail = token.value.email
   // console.log(myEmail + " " + newValue)
    if(!availabeAjustes.includes(ajuste)){
        res.status(405).send({error: {
            code: 324,
            description: "Método no disponible en esta dirección de API"
        }, date: new Date()})
        return
    }

    if(!validacionDatos(req.body)){
        res.status(400).send({error: 'Los datos no se ajustan al formato correcto', date: new Date()})
        return
    }
    if(ajuste === 'email' && tokenValidacion === null){
        if(!(await uniqueForTenant(newValue, sub))){
            res.status(400).send({error: 'El email ya está en uso', date: new Date()})
            return
        }
    }
    const ip = await bcrypt.hash(req.ip, 10)

    // console.log(token)
    if(sub.tenant.aditionals.mfa && subValidEmail(sub) && subValidFlux(sub)){
        if(tokenValidacion !== null){
            try{
                const {value, codigo, date} = jwt.verify(tokenValidacion, process.env.SECRET)
                if(new Date() <= new Date(new Date(date).getTime()+1800000)){
                    if(await bcrypt.compare(vCodigo, codigo)){
                        const myUser = await user.findOneAndUpdate({email: myEmail, tenant: sub.tenant.id}, value.newValue, {new: true})
                        const nToken = jwt.sign(getTokenByUser(myUser, ip), process.env.SECRET) 
                        res.status(200).send({changed: true, token: nToken, newData: {
                            email: myUser.email,
                            imageIcon: myUser.imageIcon,
                            name: myUser.name,
                            apellidos: myUser.apellidos
                        }})
                    }else{
                        res.status(400).send({error: 'El código de verificación es incorrecto', date: new Date()})
                    }
                }else{
                    const orCodigo = generarCodigo(6)
                    // console.log(orCodigo)
                    const codigo = await bcrypt.hash(orCodigo, 10)
                    const nToken = jwt.sign({
                        verify: true, 
                        value: {
                            email: myEmail,
                            newValue: {
                                [ajuste]: newValue
                            }
                        },
                        codigo,
                        date: new Date()
                    }, process.env.SECRET)
                    try{
                        await validarEmail(newValue, orCodigo)
                    }catch(e){
                        res.status(400).send({error: 'Ha ocurrido un error al enviar el email de verificación', date: new Date()})
                    }
                    res.status(400).send({verify: true, tokenValidacion: nToken, email: myEmail, error: 'Ha excedido el límite de tiempo para verificar su email. Hemos enviado otro email.'})
                    return
                }
            }catch (e){
                console.error(e)
                res.status(401).send({error: 'El token es inválido', date: new Date()})
            }
        }else{
            const orCodigo = generarCodigo(6)
            const codigo = await bcrypt.hash(orCodigo, 10)
            const tokenValidacion = jwt.sign({
                verify: true, 
                value: {
                    email: myEmail,
                    newValue: {
                        [ajuste]: newValue
                    }
                },
                codigo,
                date: new Date()
            }, process.env.SECRET)
            try{
                await validarEmail(newValue, orCodigo)
            }catch(e){
                res.status(400).send({error: 'Ha ocurrido un error al enviar el email de verificación', date: new Date()})
            }
            res.status(200).send({verify: true, tokenValidacion, email: myEmail})
            return
        }
    }else{
        const myUser = await existeUsuario(myEmail, sub.tenant.id)
        if(myUser === false) {
            res.status(400).send({error: {
                code: 125,
                description: "Token mal configurado"
            }, date: new Date()})
            return
        }
        myUser[ajuste] = newValue

        const nToken = getTokenByUser(myUser, ip)

        // const nToken = jwt.sign({value: {name: myUser.name, apellidos: myUser.apellidos, email: myUser.email, tenant: myUser.tenant.nameId, rank: myUser.rank, blocked: myUser.blocked}, date: new Date(), ip}, process.env.SECRET)

        const newToken = jwt.sign(nToken, process.env.SECRET)
        myUser[ajuste] = newValue
        await myUser.save()
        res.status(202).send({changed: true, token: newToken, newData: {
            email: myUser.email,
            imageIcon: myUser.imageIcon,
            name: myUser.name,
            apellidos: myUser.apellidos
        }})
    }
})

userRouter.post('/login', async(req, res) => {
    const {email, password} = req.body
    const {useSubscription, sub} = await validarSubscription(req, res)
    const usuario = await existeUsuario(email, sub.tenant.id)
    // console.log("Usuario " + usuario)
    if(usuario === false){
        res.status(404).send({error: 'No existe el email especificado', date: new Date()})
        return
    }
    if(useSubscription === undefined) return
    await useSubscription()
    if(usuario?.blocked?.value !== -1){
        /*
            -1 -> Activo
            -2 -> Bloqueado
            (fecha en int) -> Bloqueo temporal hasta dicha fecha
        */
        const fechaActual = new Date()
        if(usuario.blocked.value === -2){
            res.status(401).send({error: "Ha sido bloqueado permanentemente. Causa: " + usuario.blocked.reason})
            return
        }
        if(new Date(usuario.blocked.value) <= fechaActual){
            usuario.blocked = {
                value: -1,
                reason: ""
            }
            await usuario.save()
        }else{
            const fechaBloqueo = new Date(usuario.blocked.value)
            res.status(401).send({error: `Ha sido bloqueado hasta el ${fechaBloqueo.getDate()}/${fechaBloqueo.getMonth()+1}/${fechaBloqueo.getFullYear()}. Causa: ${usuario.blocked.reason}`})
            return
       }
    }
    if(await bcrypt.compare(password, usuario.passwordHash)){
            const ip = await bcrypt.hash(req.ip, 10)
            const token = jwt.sign(getTokenByUser(usuario, ip), process.env.SECRET)
            if(subValidFlux(sub)){
                res.status(200).send({token, name: usuario.name, apellidos: usuario.apellidos, email: usuario.email, imageIcon: usuario.imageIcon})
            }else{
                res.status(200).send({name: usuario.name, apellidos: usuario.apellidos, email: usuario.email, imageIcon: usuario.imageIcon})
            }
    }else{
        res.status(404).send({error: 'La contraseña es incorrecta', date: new Date()})
    }
})

const generarCodigo = longitud => {
    const banco = "0123456789";
    let aleatoria = "";
    for (let i = 0; i < longitud; i++) {
        aleatoria += banco.charAt(Math.floor(Math.random() * banco.length));
    }
    return aleatoria;
}

userRouter.post('/verify-sign-in', async(req, res) => {
    const {useSubscription, sub} = await validarSubscription(req, res)
    const {tokenValidacion, vCodigo} = req.body
    const {codigo, value, date} = jwt.verify(tokenValidacion, process.env.SECRET)

    await useSubscription()

    if(tokenValidacion.length === 0 || vCodigo.length === 0){
        res.status(400).send({error: 'Datos incorrectos', date: new Date()})
        return
    }

    if(!subValidFlux(sub)){
        res.status(401).send({error: 'Su suscripción no incluye la API de CORE (flux). Actualice para incluirla.', date: new Date()})
        return
    }

    if(!subValidEmail(sub)){
        res.status(401).send({error: 'Su suscripción no incluye la API de email. Actualice para incluirla.', date: new Date()})
        return
    }

    if(!(await uniqueForTenant(value.email, sub))){
        // console.log('Ha entrado por aqui')
        res.status(400).send({error: 'El email ya está en uso.', date: new Date()})
        return
    }

    // console.log(vCodigo + " | " + codigo)

    if(await bcrypt.compare(vCodigo, codigo)){
        if(new Date() <= new Date(new Date(date).getTime()+1800000)){
            const myUser = new user({
                ...value
            })
            await myUser.save()
            // const myFinalUser = await user.findOne({email: body.email, tenant: root_token.id})
            await registrarUsuarioEnTenant(myUser, sub)
            res.status(200).send({
                verified: true,
                type: 'Se ha registrado correctamente',
                code: 200,
                email: value.email
            })
            
        }else{
            const orCodigo = generarCodigo(6)
            const newCodigo = await bcrypt.hash(orCodigo, 10)
            const tokenValidacion = jwt.sign({value, codigo: newCodigo, date: new Date()}, process.env.SECRET)
            const html = `<p>Hemos detectado que desea registrarse con este correo: <strong>${value.email}</strong>. Para ello necesitar&aacute; hacer uso del c&oacute;digo de verificaci&oacute;n que le ser&aacute; solicitado por la p&aacute;gina web. El siguiente c&oacute;digo de seguridad es de un solo uso, es solamente v&aacute;lido durante los 30 minutos posteriores a su generaci&oacute;n. Al ser un c&oacute;digo confidencial, no debe compartirse con nadie. A continuaci&oacute;n encuentra el c&oacute;digo:</p><br/><p style="text-align: center;"><span style="font-size:26px;"><strong>${orCodigo}</strong></span></p><br/><p>Si necesita ayuda de cualquier tipo, no dude en ponerse en contacto con nosotros mediante nuestro correo: <a href="mailto:general.adelcidp@gmail.com?subject=Verificaci%C3%B3n%20del%20correo&amp;body=Necesito%20ayuda%20con%20la%20verificaci%C3%B3n%20del%20correo%20electr%C3%B3nico%20a%20la%20hora%20de%20registrar%20mi%20cuenta%20en%20la%20web.">general.adelcidp@gmail.com</a>.</p><br/><p>Muchas gracias.</p>`
            await enviarMensaje(null, value.email, 'Verificación de email', null, html)
            res.status(401).send({verify: true, error: 'El código de verificación ha expirado. Acabamos de enviar otro.', tokenValidacion})
        }
    }else{
        res.status(401).send({error: 'El código de verificación es incorrecto', date: new Date()})
    }
})

userRouter.post('/sign-in', async (req, res) => {
    /*
        name: (...)
        apellidos: (...)
        email: (...)
        password: (...)
    */
    // const sub = req.get('Subscription')
    const {useSubscription, sub} = await validarSubscription(req, res)
    if(useSubscription === false) return
    const body = req.body;
    await useSubscription()
    if(validacionDatos(body)){
        if(!(await uniqueForTenant(req.body.email, sub))){
            console.log('Ha entrado por aqui')
            res.status(400).send({error: 'El email ya está en uso.', date: new Date()})
            return
        }

        const passwordHash = await bcrypt.hash(body.password, 10)

        if(subValidFlux(sub) && subValidEmail(sub) && sub.tenant.aditionals.mfa){
            // El tenant al que se registra tiene flux y mfa activado
            const value = {
                name: body.name,
                apellidos: body.apellidos,
                email: body.email,
                passwordHash,
                rank: "usuario",
                blocked: {
                    value: -1,
                    reason: ""
                },
                tenant: sub.tenant.id,
                imageIcon: ""
            }
            const orCodigo = generarCodigo(6)
            const codigo = await bcrypt.hash(orCodigo, 10)
            const tokenValidacion = jwt.sign({value, codigo, date: new Date()}, process.env.SECRET)
            const html = `<p>Hemos detectado que desea registrarse con este correo: <strong>${body.email}</strong>. Para ello necesitar&aacute; hacer uso del c&oacute;digo de verificaci&oacute;n que le ser&aacute; solicitado por la p&aacute;gina web. El siguiente c&oacute;digo de seguridad es de un solo uso, es solamente v&aacute;lido durante los 30 minutos posteriores a su generaci&oacute;n. Al ser un c&oacute;digo confidencial, no debe compartirse con nadie. A continuaci&oacute;n encuentra el c&oacute;digo:</p><br/><p style="text-align: center;"><span style="font-size:26px;"><strong>${orCodigo}</strong></span></p><br/><p>Si necesita ayuda de cualquier tipo, no dude en ponerse en contacto con nosotros mediante nuestro correo: <a href="mailto:general.adelcidp@gmail.com?subject=Verificaci%C3%B3n%20del%20correo&amp;body=Necesito%20ayuda%20con%20la%20verificaci%C3%B3n%20del%20correo%20electr%C3%B3nico%20a%20la%20hora%20de%20registrar%20mi%20cuenta%20en%20la%20web.">general.adelcidp@gmail.com</a>.</p><br/><p>Muchas gracias.</p>`
            await enviarMensaje(null, body.email, 'Verificación de email', null, html)
            res.status(200).send({tokenValidacion, verify: true})
        }else{

            // El tenant al que se registra no tiene flux/mfa activado

            const myUser = new user({
                name: body.name,
                apellidos: body.apellidos,
                email: body.email,
                passwordHash,
                rank: "usuario",
                blocked: {
                    value: -1,
                    reason: ""
                },
                tenant: sub.tenant.id,
                imageIcon: ""
            })
            await myUser.save()
            // const myFinalUser = await user.findOne({email: body.email, tenant: root_token.id})
            await registrarUsuarioEnTenant(myUser, sub)
            res.status(200).send({success: {
                type: 'sign up',
                code: 200,
                email: body.email
            }})
            }
    }else{
        res.status(400).send({error: 'Datos introducidos incorrectos', date: new Date()})
    }
})

module.exports = userRouter