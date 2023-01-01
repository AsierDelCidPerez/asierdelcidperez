import CardIcon from "../../others/CardIcon"


const Home = () => {

    const icon = {
        name: "fa-solid fa-right-to-bracket",
        color: "secondary"
    }

    return (
        <div>
            <CardIcon icon={icon} getBody={() => (
                <div>
                    <p>Hola mundo!!!</p>
                </div>
            )}>

            </CardIcon>
        </div>
    )
}

export default Home