import { Button, CircularProgress, Container, LinearProgress } from "@mui/material"
import React, {useState} from 'react'
import useImageService from "../../../services/images"
import uris from '../../../urls/uris'


const useFormField = ({name, acceptedExtensions, multiple=false}) => {
    const [loading, setLoading] = useState(false)
    const [styles, setStyles] = useState({
        dragOver: false,
        incorrect: false
    })
    const [files, setFiles] = useState([])

    let links = []
    let extensions = ".("
    acceptedExtensions.forEach(extension => {
        extensions += (extension + "|")
    })
    if(acceptedExtensions.length === 0) return null
    extensions = extensions.substring(0, extensions.length-1)
    extensions += ")$"
    const acceptedPattern = new RegExp(extensions)
    const dragOver = (valor) => {
        return event => {
            event.preventDefault()
            setStyles({
                ...styles,
                dragOver: valor
            })
        }
    }

    const dropItems = async event => {
        event.preventDefault()
        // setLoading(true)
        let permitido = true;
        for(let i=0;i<event.dataTransfer.files.length;i++){
            if(!event.dataTransfer.files[i].name.match(acceptedPattern)){
                permitido = false
            }
        }
        if(permitido) {
            setStyles({
                ...styles,
                incorrect: false
            })
            setFiles(event.dataTransfer.files)
        }
        else {
            setStyles({
                ...styles,
                incorrect: true
            })
            setFiles([])
            setTimeout(() => setStyles({
                ...styles,
                dragOver: false,
                incorrect: false
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

    const getLeyenda = () => {
        let extensions = "";
        acceptedExtensions.forEach(extension => extensions += (extension + ", "))
        extensions = extensions.substring(0, extensions.length - 2)
        return (
            <span style={{color: "white", textAlign: "center", fontWeight: 'bold'}}>Solo se admiten extensiones: {extensions}.</span>
        )
    }

    const isAnImage = name => {
        return name.match(new RegExp(".(.png|jpeg|jpg)$"))
    }

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
                        links = links.concat(link)
                        return (<li key={index}>{isAnImage(elem.name) ? <img src={link} width="3%"/> : ''}&nbsp;{elem.name} ({Math.round(elem.size/1024)}KB)</li>)
                    }
                    )
                }
                {

}
            </>
            )
        }catch(err){
            
        }
    }
    const multiplicidad = multiple ? {'multiple': true} : {}
    const getUploadFile = () => (
        <div style={{
            padding: styles.dragOver ? '2.26%' : '2%',
            gap: '1%',
            style: 'block',
            borderStyle: styles.dragOver ? '' : "dotted",
            transition: "background .3s",
            background: styles.incorrect ? "#8a0f0f" : (styles.dragOver ? "#2287f5" : 'white'),
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
                    Upload File
                    <input
                        type="file"
                        hidden
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
        getUploadFile, files, loading
    }
}


export default useFormField