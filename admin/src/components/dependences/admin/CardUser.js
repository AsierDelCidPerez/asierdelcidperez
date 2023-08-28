import { Card, CardContent } from "@mui/material"



const CardUser = ({user}) => {



    return (
        <Card sx={{transform: "rotate3d(1, 1, 0, 0deg)"}}>
            <CardContent style={{minWidth: 550 }}>
                Buenos dias
            </CardContent>
        </Card>
    )
}


export default CardUser