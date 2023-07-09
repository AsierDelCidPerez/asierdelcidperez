import { useSelector } from "react-redux"
import { Card, CardContent } from "@mui/material"


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
                    <div>
                        <h1>Bienvenid@ {user?.name} {user?.apellidos}</h1>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default Home