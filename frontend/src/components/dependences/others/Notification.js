import { Alert } from "@mui/material"
import { useState } from "react"


export const useNotification = (onFinished=()=>{}) => {
    const [notification, setNotification] = useState({
        notification: null,
        isSuccess: false
    })
    const myNotification = () => (
        <Alert severity={notification.isSuccess ? "success" : 'error'}>{notification.notification}</Alert>
    )

    if(notification.notification !== null){
        setTimeout(() => {
            setNotification({notification: null, isSuccess: false})
            onFinished()
        }, 5000)
    }

    const getNotification = () => (
        <>
            {notification.notification !== null && myNotification()}
        </>
    )

    return [getNotification, setNotification]
    
}