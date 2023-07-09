
const emailRouter = require('express').Router()
const correo = require('../model/Correo.js')
const nodemailer = require("nodemailer");
const { getFunctionsForSubscription } = require('./subscriptions.js');
require('../model/Tenant.js')

const subValidaEmail = sub => {
  if(!sub.tenant.features.includes('email')) return false
  return true
}

const enviarMensaje = async (fromTenant=null,to=null, subject=null, text=null, html=null)  => {
    console.log(fromTenant)
    let transporter = null
    if(fromTenant === null){
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
  if(fromTenant===null || to === null || subject === null) return
  if(html === null && text === null) return
  if(html !== null){
    const info = await transporter.sendMail({
      from: fromTenant==='root' ? '"AsierX Web" <general.adelcidp@gmail.com>' : '""' + fromTenant + '"" <tenant.adelcidp@gmail.com>', // sender address
      to, // list of receivers
        subject, // Subject line
        html, // html body
      });
      // console.log("Message sent: %s", info.messageId);
      return info
  }else{
    const info = await transporter.sendMail({
        from: fromTenant==='root' ? '"AsierX Web" <general.adelcidp@gmail.com>' : '""' + fromTenant + '"" <tenant.adelcidp@gmail.com>', // sender address
        to, // list of receivers
        subject, // Subject line
        text, // html body
      });
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
        const nuevoCorreo = new correo({
            from: sub.tenant.nameId,
            messageId: message.messageId,
            text: text,
            asunto: subject,
            isHtml,
            to
        })
        await nuevoCorreo.save()
        res.status(200).send({sentMessage: true, date: new Date()})
      }catch(e){
        res.status(400).send({error: "Se ha producido un error", date: new Date()})
      }
    }else{
      res.status(401).send({error: 'Su suscripción es inválida, probablemente haya expirado o rebasado el límite de llamadas adquirido.', date: new Date()})
    }
})

module.exports = {emailRouter, enviarMensaje}
