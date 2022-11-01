import { TextField, Link, Button, Box, Checkbox, FormControlLabel } from "@mui/material"

export const getSignIn = toggleLikeRegistering => {

    return (
        <>
        <div style={{display: 'flex', justifyContent: 'center'}}>
        <img src="./logoColor.png" width="18%"/>
        </div>
            <Box component="form" sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center', gap: '5px'}}>
                <h1>Registrarse</h1>
                <TextField fullwidth variant="outlined" autoComplete='off' label="Nombre"/><br/>
                <TextField fullwidth variant="outlined" autoComplete='off' label="Apellidos"/><br/>
                <TextField fullwidth variant="outlined" autoComplete='off' label="Email"/><br/>
                <TextField fullwidth type="password" variant="outlined" label="Contraseña"/>
                <TextField fullwidth type="password" variant="outlined" label="Confirmar contraseña"/>
                <FormControlLabel control={<Checkbox />} label="Acepto los términos legales y de privacidad" />
                    <div style={{display: 'flex', justifyContent: 'right', flexDirection: 'column', textAlign: 'right'}}>
                    <Link to="#">¿Has olvidado la contraseña?</Link>
                    <Link to="#" style={{cursor: 'pointer'}} onClick={toggleLikeRegistering}>¿Has cambiado de idea? Acceder</Link>
                </div>
                <Button fullwidth variant="contained">Registrarse</Button>
            </Box>
        </>
    )
}