import { Typography } from "@mui/material"
import Blog from "../dependences/blogs/Blog"


const blogs = [
    {
        id: 0,
        title: 'C#',
        image: 'https://i.imgur.com/tkD6Txw.png',
        description: 'Experiencia elevada en C# en resolución de problemas y alta experiencia en desarrollo machine learning (en especial inteligencia artificial) en el mismo.',
        rating: 4
    },
    {
        id: 1,
        title: 'C#',
        image: 'https://i.imgur.com/tkD6Txw.png',
        description: 'Experiencia elevada en C# en resolución de problemas y alta experiencia en desarrollo machine learning (en especial inteligencia artificial) en el mismo.',
        rating: 4
    },
    {
        id: 2,
        title: 'Java',
        image: 'https://i.imgur.com/IDV3aib.png',
        description: 'Alta experiencia en Java SE en resolución de problemas, así como en Java EE para la programación web.',
        rating: 5
    },
    {
        id: 3,
        title: 'C#',
        image: 'https://i.imgur.com/tkD6Txw.png',
        description: 'Experiencia elevada en C# en resolución de problemas y alta experiencia en desarrollo machine learning (en especial inteligencia artificial) en el mismo.',
        rating: 4
    },
    {
        id: 4,
        title: 'Mi blog',
        image: 'https://i.imgur.com/IDV3aib.png',
        description: 'Otro tipo de blog.',
        skill: 5
    },
    {
        id: 5,
        title: 'C#',
        image: 'https://i.imgur.com/tkD6Txw.png',
        description: 'Experiencia elevada en C# en resolución de problemas y alta experiencia en desarrollo machine learning (en especial inteligencia artificial) en el mismo.',
        rating: 4
    },
    {
        id: 6,
        title: 'Blog algo más largo',
        image: 'https://i.imgur.com/tkD6Txw.png',
        description: 'En este blog, se explicaría pues eso algo con una descripción algo más abundante para poder probar el display Masonry correctamente y poder ver si realmente me gusta y queda como yo pienso, por ello gracias.',
        rating: 4
    },
    {
        id: 0,
        title: 'C#',
        image: 'https://i.imgur.com/tkD6Txw.png',
        description: 'Experiencia elevada en C# en resolución de problemas y alta experiencia en desarrollo machine learning (en especial inteligencia artificial) en el mismo.',
        rating: 4
    },
    {
        id: 1,
        title: 'C#',
        image: 'https://i.imgur.com/tkD6Txw.png',
        description: 'Experiencia elevada en C# en resolución de problemas y alta experiencia en desarrollo machine learning (en especial inteligencia artificial) en el mismo.',
        rating: 4
    },
    {
        id: 2,
        title: 'Java',
        image: 'https://i.imgur.com/IDV3aib.png',
        description: 'Alta experiencia en Java SE en resolución de problemas, así como en Java EE para la programación web.',
        rating: 5
    },
    {
        id: 3,
        title: 'C#',
        image: 'https://i.imgur.com/tkD6Txw.png',
        description: 'Experiencia elevada en C# en resolución de problemas y alta experiencia en desarrollo machine learning (en especial inteligencia artificial) en el mismo.',
        rating: 4
    },
    {
        id: 4,
        title: 'Mi blog',
        image: 'https://i.imgur.com/IDV3aib.png',
        description: 'Otro tipo de blog.',
        skill: 5
    },
    {
        id: 5,
        title: 'C#',
        image: 'https://i.imgur.com/tkD6Txw.png',
        description: 'Experiencia elevada en C# en resolución de problemas y alta experiencia en desarrollo machine learning (en especial inteligencia artificial) en el mismo.',
        rating: 4
    },
    {
        id: 6,
        title: 'Blog algo más largo',
        image: 'https://i.imgur.com/tkD6Txw.png',
        description: 'En este blog, se explicaría pues eso algo con una descripción algo más abundante para poder probar el display Masonry correctamente y poder ver si realmente me gusta y queda como yo pienso, por ello gracias.',
        rating: 4
    },
    {
        id: 7,
        title: 'C#',
        image: 'https://i.imgur.com/tkD6Txw.png',
        description: 'Experiencia elevada en C# en resolución de problemas y alta experiencia en desarrollo machine learning (en especial inteligencia artificial) en el mismo.',
        rating: 4
    },
    {
        id: 8,
        title: 'C#',
        image: 'https://i.imgur.com/tkD6Txw.png',
        description: 'Experiencia elevada en C# en resolución de problemas y alta experiencia en desarrollo machine learning (en especial inteligencia artificial) en el mismo.',
        rating: 4
    },
    {
        id: 9,
        title: 'Java',
        image: 'https://i.imgur.com/IDV3aib.png',
        description: 'Alta experiencia en Java SE en resolución de problemas, así como en Java EE para la programación web.',
        rating: 5
    },
    {
        id: 10,
        title: 'C#',
        image: 'https://i.imgur.com/tkD6Txw.png',
        description: 'Experiencia elevada en C# en resolución de problemas y alta experiencia en desarrollo machine learning (en especial inteligencia artificial) en el mismo.',
        rating: 4
    },
    {
        id: 11,
        title: 'Mi blog',
        image: 'https://i.imgur.com/IDV3aib.png',
        description: 'Otro tipo de blog.',
        skill: 5
    },
    {
        id: 12,
        title: 'C#',
        image: 'https://i.imgur.com/tkD6Txw.png',
        description: 'Experiencia elevada en C# en resolución de problemas y alta experiencia en desarrollo machine learning (en especial inteligencia artificial) en el mismo.',
        rating: 4
    },
    {
        id: 13,
        title: 'Blog algo más largo',
        image: 'https://i.imgur.com/tkD6Txw.png',
        description: 'En este blog, se explicaría pues eso algo con una descripción algo más abundante para poder probar el display Masonry correctamente y poder ver si realmente me gusta y queda como yo pienso, por ello gracias.',
        rating: 4
    }
]

const Blogs = () => {


    return (
        <div>
            <Typography variant="h4" component="h1">Blogs</Typography>
            <Masonry columns={{md: 4}}>
                {blogs.map(blog => <Blog blog={blog}/>)}
            </Masonry>
        </div>
    )
}