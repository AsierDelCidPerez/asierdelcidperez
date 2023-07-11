
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

const subValidUser = sub => {
    if(!sub.tenant.features.includes('user')) return false
    return true
}

const subValidFlux = sub => {
    if(!sub.tenant.features.includes('flux')) return false
    return true
}

const subValidEmail = sub => {
    if(!sub.tenant.features.includes('email')) return false
    return true
}

const validarSubscription = async (req, res) => {
    const {sub, isUsable, useSubscription} = await getFunctionsForSubscription(req.get('Subscription'))
    if(!(await isUsable(req))){
        res.status(401).send({error: 'Su suscripción es inválida, probablemente haya expirado o rebasado el límite de llamadas adquirido.', date: new Date()})
        return false
    }

    if(!subValidUser(sub)){
        res.status(401).send({error: 'Su suscripción no incluye la API de user. Actualice para incluirla.', date: new Date()})
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
    if(!(await validacionToken(token, req))) {
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
    const {verifiedEmailForChangePassword, email, date} = jwt.verify(tokenValidacion, process.env.SECRET)

    if(verifiedEmailForChangePassword){
        if(validacionDatos({password: nPass})){
            if(new Date() <= new Date(new Date(date).getTime()+1800000)){
                console.log(email)
                console.log(sub.tenant.id)
                const myUser = await user.findOne({email, tenant: sub.tenant.id})
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
    const {codigo, date, email} = jwt.verify(tokenValidacion, process.env.SECRET)
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

userRouter.put('/edit/:ajuste', async(req, res) => {
    const {useSubscription, sub} = await validarSubscription(req, res)
    await validarSubscription(req, res)
    const ajuste = req.params.ajuste
    const token = jwt.verify(req.get('Authorization'), process.env.SECRET)
    if(useSubscription === undefined) return
    await useSubscription()
    if(!validacionToken(token)){
        res.status(401).send({error: "Token inválido o incorrecto", date: new Date()})
        return
    }
    const {newValue} = req.body
    if(ajuste === "passwordHash") {res.status(405).send({error: {
        code: 324,
        description: "Método no disponible en esta dirección de API",
    }, date: new Date()})
    return
}
    const availabeAjustes = ["name", "apellidos", "email"]
    const myEmail = token.value.email
    if(!availabeAjustes.includes(ajuste)){
        res.status(405).send({error: {
            code: 324,
            description: "Método no disponible en esta dirección de API"
        }, date: new Date()})
        return
    }
    // console.log(token)
    const myUser = await existeUsuario(myEmail, sub.tenant.id)
    if(myUser === false) {
        res.status(400).send({error: {
            code: 125,
            description: "Token mal configurado"
        }, date: new Date()})
        return
    }
    const nToken = {
        ...token,
        value: {
            ...token.value,
            [ajuste]: newValue
        }
    }
    const newToken = jwt.sign(nToken, process.env.SECRET)
    myUser[ajuste] = newValue
    await myUser.save()
    res.status(202).send({success: true, 
        newToken,
        change: {[ajuste]: {
        oldValue: myEmail,
        newValue
    }}, date: new Date()})
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
            const token = jwt.sign({value: {name: usuario.name, apellidos: usuario.apellidos, email: usuario.email, tenant: usuario.tenant.nameId, rank: usuario.rank, blocked: usuario.blocked}, date: new Date(), ip}, process.env.SECRET)
            res.status(200).send({token, name: usuario.name, apellidos: usuario.apellidos, email: usuario.email})
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