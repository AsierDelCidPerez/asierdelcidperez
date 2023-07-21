import { useSelector } from "react-redux"
import { Card, CardContent, Typography } from "@mui/material"
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import { useState } from "react";
import MyCalendar from "../../inputs/MyCalendar";

const Home = () => {

    const[date, setDate] = useState(new Date())

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
            <br/>
            <Card>
                <CardContent>
                    <div style={{textAlign: 'center'}}>
                        <MyCalendar/>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default Home