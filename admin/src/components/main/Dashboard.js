import {Box, Container } from "@mui/material"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import Header from "../dependences/dashboard/Header"
import Options from "../dependences/dashboard/Options"

const Dashboard = ({setActiveElem, setVisible}) => {

    const admin = useSelector(state => state?.admin)


    setActiveElem(0)
    const navigate = useNavigate()
    
    useEffect(() => {
        setVisible(false)
        if(admin === null) navigate('/')
    }, [])

// console.log(admin)
    return (
        <div>
            <Box sx={{display: {md: 'flex', sm: 'none', xs: 'none'}}}>
                <div style={{width: "100%", height: "100vh", backgroundImage: 'url("./tecno.jpg")'}}>
                <Container>
                    <Header admin={admin}/>
                    <Options setActiveElem={setActiveElem}/>
                </Container>
                </div>
            </Box>
            <Box sx={{display: {md: 'none', sm: 'block', xs: 'block'}}}>
            <div style={{width: "100%", height: "100%", backgroundImage: 'url("./tecno2.jpg")', backgroundSize: "cover"}}>
                <Container>
                    <Header admin={admin}/>
                    <Options/>
                </Container>
                </div>
            </Box>
        </div>
    )
}


export default Dashboard