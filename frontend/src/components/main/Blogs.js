import { Typography, Grid, Divider } from "@mui/material"
import Blog from "../dependences/blogs/Blog"


const blogs = [
    {
        id: 0,
        title: 'C#',
        fecha: "25/09/2022",
        image: 'https://i.imgur.com/tkD6Txw.png',
        description: 'Experiencia elevada en C# en resolución de problemas y alta experiencia en desarrollo machine learning (en especial inteligencia artificial) en el mismo.',
        rating: 4
    },
    {
        id: 1,
        title: 'C#',
        fecha: "25/09/2022",
        image: 'https://i.imgur.com/tkD6Txw.png',
        description: 'Experiencia elevada en C# en resolución de problemas y alta experiencia en desarrollo machine learning (en especial inteligencia artificial) en el mismo.',
        rating: 4
    },
    {
        id: 2,
        title: 'Java',
        fecha: "25/09/2022",
        image: 'https://i.imgur.com/IDV3aib.png',
        description: 'Alta experiencia en Java SE en resolución de problemas, así como en Java EE para la programación web.',
        rating: 5
    },
    {
        id: 3,
        title: 'C#',
        fecha: "25/09/2022",
        image: 'https://i.imgur.com/tkD6Txw.png',
        description: 'Experiencia elevada en C# en resolución de problemas y alta experiencia en desarrollo machine learning (en especial inteligencia artificial) en el mismo.',
        rating: 4
    },
    {
        id: 4,
        title: 'Mi blog',
        fecha: "25/09/2022",
        image: 'https://i.imgur.com/IDV3aib.png',
        description: 'Otro tipo de blog.',
        skill: 5
    },
    {
        id: 5,
        title: 'C#',
        fecha: "25/09/2022",
        image: 'https://i.imgur.com/tkD6Txw.png',
        description: 'Experiencia elevada en C# en resolución de problemas y alta experiencia en desarrollo machine learning (en especial inteligencia artificial) en el mismo.',
        rating: 4
    },
    {
        id: 6,
        title: 'Blog algo más largo',
        fecha: "25/09/2022",
        image: 'https://i.imgur.com/tkD6Txw.png',
        description: 'En este blog, se explicaría pues eso algo con una descripción algo más abundante para poder probar el display Masonry correctamente y poder ver si realmente me gusta y queda como yo pienso, por ello gracias.',
        rating: 4
    },
    {
        id: 7,
        title: 'C#',
        fecha: "25/09/2022",
        image: 'https://i.imgur.com/tkD6Txw.png',
        description: 'Experiencia elevada en C# en resolución de problemas y alta experiencia en desarrollo machine learning (en especial inteligencia artificial) en el mismo.',
        rating: 4
    },
    {
        id: 8,
        title: 'C#',
        fecha: "25/09/2022",
        image: 'https://i.imgur.com/tkD6Txw.png',
        description: 'Experiencia elevada en C# en resolución de problemas y alta experiencia en desarrollo machine learning (en especial inteligencia artificial) en el mismo.',
        rating: 4
    },
    {
        id: 9,
        title: 'Java',
        fecha: "25/09/2022",
        image: 'https://i.imgur.com/IDV3aib.png',
        description: 'Alta experiencia en Java SE en resolución de problemas, así como en Java EE para la programación web.',
        rating: 5
    },
    {
        id: 10,
        title: 'C#',
        fecha: "25/09/2022",
        image: 'https://i.imgur.com/tkD6Txw.png',
        description: 'Experiencia elevada en C# en resolución de problemas y alta experiencia en desarrollo machine learning (en especial inteligencia artificial) en el mismo.',
        rating: 4
    },
    {
        id: 11,
        title: 'Mi blog',
        fecha: "25/09/2022",
        image: 'https://i.imgur.com/IDV3aib.png',
        description: 'Otro tipo de blog.',
        skill: 5
    },
    {
        id: 12,
        title: 'C#',
        fecha: "25/09/2022",
        image: 'https://i.imgur.com/tkD6Txw.png',
        description: 'Experiencia elevada en C# en resolución de problemas y alta experiencia en desarrollo machine learning (en especial inteligencia artificial) en el mismo.',
        rating: 4
    },
    {
        id: 13,
        title: 'Blog algo más largo',
        fecha: "25/09/2022",
        image: 'https://i.imgur.com/tkD6Txw.png',
        description: 'En este blog, se explicaría pues eso algo con una descripción algo más abundante para poder probar el display Masonry correctamente y poder ver si realmente me gusta y queda como yo pienso, por ello gracias.',
        rating: 4
    },
    {
        id: 14,
        title: 'C#',
        fecha: "25/09/2022",
        image: 'https://i.imgur.com/tkD6Txw.png',
        description: 'Experiencia elevada en C# en resolución de problemas y alta experiencia en desarrollo machine learning (en especial inteligencia artificial) en el mismo.',
        rating: 4
    },
    {
        id: 15,
        title: 'C#',
        fecha: "25/09/2022",
        image: 'https://i.imgur.com/tkD6Txw.png',
        description: 'Experiencia elevada en C# en resolución de problemas y alta experiencia en desarrollo machine learning (en especial inteligencia artificial) en el mismo.',
        rating: 4
    },
    {
        id: 16,
        title: 'Java',
        fecha: "25/09/2022",
        image: 'https://i.imgur.com/IDV3aib.png',
        description: 'Alta experiencia en Java SE en resolución de problemas, así como en Java EE para la programación web.',
        rating: 5
    },
    {
        id: 17,
        title: 'C#',
        fecha: "25/09/2022",
        image: 'https://i.imgur.com/tkD6Txw.png',
        description: 'Experiencia elevada en C# en resolución de problemas y alta experiencia en desarrollo machine learning (en especial inteligencia artificial) en el mismo.',
        rating: 4
    },
    {
        id: 18,
        title: 'Mi blog',
        fecha: "25/09/2022",
        image: 'https://i.imgur.com/IDV3aib.png',
        description: 'Otro tipo de blog.',
        skill: 5
    },
    {
        id: 19,
        title: 'C#',
        fecha: "25/09/2022",
        image: 'https://i.imgur.com/tkD6Txw.png',
        description: 'Experiencia elevada en C# en resolución de problemas y alta experiencia en desarrollo machine learning (en especial inteligencia artificial) en el mismo.',
        rating: 4
    },
    {
        id: 20,
        title: 'Blog algo más largo',
        fecha: "25/09/2022",
        image: 'https://i.imgur.com/tkD6Txw.png',
        description: 'En este blog, se explicaría pues eso algo con una descripción algo más abundante para poder probar el display Masonry correctamente y poder ver si realmente me gusta y queda como yo pienso, por ello gracias.',
        rating: 4
    }
]

const Blogs = () => {
    return (
        <div>
            <Typography variant="h4" component="h1" sx={{textAlign: 'center'}}>Blog</Typography><br/>
            <Grid container columns={{md: 12, sm: 8, xs: 4}} spacing={2} sx={{textAlign: 'center'}}>
                {blogs.map(blog => <Grid item xs={4} key={blog.id}><Blog blog={blog}/></Grid>)}
            </Grid>
        </div>
    )
}

export default Blogs