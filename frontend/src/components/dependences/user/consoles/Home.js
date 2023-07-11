import { useSelector } from "react-redux"
import { Card, CardContent, Typography } from "@mui/material"


const Home = () => {

    

    const icon = {
        name: "fa-solid fa-right-to-bracket",
        color: "secondary"
    }

    const user = useSelector(state => state.user)

    return (
        <div>
            <Card>
                <CardContent>
                    <div style={{textAlign: 'center'}}>
                        <Typography sx={{display: {xs: 'none', sm: 'none', md: 'block'}}} variant="h3">Bienvenid@ {user?.name} {user?.apellidos}</Typography>

                        <Typography sx={{display: {xs: 'block', sm: 'block', md: 'none'}}} variant="h5">Bienvenid@ {user?.name} {user?.apellidos}</Typography>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default Home