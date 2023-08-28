import { Grid, Box, Typography, Button, Card, Container } from "@mui/material"
import ListedNav from "../dependences/others/ListedNav"
import React, { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import GenericUserListOptions from "../dependences/user/GenericUserListOptions"
import Navbar from "./Navbar"
import ListUsers from "../dependences/dashboard/consoles/ListUsers"

const opcionesUsuario = [
    {
        name: "Inicio",
        icon: "fa-solid fa-house",
        right: "seeStatistics",
        onClick: () => (
            <div>
                Hola mundo1
            </div>
        )
    },
    {
        name: "Gestionar usuarios",
        icon: "fa-solid fa-people-roof",
        onClick: () => (
            <ListUsers/>
        )
    },
    {
        name: "Bloquear usuario",
        icon: "fa-solid fa-ban",
        onClick: () => (
            <div>
                Hola mundo3
            </div>
        )
    },
    {
        name: "Mis notificaciones",
        icon: "fa-solid fa-envelope",
        badge: 4,
        onClick: () => {
            <div>
                Hola mundo4
            </div>
        }
    },
    {
        name: "Mis archivos",
        icon: "fa-solid fa-folder",
        onClick: () => {
            
        }
    }
]

const AdminUser = ({setVisible, setActiveElem}) => {
    setActiveElem(1)
    setVisible(true)

    return (
        <div>
            <div style={{paddingLeft: '10%', paddingRight: '10%', paddingTop: '1.5%'}}>
                <GenericUserListOptions options={opcionesUsuario} relationOfSide={1/5}/>
            </div>
        </div>
    )
}

export default AdminUser