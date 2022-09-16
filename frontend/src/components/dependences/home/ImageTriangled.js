import { Card, Typography } from "@mui/material"
import { Box } from "@mui/system"


const ImageTriangled = props => {

    return (
        <div style={{
        background: "linear-gradient(220.55deg, #DD7BFF 0%, #FF6C6C 100%)",
        clipPath: "polygon(0% 15%, 15% 15%, 15% 0%, 85% 0%, 85% 15%, 100% 15%, 100% 85%, 85% 85%, 85% 100%, 15% 100%, 15% 85%, 0% 85%)", /* polygon(100% 0, 100% 71%, 0 100%, 0 19%) */
        margin: '5%',
        backgroundSize: 'cover',
        }}>
            {props.children}
        </div>
    )
}

export default ImageTriangled