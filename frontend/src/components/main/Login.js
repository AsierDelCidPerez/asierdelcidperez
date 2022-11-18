import { Button } from "@mui/material"
import React from 'react'
import MyModal from "../dependences/others/MyModal"
import SignIn from "../dependences/auth/login/SignIn"
import { getLogin as getLoginForm } from "../dependences/auth/login/Login"
import { useNavigate } from "react-router-dom"

const Login = () => {
    const [loggingIn, setLoggingIn] = React.useState(true)
    const [likeRegistering, setlikeRegistering] = React.useState(false)
    /* Si no tiene sesión iniciada, aparecer  */
    const navigate = useNavigate()
  
    const toggleLogin = () => {
      setLoggingIn(!loggingIn)
      navigate('/')
    }
    const toggleLikeRegistering = () => setlikeRegistering(!likeRegistering)

    return (
        <div>
        <MyModal open={loggingIn} handleClose={toggleLogin} getBody={() => (
        <>
        {likeRegistering ? <SignIn toggleLikeRegistering={toggleLikeRegistering}/> : getLoginForm(toggleLikeRegistering)}
        </>
      )}/>
        </div>
    )

}


export default Login