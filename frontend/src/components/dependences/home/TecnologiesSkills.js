import { Card, Paper, Box, Grid } from "@mui/material"
import StarIcon from '@mui/icons-material/Star';
import TecnologySkill from "./TecnologySkill";


const TecnologiesSkills = ({tecnologies}) => {
    return (
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} sx={{textAlign: 'center', margin: 'auto', alignItems: 'center', justifyContent: 'center'}}>
            {
                tecnologies.map(tecnology => (
                    <Grid key={tecnology.id} item xs={4} >
                        <TecnologySkill tecnology={tecnology}/>
                    </Grid>    
                ))
            }
        </Grid>
    )
}

export default TecnologiesSkills