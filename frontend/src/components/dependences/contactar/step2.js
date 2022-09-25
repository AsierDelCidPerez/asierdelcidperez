import { Grid, TextField, Radio, FormControl, RadioGroup, FormControlLabel, FormLabel } from "@mui/material"
import { useState } from "react"

const useStep2Contact = () => {

    const [fields, setFields] = useState({
        email: {
            type: "email",
            optional: false,
            value: ""
        },
        telefono: {
            type: "tlf",
            optional: false,
            value: ""
        },
        direccion: {
            type: "text",
            optional: true,
            value: ""
        },
        metodoContacto: {
            type: "text",
            optional: false,
            value: ""
        },
    })

    const resetForm = () => {
        setFields({
            email: {
                ...fields.email,
                value: ""
            },
            telefono: {
                ...fields.telefono,
                value: ""
            },
            direccion: {
                ...fields.direccion,
                value: ""
            },
            metodoContacto: {
                ...fields.metodoContacto,
                value: ""
            },
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

    const getStep2 = () => (
        <div name="step2Contacto" className="animate__animated animate__fadeIn">
                        <div style={{textAlign: 'center'}}>
                            <h1>¿Cómo le podemos contactar a usted?</h1>
                        </div>
                        <Grid name="form2Contacto" container spacing={3} columns={{xs: 6, s: 6, md: 12}}>
                            <Grid name="form2Nombre" item xs={6}>
                                <TextField {...getInputField('email')} type="email" fullWidth variant="outlined" label="Correo Electrónico*" name="nombre"/>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField {...getInputField('telefono')} type="tel" fullWidth variant="outlined" label="Teléfono*" name="tlf"/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField {...getInputField('direccion')} fullWidth variant="outlined" label="Dirección" name="direccion"/>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl>
                                    <FormLabel id="demo-radio-buttons-group-label">¿Cómo quieres que preferiblemente te contactemos?*</FormLabel>
                                    <RadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        name="radio-buttons-group"
                                    >
                                        <FormControlLabel {...getInputField('metodoContacto')} value="Femenino" control={<Radio />} label="Mediante el email" />
                                        <FormControlLabel {...getInputField('metodoContacto')} value="Masculino" control={<Radio />} label="Mediante el teléfono" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </div>
    )

    return {
        getStep2, fields, resetForm
    }
}


export default useStep2Contact