import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

/*
Tecnology struct {
    id: Integer,
    title: String,
    description: String,
    uri: String,
    skill: Integer
}
*/

const TecnologySkill = ({tecnology}) => {
    const getStars = () => {
        let miArray = []
        let miArray2 = []
        for(let i=0;i<tecnology.skill;i++) miArray = miArray.concat(1)
        for(let i=0;i<(5-tecnology.skill);i++) miArray2 = miArray2.concat(1)
        return (
            <div style={{display: 'flex', justifyContent: 'center'}}>
            {
                miArray.map((e, index) => e === 1 ? <StarIcon key={index}/> : '')
            }   
            {   
                miArray2.map((e, index) => e === 1 ? <StarBorderIcon key={index}/> : '')
            }
            </div>
        )
    }

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                component="img"
                height="140"
                image={tecnology.uri}
                alt="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {tecnology.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{fontStyle: 'italic'}}>
                    {tecnology.description}
                </Typography>
            </CardContent>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {
                        tecnology.skill !== -1 ? getStars() : ''
                    }
                </Typography>
            </CardContent>
        </Card>
    )
}

export default TecnologySkill