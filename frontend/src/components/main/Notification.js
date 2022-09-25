import { Alert } from "@mui/material"
import {useDispatch, useSelector} from 'react-redux'
import { actOfSetNotification } from "../../redux/reducers/notification"

export default Notification = () => {

    const notification = useSelector(state => state.notification)
    const dispatch = useDispatch()
    if(notification.msg !== null) setTimeout(() => dispatch(actOfSetNotification(null, true)), 5000)
    
    const getNotification = () => (
        <Alert severity={notification.isSuccess ? "success" : "error"}>
            {notification.msg}
        </Alert> 
    )

    return (
        <>
            {notification.msg && getNotification()}
        </>
    )
}