import { Button, CircularProgress, Container, LinearProgress } from "@mui/material"
import React, {useState} from 'react'
import useImageService from "../../../services/images"
import uris from '../../../urls/uris'


const useFormField = ({name, acceptedExtensions, multiple=false, text="Subir archivos"}) => {
    const [loading, setLoading] = useState(false)
    const [styles, setStyles] = useState({
        dragOver: false,
        incorrect: {value: false, text: ""}
    })
    const image = useImageService()
    const [files, setFiles] = useState([])
    const [links, setLinks] = useState([])

    // Configuracion extensiones permitidas
    let extensions = ".("
    acceptedExtensions.forEach(extension => {
        extensions += (extension + "|")
    })
    if(acceptedExtensions.length === 0) return null
    extensions = extensions.substring(0, extensions.length-1)
    extensions += ")$"
    const acceptedPattern = new RegExp(extensions)
    /**/

    const dragOver = (valor) => {
        return event => {
            event.preventDefault()
            setStyles({
                ...styles,
                dragOver: valor
            })
        }
    }

    const subirArchivos = async archivos => {
        let promesas = []
        for(let file of archivos){
            const form = new FormData()
            form.append("images", file)
            promesas = promesas.concat(image.uploadImage(form))
        }
        return (await Promise.all(promesas)).map(res => res.data[0])
    }

    const dropItems = async event => {
        event.preventDefault()
        let extensions = "";
        acceptedExtensions.map((extension, index) => extensions += (extension + ((index+1 === acceptedExtensions.length) ? "" : ", ")))        // setLoading(true)
        let permitido = {
            value: true,
            text: ""
        };
        const archivos = event.dataTransfer ? event.dataTransfer.files : event.target.files
        for(let i=0;i<archivos.length;i++){
            if(!archivos[i].name.match(acceptedPattern)){
                permitido.value = false
                permitido.text = `Solo se admiten extensiones: ${extensions}.`
            }
        }
        if(!multiple && archivos.length !== 1)  {
            permitido.value = false
            permitido.text = "Solo se admite un archivo."
        }
        if(permitido.value) {
            setStyles({
                ...styles,
                incorrect: false
            })
            setLoading(true)
            subirArchivos(archivos).then(res => {
                setLoading(false)
                setLinks(res)
                setFiles(archivos)
            })
        }
        else {
            setStyles({
                ...styles,
                incorrect: {
                    value: true,
                    text: permitido.text
                }
            })
            setFiles([])
            setLinks([])
            setTimeout(() => setStyles({
                ...styles,
                dragOver: false,
                incorrect: {
                    value: false,
                    text: "" 
                }
            }), 2000)
            return
        }
        setStyles({...styles, dragOver: false})
    }
    let uploadButtonProperties = {
        variant: "contained",
        component: "label",
    };
    if(loading){
        uploadButtonProperties = {
            ...uploadButtonProperties, 
            disabled: true
        }
    }

    // Mensaje de error si uploading es INCORRECT
    const getLeyenda = () => {
        extensions = extensions.substring(0, extensions.length - 2)
        return (
            <span style={{color: "white", textAlign: "center", fontWeight: 'bold'}}>{styles.incorrect.text}</span>
        )
    }

    // Saber si un archivo es una imagen (tenga extension .png | .jpeg | .jpg)
    const isAnImage = name => {
        return name.match(new RegExp(".(.png|jpeg|jpg)$"))
    }

    
    // Obtener lista de archivos (con miniatura si es imagen)
    let myLinks = []
    const getFileList = () => {
        links.forEach(link => URL.revokeObjectURL(link))
        try {
            let elems = []
            for(let i=0;i<files.length;i++){
                elems = elems.concat(files[i])
            }
            return (
                <>
                {
                    elems.map((elem, index) => {
                        const link = URL.createObjectURL(elem)
                        myLinks = myLinks.concat(link)
                        return (<li key={index}>{isAnImage(elem.name) ? <img src={link} width="3%"/> : ''}&nbsp;{elem.name} ({Math.round(elem.size/1024)}KB)</li>)
                    }
                    )
                }
            </>
            )
        }catch(err){
            
        }
    }

    const resetFiles = () => {
        setFiles([])
        setLinks([])
    }

    const multiplicidad = multiple ? {'multiple': true} : {}
    const getUploadFile = () => (
        <div style={{
            padding: styles.dragOver ? '2%' : '2%',
            gap: '1%',
            style: 'block',
            borderStyle: styles.dragOver ? 'solid' : "dotted",
            transition: "background .3s",
            background: styles.incorrect.value ? "#8a0f0f" : (styles.dragOver ? "#2287f5" : 'white'),
            color: styles.dragOver ? 'white' : 'black'
        }} onDragOver={dragOver(true)} onDragExit={dragOver(false)} onDrop={dropItems}>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Button
                    {...uploadButtonProperties}
                    >
                    {text}
                    <input
                        type="file"
                        hidden
                        onChange={dropItems}
                        {...multiplicidad}
                        name={name}
                />
                </Button>
                {loading && <CircularProgress size={24}/>}
                <LinearProgress/>
                </div>
                <div style={{width: "100%"}}>
                 <ul style={{display:'flex', flexDirection: 'column', justifyContent: 'center', listStyle: 'none'}}>
                    {getFileList()}
                </ul>
                {
                    styles.incorrect && getLeyenda()
                }
                </div>
        </div>
    )

    return {
        getUploadFile, loading, links, resetFiles
    }
}


export default useFormField