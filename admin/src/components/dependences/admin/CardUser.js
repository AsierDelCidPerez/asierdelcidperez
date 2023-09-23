import { Card, CardContent, Grid, Typography } from "@mui/material"



const CardUser = ({user}) => {



    return (
        <Card className="specialCardEffect">
            <CardContent style={{minWidth: 500,maxWidth: 500 }}>
                <Grid container>
                    <Grid item xs={3}>
                        <img width="90%" src={user.imageIcon} alt="No tiene imagen de perfil"/>
                    </Grid>
                    <Grid item xs={9}>
                        <Typography sx={{textAlign: 'center'}} variant="h5">{user.name} {user.apellidos}</Typography>
                        <hr/>
                        <div>
                    ID: {user.id}
                </div>
                <div>
                    Email: {user.email}
                </div>
                <div>
                    Tenant: {user.tenant}
                </div>
                <div>
                    Creada en: {user?.createdOn}
                </div>
                    </Grid>
                </Grid>

                <div>
                    Rango: {user.rank}
                </div>

            </CardContent>
        </Card>
    )
}


export default CardUser