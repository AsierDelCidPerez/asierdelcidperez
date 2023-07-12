import { useState } from "react"
import useFormField from "../inputs/FormFile"

const useStep3Contact = () => {

    const uploadFile = useFormField({name: 'uploadingFiles', acceptedExtensions: ["jpg", "png", "jpeg"], multiple: true, text: "Subir imágenes"})

    const fields = {
        uploadFiles: {
            type: "array",
            optional: true,
            value: uploadFile.links
        }
    }

    const resetForm = () => {
        uploadFile.resetFiles()
    }

    const getStep3 = () => (
        <div>
            <div style={{textAlign: 'center'}}>
                <h1>Añada imágenes que nos puedan ayudar</h1>
            </div>
            {uploadFile.getUploadFile()}
        </div>
    )

    return {
        getStep3, fields, resetForm
    }
}


export default useStep3Contact