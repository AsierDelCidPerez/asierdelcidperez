import { Grid, TextField, Radio, FormControl, RadioGroup, FormControlLabel, FormLabel } from "@mui/material"
import { useState } from "react"

const useStep1Contact = () => {

    const [fields, setFields] = useState({
        nombre: {
            type: "text",
            optional: false,
            value: ""
        },
        apellidos: {
            type: "text",
            optional: false,
            value: ""
        },
        otroNombre: {
            type: 'text',
            optional: true,
            value: "",
        },
        businessName: {
            type: "text",
            optional: true,
            value: ""
        },
        genero: {
            type: "text",
            optional: false,
            value: ""
        },
        campoInteres: {
            type: "text",
            optional: false,
            value: ""
        }
    })

    const resetForm = () => {
        setFields({
            nombre: {
                ...fields.nombre,
                value: ""
            },
            apellidos: {
                ...fields.apellidos,
                value: ""
            },
            otroNombre: {
                ...fields.otroNombre,
                value: "",
            },
            businessName: {
                ...fields.businessName,
                value: ""
            },
            genero: {
                ...fields.genero,
                value: ""
            },
            campoInteres: {
                ...fields.campoInteres,
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

    const getStep1 = () => (
        <div name="step1Contacto" className="animate__animated animate__fadeIn">
                        <div style={{textAlign: 'center'}}>
                            <h1>Háblenos un poco de usted...</h1>
                        </div>
                        <Grid name="form1Contacto" container spacing={3} columns={{xs: 6, s: 6, md: 12}}>
                            <Grid name="form1Nombre" item xs={6}>
                                <TextField {...getInputField('nombre')} fullWidth variant="outlined" label="Nombre*" name="nombre"/>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField {...getInputField('apellidos')} fullWidth variant="outlined" label="Apellidos*" name="apellidos"/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField {...getInputField('otroNombre')} fullWidth variant="outlined" label="¿Quieres que te llamemos de otra forma?" name="otroNombre"/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField {...getInputField('businessName')} fullWidth variant="outlined" label="Nombre de la empresa" name="empresa"/>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl>
                                    <FormLabel id="demo-radio-buttons-group-label">Género*</FormLabel>
                                    <RadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        name="radio-buttons-group"
                                    >
                                        <FormControlLabel {...getInputField('genero')} value="Femenino" control={<Radio />} label="Femenino" />
                                        <FormControlLabel {...getInputField('genero')} value="Masculino" control={<Radio />} label="Masculino" />
                                        <FormControlLabel {...getInputField('genero')} value="Prefiero no decirlo" control={<Radio />} label="Prefiero no decirlo" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                            
                            <Grid item xs={6}>
                            <FormControl>
                                    <FormLabel id="demo-radio-buttons-group-label">Campo con el que te relacionas*</FormLabel>
                                    <RadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        name="radio-buttons-group"
                                    >
                                        <FormControlLabel {...getInputField('campoInteres')} value="Nuevas tecnologías" control={<Radio />} label="Nuevas tecnologías" />
                                        <FormControlLabel {...getInputField('campoInteres')} value="Informática" control={<Radio />} label="Informática" />
                                        <FormControlLabel {...getInputField('campoInteres')} value="Matemáticas" control={<Radio />} label="Matemáticas" />
                                        <FormControlLabel {...getInputField('campoInteres')} value="Ciencias" control={<Radio />} label="Ciencias" />
                                        <FormControlLabel {...getInputField('campoInteres')} value="Otro distinto" control={<Radio />} label="Otro distinto" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </div>
    )

    return {
        getStep1, fields, resetForm
    }
}


export default useStep1Contact