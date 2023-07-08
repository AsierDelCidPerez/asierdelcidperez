import { useState } from "react"
import MyModal from "./MyModal"
import { Button } from "@mui/material"


const useAlert = (handleOpen=() => {}, handleClose=() => {}) => {

    /*
    type : String -> danger, 
    title : String -> título de la alerta
    isConfirmAlert : boolean -> ¿es una alerta para confirmar?
    text: String -> texto de la alerta

    */

    const [alert, setAlert] = useState({
        open: false,
        isConfirmAlert: false,
        type: "",
        title: "",
        onConfirm: () => {},
        text: ""
    })

    const typesIcons = {
        danger: "https://i.imgur.com/kmG6tq4.png",
        success: "https://i.imgur.com/1TGpSqX.png",
        info: "https://i.imgur.com/wwfZ1y9.png"
    }

    const toggleOpen = () => {
        setAlert({
            ...alert,
            open: !alert.open
        })
        if(alert.open) handleOpen()
        else handleClose()
    }

    const confirmar = () => {
        toggleOpen()
        alert.onConfirm()
    }

    const getButtons = () => {
        if(alert.isConfirmAlert){
            return (
                <>
                <Button onClick={toggleOpen} variant="outlined">Cerrar</Button>
                <Button onClick={confirmar} variant="contained">Aceptar</Button>
                </>
            )
        }else{
            return (
                <>
                    <Button onClick={confirmar} variant="contained">Aceptar</Button>
                </>
            )
        }
    }


    const getAlert = () => (
        <MyModal handleClose={toggleOpen} open={alert.open} getBody={() => (
            <div style={{textAlign: 'center'}}>
                <img src={typesIcons[alert.type]} width="20%"/>
                <h1>{alert.title}</h1>
                <p>{alert.text}</p>
                <div style={{display: 'flex', justifyContent: 'space-around'}}>
                    {getButtons()}
                </div>
            </div>
        )}/>
    )


    return {
        setAlert, getAlert
    }
}

export default useAlert