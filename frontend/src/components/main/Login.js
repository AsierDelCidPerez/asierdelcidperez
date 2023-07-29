import React, { useEffect, useState } from 'react'
import MyModal from "../dependences/others/MyModal"
import SignIn from "../dependences/auth/login/SignIn"
import LoginForm from "../dependences/auth/login/Login"
import { useNavigate } from "react-router-dom"
import { useNotification } from "../dependences/others/Notification"
import { useSelector } from 'react-redux'

const Login = () => {
    const [loggingIn, setLoggingIn] = React.useState(true)
    const [likeRegistering, setlikeRegistering] = React.useState(false)
    const [sub, setSub] = React.useState({
      value: null,
      returnUrl: null,
      tokenAuth: null
    })
    const [onlyLogin, setOnlyLogin] = useState(false)
    /* Si no tiene sesión iniciada, aparecer  */
    const navigate = useNavigate()
    const notification = useNotification()

    useEffect(() => {
      const urlParams = new URLSearchParams(window.location.search);
      const auth = urlParams.get('auth');
        const returnUrl = urlParams.get('return')
        const mySub = urlParams.get('sub')
        const tokenAuth = urlParams.get('tokenauth')
        console.log(mySub)
        console.log(returnUrl)
        console.log(auth)
        console.log(tokenAuth)
        if(auth === "true"){
          console.log(mySub)
          setSub({
            value: mySub,
            returnUrl,
            tokenAuth
          })
          if(mySub === "null" || mySub === undefined){
            setOnlyLogin(true)
          }
      }
      //console.log(sub)
      //navigate(`/auth/login?return=${sub.returnUrl}&sub=${sub.value}&tokenauth=${sub.tokenAuth}`)
      
    }, [])

    const toggleLogin = () => {
      setLoggingIn(!loggingIn)
      navigate('/')
    }
    const toggleLikeRegistering = () => setlikeRegistering(!likeRegistering)

    const properties = {
      toggleLikeRegistering, notification
    }
    //console.log(sub)
    const user = useSelector(state => state.user)

    return (
        <div>
        <MyModal open={(loggingIn && !user) || sub.value !== null || sub.returnUrl !== null} handleClose={toggleLogin} getBody={() => (
        <>
        {likeRegistering ? <SignIn sub={sub.value} {...properties}/> : <LoginForm tokenAuth={sub.tokenAuth} onlyLogin={onlyLogin} returnUrl={sub.returnUrl} sub={sub.value} {...properties}/>}
        </>
      )}/>
        </div>
    )

}


export default Login