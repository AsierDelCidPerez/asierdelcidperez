
import { Paper, Typography } from "@mui/material"
import { useParams } from "react-router-dom"
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';

const ABlog = () => {
    const params = useParams()
    const id = params.id

    const blog = {
        id: 20,
        title: 'Blog algo más largo',
        fecha: "25/09/2022",
        image: 'https://i.imgur.com/tkD6Txw.png',
        text: "Sunt pariatur eu nostrud ex. Sint ipsum irure qui ut Lorem incididunt esse id enim. Esse irure non ullamco consequat excepteur culpa nostrud dolor eiusmod tempor elit sunt laboris. Cillum eu anim tempor aute incididunt id non tempor eiusmod aliquip qui id. Consequat velit occaecat qui anim aute. Cillum et consectetur cillum sint sunt ut consequat incididunt quis deserunt enim sint culpa anim.Ullamco ea enim anim aute non velit ut. Incididunt in incididunt deserunt non incididunt Lorem do et occaecat eiusmod laboris. Dolore est officia amet aute ad est incididunt et excepteur. Laboris excepteur pariatur fugiat non fugiat non occaecat et et deserunt eiusmod consequat. Aliquip est veniam incididunt dolore voluptate Lorem.Sunt occaecat aliqua commodo ea aute occaecat ex tempor sint laboris aute tempor. Sunt exercitation in exercitation consequat irure irure aliquip anim irure magna aliquip sit enim. Ad id ad laborum ad dolor enim voluptate in aute voluptate ipsum Lorem.Et excepteur dolor minim reprehenderit consequat in amet veniam sint ut. Culpa elit nulla consectetur officia cupidatat laboris incididunt sunt elit. Excepteur anim quis occaecat id magna aliquip.",
        description: 'En este blog, se explicaría pues eso algo con una descripción algo más abundante para poder probar el display Masonry correctamente y poder ver si realmente me gusta y queda como yo pienso, por ello gracias.',
        rating: 4
    }


    return (
        <div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
            <img alt="Imagen del blog" height="200px" src={blog.image}/>
            </div>
            <br/><br/>
            <Typography sx={{textAlign: 'justify'}} variant="h4" component="h1">{blog.title}</Typography>
            <div style={{display: 'flex', justifyContent: 'center', textAlign: 'justify'}}>
                <Typography variant="body1" component="p" dangerouslySetInnerHTML={{__html: blog.description}}/>
            </div>
            <Typography variant="body2" component="p" dangerouslySetInnerHTML={{__html: blog.text}}/>
            <br/><br/>
        </div>
    )
}

export default ABlog