import { TextField } from "@mui/material"
import { useState } from "react"

const useStep4Contact = () => {

    const [fields, setFields] = useState({
        comentarios: {
            type: "text",
            optional: true,
            value: ""
        }
    })

    const resetForm = () => {
        setFields({
            comentarios: {
                ...fields.comentarios,
                value: ""
            }
        })
    }

    const getInputField = nombre => {
        return {
            value: fields[nombre].value,
            onChange: event => {
                setFields({...fields, [nombre]: {...fields[nombre], value: event.target.value}})
                //validar(nombre)
            },
            className: fields[nombre].isCorrect ? '' : "filled-error",  
        }
    }

    const getStep4 = () => (
        <div>
            <div style={{textAlign: 'center'}}>
                <h1>¿Hay algo más que deberíamos saber?</h1>
            </div>
            <TextField
                id="outlined-multiline-flexible"
                label="Comentarios adicionales"
                multiline
                fullWidth
                maxRows={10}
                {...getInputField('comentarios')}
            />            
        </div>
    )

    return {
        getStep4, fields, resetForm
    }
}

export default useStep4Contact