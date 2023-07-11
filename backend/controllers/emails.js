
const emailRouter = require('express').Router()
const correo = require('../model/Correo.js')
const nodemailer = require("nodemailer");
const { getFunctionsForSubscription } = require('./subscriptions.js');
require('../model/Tenant.js')

const subValidaEmail = sub => {
  if(!sub.tenant.features.includes('email')) return false
  return true
}

const validarEmail = async (email, orCodigo) => {
  // console.log(orCodigo)
  const html = `<p>Hemos detectado que desea registrarse con este correo: <strong>${email}</strong>. Para ello necesitar&aacute; hacer uso del c&oacute;digo de verificaci&oacute;n que le ser&aacute; solicitado por la p&aacute;gina web. El siguiente c&oacute;digo de seguridad es de un solo uso, es solamente v&aacute;lido durante los 30 minutos posteriores a su generaci&oacute;n. Al ser un c&oacute;digo confidencial, no debe compartirse con nadie. A continuaci&oacute;n encuentra el c&oacute;digo:</p><br/><p style="text-align: center;"><span style="font-size:26px;"><strong>${orCodigo}</strong></span></p><br/><p>Si necesita ayuda de cualquier tipo, no dude en ponerse en contacto con nosotros mediante nuestro correo: <a href="mailto:general.adelcidp@gmail.com?subject=Verificaci%C3%B3n%20del%20correo&amp;body=Necesito%20ayuda%20con%20la%20verificaci%C3%B3n%20del%20correo%20electr%C3%B3nico%20a%20la%20hora%20de%20registrar%20mi%20cuenta%20en%20la%20web.">general.adelcidp@gmail.com</a>.</p><br/><p>Muchas gracias.</p>`
  await enviarMensaje(null, email, 'Verificación email', null, html)
}

const enviarMensaje = async (fromTenant=null,to=null, subject=null, text=null, html=null)  => {
    // console.log(fromTenant)
    let transporter = null
    let etiquetaValidacion = ""
    let moreHtml = ""

    let from = ""
    if(fromTenant === null){
      etiquetaValidacion = "https://i.imgur.com/InWc86B.png"
      moreHtml = `<br/><hr><br/>Este mensaje ha sido generado automáticamente por el servicio de APIs de <a href="https://asierdelcidperez.onrender.com/" target="_blank">AsierX</a>. <br/>No responda a este mensaje pues no será contestado, si necesita ponerse en contacto con nosotros, contacte con el email: <a href=mailto:"general.adelcidp@gmail.com">general.adelcidp@gmail.com</a>. Si encuentra más imagenes de etiquetas de verificación de autenticidad, revise únicamente la última, que será la valida, y recuerde que las direcciones auténticas con las que AsierX API Services se puede poner en contacto contigo son:<ul><li><a href=mailto:"general.adelcidp@gmail.com">general.adelcidp@gmail.com</a> (AsierX Web email oficial)</li><li>noreply.adelcidp@gmail.com (Correo unidireccional)</li><li>tenant.adelcidp@gmail.com (Correo unidireccional)</li></ul><br/>`
      from = '"AsierX API Services" <general.adelcidp@gmail.com>'
      transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          // TODO: replace `user` and `pass` values from <https://forwardemail.net>
          user: 'noreply.adelcidp@gmail.com',
          pass: 'ksst lvqr kfgv tziw'
        }
      }) 
    }else if(fromTenant === 'root'){
      etiquetaValidacion = "https://i.imgur.com/j4kdj1B.png"
      moreHtml = `<br/><hr><br/>Este mensaje ha sido generado por un administrador certificado oficial (mirar etiqueta de validación) de la organización <a href="https://asierdelcidperez.onrender.com/">Asier</a><br/>Si necesita ponerse en contacto con nosotros, contacte con el email: <a href=mailto:"general.adelcidp@gmail.com">general.adelcidp@gmail.com</a> o responda a este mensaje. Si encuentra más imagenes de etiquetas de verificación de autenticidad, revise únicamente la última, que será la valida, y recuerde que las direcciones auténticas con las que AsierX API Services se puede poner en contacto contigo son:<br/><strong>Nunca de sus contraseñas</strong>. Otorga únicamente la información que considere necesaria, o que los administradores le pidan. Nunca le pediremos la contraseña.<ul><li><a href=mailto:"general.adelcidp@gmail.com">general.adelcidp@gmail.com (AsierX Web email oficial)</a></li><li>noreply.adelcidp@gmail.com (Correo unidireccional)</li><li>tenant.adelcidp@gmail.com (Correo unidireccional)</li></ul><br/>`      
      from = '"AsierX Web" <general.adelcidp@gmail.com>'
      transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          // TODO: replace `user` and `pass` values from <https://forwardemail.net>
          user: 'general.adelcidp@gmail.com',
          pass: 'lszu enez kkrx pfpr'
        }
      })
    }else{
      moreHtml = `<br/><hr><br/>Este mensaje ha sido generado por un administrador de tenant autorizado por el servicio de APIs de <a href="https://asierdelcidperez.onrender.com/" target="_blank">AsierX</a>. <br/>No responda a este mensaje pues no será contestado, si necesita ponerse en contacto con nosotros, contacte con el email: <a href=mailto:"general.adelcidp@gmail.com">general.adelcidp@gmail.com</a>. Si encuentra más imagenes de etiquetas de verificación de autenticidad, revise únicamente la última, que será la valida, y recuerde que las direcciones auténticas con las que AsierX API Services se puede poner en contacto contigo son:<br/><strong>Nunca de sus contraseñas</strong>. Otorga únicamente la información que considere necesaria.<br/>Si se siente ofendido tras leer el mensaje por alguna parte del contenido, no dude en ponerse en contacto con <a href=mailto:"general.adelcidp@gmail.com">general.adelcidp@gmail.com</a> para explicar el incidente.<ul><li><a href=mailto:"general.adelcidp@gmail.com">general.adelcidp@gmail.com</a> (AsierX Web email oficial)</li><li>noreply.adelcidp@gmail.com (Correo unidireccional)</li><li>tenant.adelcidp@gmail.com (Correo unidireccional)</li></ul><br/>`
      from = '"' + fromTenant + '" <general.adelcidp@gmail.com>'
      etiquetaValidacion = "https://i.imgur.com/nwrmC1K.png"
        transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
              // TODO: replace `user` and `pass` values from <https://forwardemail.net>
              user: 'tenant.adelcidp@gmail.com',
              pass: 'zsiz cqde glxu ynvd'
            }
          })
    }
  if(to === null || subject === null) return
  if(html === null && text === null) return
  const newHtml = html + moreHtml + `<img width="400px" src="${etiquetaValidacion}"/>`
  if(html !== null){
    const info = await transporter.sendMail({
      from,
      to, // list of receivers
        subject, // Subject line
        html: newHtml, // html body
      });
      if(fromTenant !== null){
        const nuevoCorreo = new correo({
          fromTenant,
          messageId: info.messageId,
          text: html,
          asunto: subject,
          isHtml: html !== null,
          to
      })
      await nuevoCorreo.save()
    }
      // console.log("Message sent: %s", info.messageId);
      return info
  }else{
    const info = await transporter.sendMail({
        from,
        to, // list of receivers
        subject, // Subject line
        html: newHtml, // html body
      });
      if(fromTenant !== null){
          const nuevoCorreo = new correo({
            from: fromTenant,
            messageId: info.messageId,
            text,
            asunto: subject,
            isHtml: html!==null,
            to
        })
        await nuevoCorreo.save()
      }
      // console.log("Message sent: %s", info.messageId);
      return info
  }
}

emailRouter.post('/', async(req, res) => {
    const subscription = req.get('Subscription')
    const {subject, text, isHtml, to} = req.body
    const {isUsable, useSubscription, sub} = await getFunctionsForSubscription(subscription)
    
    if(isUsable === undefined || useSubscription === undefined || sub === undefined){
        res.status(401).send({error: 'Suscripción inválida o límite de uso alcanzado.'})
        return
    }

    if(!subValidaEmail(sub)){
      res.status(401).send({error: 'Su suscripción no incluye la API de emails. Actualice para incluirla.'})
    }

    //console.log(sub)

    if(await isUsable(req)){
      await useSubscription()
      // console.log(subWithInfo)

      let message = null
      try{
        if(isHtml) message = await enviarMensaje(sub.tenant.nameId, to, subject, null, text)
        else message = await enviarMensaje(sub.tenant.nameId, to, subject, text)
        res.status(200).send({sentMessage: true, date: new Date()})
      }catch(e){
        res.status(400).send({error: "Se ha producido un error", date: new Date()})
      }
    }else{
      res.status(401).send({error: 'Su suscripción es inválida, probablemente haya expirado o rebasado el límite de llamadas adquirido.', date: new Date()})
    }
})

module.exports = {emailRouter, enviarMensaje, validarEmail}
