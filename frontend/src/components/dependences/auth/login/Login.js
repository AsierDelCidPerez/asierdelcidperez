import { TextField, Link, Button, Box } from "@mui/material"

export const getLogin = toggleLikeRegistering => (
    <Box component="form" sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center', gap: '5px'}}>
    <h1>Acceder</h1>
      <TextField fullwidth variant="outlined" autoComplete='off' label="Email"/><br/>
      <TextField fullwidth type="password" variant="outlined" label="Contraseña"/>
      <div style={{display: 'flex', justifyContent: 'right', flexDirection: 'column', textAlign: 'right'}}>
        <Link to="#">¿Has olvidado la contraseña?</Link>
        <Link to="#" onClick={toggleLikeRegistering} style={{cursor: 'pointer'}}>¿No tienes cuenta? Registrarse</Link>
      </div>
      <Button fullwidth variant="contained">Acceder</Button>
  </Box>
)
