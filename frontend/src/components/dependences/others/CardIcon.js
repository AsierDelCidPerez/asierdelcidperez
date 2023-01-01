import { Fab, Grid, IconButton, Paper } from "@mui/material"
import { fontSize } from "@mui/system"


const CardIcon = ({icon, getBody}) => {


    return (
        <Paper elevation={1}>
            <Grid container>
                <Grid item xs={9}>
                    {getBody()}
                </Grid>
                <Grid item xs={3}>
                    <Fab color={icon.color} style={{cursor: 'default'}}>
                        <i style={{fontSize: 40}} className={icon.name}/>
                    </Fab>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default CardIcon