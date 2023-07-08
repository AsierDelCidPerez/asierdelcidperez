import { useSelector } from "react-redux"
import CardIcon from "../../others/CardIcon"


const Home = () => {

    

    const icon = {
        name: "fa-solid fa-right-to-bracket",
        color: "secondary"
    }

    const user = useSelector(state => state.user)

    return (
        <div>
            <CardIcon icon={icon} getBody={() => (
                <div>
                    <h1>Bienvenido {user?.nombre}</h1>
                </div>
            )}>

            </CardIcon>
        </div>
    )
}

export default Home