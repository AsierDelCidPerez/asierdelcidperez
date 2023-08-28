
const GenericUserListOptions = () => {

const [openSideBar, setOpenSideBar] = React.useState(false)
const [activeElem, setActiveElem] = React.useState(0)

return (
        <div>
        <Box sx={{display: {md: 'block', sm: 'none', xs: 'none'}}}>
            <Grid container gap={2}>
                <Grid item xs={3}>
                    <ListedNav list={opcionesUsuario} activeElem={activeElem} setActiveElem={setActiveElem}/>
                </Grid>
                <Grid item xs={8}>
                    <Card>
                        <Typography
                        sx={{fontSize: 25, textAlign: 'center', fontWeight: 'bold'}}>
                            <i className={opcionesUsuario[activeElem].icon}/> &nbsp;
                            {opcionesUsuario[activeElem].name}
                        </Typography>
                    </Card>
                    <br/>
                    {opcionesUsuario[activeElem].onClick()}
                </Grid>
            </Grid>
        </Box>
    
    
    
        {
            /*Interfaz para el portal de usuario en móvil */
        }
        <Box sx={{display: {md: 'none', sm: 'block'}}}>
            <ListedNav list={opcionesUsuario} openSideBar={openSideBar} onClose={e => {console.log(e.target)}} activeElem={activeElem} setActiveElem={setActiveElem} setOpenSideBar={setOpenSideBar}/>
            <div style={{textAlign: 'center'}}>
                <Button variant="contained" onClick={() => setOpenSideBar(!openSideBar)}>
                    Abrir opciones
                </Button>
            </div>
            <br/>
            <Typography sx={{textAlign: 'center', fontSize: 20}}>
                <i className={opcionesUsuario[activeElem].icon}/>&nbsp;
                {opcionesUsuario[activeElem].name}
            </Typography>
            <br/>
            {opcionesUsuario[activeElem].onClick()}
        </Box>
        <br/>
    </div>
)



}


export default GenericUserListOptions