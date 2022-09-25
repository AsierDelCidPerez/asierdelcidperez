import { Button, Typography, Rating } from "@mui/material"
import axios from 'axios'
import useImageService from "../../services/images"
import uris from '../../urls/uris'
import { useState } from "react"
import useFormField from "../dependences/inputs/FormFile"
import useProgressSteps from "../dependences/progress/ProgressSteps"
import { useDispatch } from "react-redux"
import { actOfSetNotification } from "../../redux/reducers/notification"
import useStep1Contact from "../dependences/contactar/step1"
import useStep2Contact from "../dependences/contactar/step2"
import useStep3Contact from "../dependences/contactar/step3"
import useStep4Contact from "../dependences/contactar/step4"
import MyModal from "../dependences/others/MyModal"

const steps = [
    {
        id: 1,
        name: 'Información personal',
        optional: false
    }, 
    {
        id: 2,
        name: 'Información de contacto',
        optional: false
    }, 
    {
        id: 3,
        name: 'Añadir imágenes si es necesario',
        optional: true
    }, 
    {
        id: 4,
        name: 'Comentarios adicionales',
        optional: true
    }, 
];

const Contacto = () => {
    const dispatch = useDispatch()
    const [valoracion, setValoracion] = useState(false)
    const {getProgressSteps, handleNext, activeStep, resetSteps} = useProgressSteps({steps})
    const {fields: fields1, getStep1, resetForm: resetForm1} = useStep1Contact()
    const {fields: fields2, getStep2, resetForm: resetForm2} = useStep2Contact()
    const {fields: fields3, getStep3, resetForm: resetForm3} = useStep3Contact()
    const {fields: fields4, getStep4, resetForm: resetForm4} = useStep4Contact()

    const resets = [resetForm1, resetForm2, resetForm3, resetForm4]

    const stepsArr = [
        {
            fields:fields1, getStep: getStep1
        },
        {
            fields: fields2, getStep: getStep2
        },
        {
            fields: fields3, getStep: getStep3
        },
        {
            fields: fields4, getStep: getStep4
        }
    ]

    const validar = fields => {
        const validadores = [new RegExp("[A-Za-z]+"), new RegExp("[A-Za-z0-9]+@[A-Za-z0-9]+.[A-Za-z0-9]+"), new RegExp("([0-9]{9})")]
        let validated = true
        for(let key in fields){
            switch(fields[key].type){
                case "text": {
                    if(!fields[key].value.match(validadores[0]) && !fields[key].optional) validated = false
                    break
                }
                case "email": {
                    if(!fields[key].value.match(validadores[1]) && !fields[key].optional) validated = false
                    break
                }
                case "tlf": {
                    if(!fields[key].value.match(validadores[2]) && !fields[key].optional) validated = false
                    break
                }
                case "array": {
                    if(!fields[key].value && !fields[key].optional) validated = false
                    break
                }
                default: break
            }
            if(!validated){
                dispatch(actOfSetNotification(`El campo ${key} no se adecúa al formato`, false))
                return false
            }
        }
        return true
    }

    const contactar = async event => {
        event.preventDefault()
        if(validar(stepsArr[activeStep]?.fields)){
            if(activeStep+1 === steps.length) finalizarContacto()
            else handleNext()
        }
    }

    const isSuitable = numUsos => {
        if(Number.isInteger(Math.sqrt(numUsos))) return true
        return false
    }

    const clearForm = () => {
        resets.forEach(reset => reset())
    }

    const finalizarContacto = () => {
        const valoracion = window.localStorage.getItem('valoracionInterfaz')
        const datos = stepsArr.map(step => step.fields)
        const datosFinales = {...datos[0], ...datos[1], ...datos[2], ...datos[3]}
        if(valoracion){
            const numUsos = JSON.parse(valoracion).usos
            if(isSuitable(numUsos+1)) {
                setValoracion(true)
            }
            const newValoracion = {
                usos: numUsos+1
            }
            localStorage.setItem('valoracionInterfaz', JSON.stringify(newValoracion))
        }else{
            const myValoracion = {
                usos: 1
            }
            setValoracion(true)
            localStorage.setItem('valoracionInterfaz', JSON.stringify(myValoracion))
        }
        resetSteps()
        clearForm()
        registrarDatosContacto(datosFinales)
    }

    const registrarDatosContacto = datosFinales => {  //Registrar datos de contacto en BBDD
        // console.log(datosFinales)
        dispatch(actOfSetNotification('Has contactado exitósamente', true))
    }

    const registrarValoracion = valoracion => { //Registrar valoracion en BBDD
        // console.log(valoracion)
    }


    return (
        <form onSubmit={contactar}> 
        <MyModal open={valoracion} getBody={() => (
            <div style={{textAlign: "center"}}>
                <Typography variant="h6" component="h2">
                    Valore nuestra interfaz
                </Typography>
                <Rating
                    name="valoracion-interfaz"
                    value={0}
                    onChange={(event, newValue) => {
                        registrarValoracion(newValue)
                        setValoracion(false)
                    }}
                />
            </div>
        )}/>
            {getProgressSteps()}
            {stepsArr[activeStep]?.getStep()}
            <br/>
            <Button fullWidth type="submit" onClick={contactar} variant="contained">Siguiente</Button>
            <br/><br/>
        </form>
    )
}

export default Contacto