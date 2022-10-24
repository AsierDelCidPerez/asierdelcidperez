
import { Card, CardMedia, CardContent, Typography, CardActions, Button } from "@mui/material"
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { Link } from "react-router-dom";

const Blog = ({blog}) => {
    const getStars = () => {
        let miArray = []
        let miArray2 = []
        for(let i=0;i<blog.rating;i++) miArray = miArray.concat(1)
        for(let i=0;i<(5-blog.rating);i++) miArray2 = miArray2.concat(1)
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
            image={blog.image}
            alt="green iguana"
        />
        <CardContent>
            <div style={{display: 'flex', justifyContent: 'right'}}>
                <Typography variant="body2" component="span">
                    {blog.fecha}
                </Typography>
            </div>
            <Typography gutterBottom variant="h5" component="div">
                {blog.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{fontStyle: 'italic'}}>
                {blog.description}
            </Typography>
        </CardContent>
        <CardContent>
            <Typography gutterBottom variant="h5" component="div">
                {
                    blog.rating ? getStars() : ''
                }
            </Typography>
        </CardContent>
        <CardActions sx={{display: 'flex', justifyContent: 'center'}}>
            <Button size="small" component={Link} to={`/blogs/${blog.id}`}>Ver más</Button>
        </CardActions>
    </Card>
    )
}

export default Blog