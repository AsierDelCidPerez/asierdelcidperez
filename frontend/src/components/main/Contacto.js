import { Button, LinearProgress, Box } from "@mui/material"
import axios from 'axios'
import useImageService from "../../services/images"
import uris from '../../urls/uris'
import { useState } from "react"
import useFormField from "../dependences/inputs/FormFile"

const Contacto = () => {
    const [loading, setLoading] = useState(false)
    const images = useImageService(uris.imageControllerUri)
    const multiple = true
    const formField = useFormField({name:'adjunto', acceptedExtensions: ["png", "jpeg", "jpg"], multiple})

    const contactar = async event => {
        event.preventDefault()
        const form = new FormData()
        const adjuntos = event.target.adjunto.files
        let urlsImages = []
        var urlCreator = window.URL || window.webkitURL;
        for(let file of adjuntos){
            form.append("images", file)
        }
        urlsImages.forEach(url => {
            window.open(url)
            console.log(url)
        })
        setLoading(true)
        images.uploadImage(form).then(res => {
            setLoading(false)
        })
        urlsImages.forEach(url => {
            urlCreator.revokeObjectURL(url)
        })
    }
    return (
        <form onSubmit={contactar}> 
            <Box sx={{ width: '100%', display: loading ? 'block' : 'none'}}>
                <LinearProgress />
            </Box>
            {formField.getUploadFile()}
            <Button type="submit" variant="contained">Submit</Button>
            <br/><br/>
        </form>
    )
}

export default Contacto