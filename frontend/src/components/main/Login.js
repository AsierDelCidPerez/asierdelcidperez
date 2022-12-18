import React from 'react'
import MyModal from "../dependences/others/MyModal"
import SignIn from "../dependences/auth/login/SignIn"
import LoginForm from "../dependences/auth/login/Login"
import { useNavigate } from "react-router-dom"
import { useNotification } from "../dependences/others/Notification"
import { useSelector } from 'react-redux'

const Login = () => {
    const [loggingIn, setLoggingIn] = React.useState(true)
    const [likeRegistering, setlikeRegistering] = React.useState(false)
    /* Si no tiene sesión iniciada, aparecer  */
    const navigate = useNavigate()
    const notification = useNotification()

    const toggleLogin = () => {
      setLoggingIn(!loggingIn)
      navigate('/')
    }
    const toggleLikeRegistering = () => setlikeRegistering(!likeRegistering)

    const properties = {
      toggleLikeRegistering, notification
    }

    const user = useSelector(state => state.user)

    return (
        <div>
        <MyModal open={loggingIn && !user} handleClose={toggleLogin} getBody={() => (
        <>
        {likeRegistering ? <SignIn {...properties}/> : <LoginForm {...properties}/>}
        </>
      )}/>
        </div>
    )

}


export default Login