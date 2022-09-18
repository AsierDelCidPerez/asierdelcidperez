import { Button } from "@mui/material"
import FormFile from "../dependences/inputs/FormFile"
import axios from 'axios'

const Contacto = () => {
    const contactar = event => {
        event.preventDefault()
        const FD = new FormData()
        const adjuntos = event.target.adjunto.files
        let urlsImages = []
        var urlCreator = window.URL || window.webkitURL;
        for(let file of adjuntos){
            urlsImages = urlsImages.concat(urlCreator.createObjectURL(file))
        }
        urlsImages.forEach(url => {
            window.open(url)
            console.log(url)
        })
        urlsImages.forEach(url => {
            urlCreator.revokeObjectURL(url)
        })
    }
    return (
        <form onSubmit={contactar}>
            <FormFile name="adjunto"/>
            <Button type="submit" variant="contained">Submit</Button>
            <br/><br/>
        </form>
    )
}

export default Contacto