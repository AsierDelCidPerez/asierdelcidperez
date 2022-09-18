import { Paper, Typography } from "@mui/material";
import { Container } from "@mui/system";
import ImageTriangled from "../dependences/home/ImageTriangled";
import LanguageGrafica from "../dependences/home/LanguageGrafica";
import MainSkills from "../dependences/home/MainSkills"
import TecnologiesSkills from "../dependences/home/TecnologiesSkills";
import { Box } from "@mui/system";
// Relación de las imagenes w/h = 1,6 y 950w

// Recogeremos los arrays de la BBDD

const images = [
  {
    label: 'Ingeniero asociado a Microsoft en Inteligencia Artificial',
    imgPath:
      'https://i.imgur.com/7GgS9TX.png',
  },
  {
    label: 'Desarrollador web moderno especializado en MERN',
    imgPath:
      'https://i.imgur.com/6DB3I3k.png',
  },
  {
    label: 'Certificado en Oracle Cloud Infrastructure',
    imgPath:
      'https://i.imgur.com/HH6dJmX.png',
  },
  {
    label: 'Certificado por Microsoft en varios campos',
    imgPath:
      'https://i.imgur.com/1jRTIQO.png',
  },
];

const tecnologies = [
  {
    id: 2,
    title: 'Java',
    uri: 'https://i.imgur.com/IDV3aib.png',
    description: 'Alta experiencia en Java SE en resolución de problemas, así como en Java EE para la programación web.',
    skill: 5
  },
  {
    id: 1,
    title: 'C#',
    uri: 'https://i.imgur.com/tkD6Txw.png',
    description: 'Experiencia elevada en C# en resolución de problemas y alta experiencia en desarrollo machine learning (en especial inteligencia artificial) en el mismo.',
    skill: 4
  }
]


const imagenPortada = "https://i.ibb.co/v1Kftzz/apple-1868496-960-720.png"

const Home = () => {

    return (
        <div>
          <Box sx={{
            clipPath: "polygon(73% 75%, 100% 0, 100% 100%, 75% 100%, 0 100%, 47% 77%, 0 0)",
            background: "linear-gradient(220.55deg, #3793FF 0%, #0017E4 100%)",
            position: "absolute",
            zIndex: -1,
            width: "120%",
            right: '0%',
            height: "80%",
            display: {
              sm: 'none',
              xs: 'none',
              md: 'block'
            }
          }}/>
          <Box sx={{
            clipPath: "polygon(0 85%, 100% 0, 78% 100%, 67% 53%)",
            background: "linear-gradient(220.55deg, #3793FF 0%, #0017E4 100%)",
            position: "absolute",
            zIndex: -1,
            width: "100%",
            right: '0%',
            height: "170%",
            display: {
              sm: 'block',
              xs: 'block',
              md: 'none'
            }
          }}/>
            <MainSkills images={images}/>
            <br/>
            <br/>
            <br/>
            { /*
            <Container sx={{display: {xs: 'none', s: 'none', md: 'block'}}}>
              <ImageTriangled imageUri={imagenPortada}>
                <Typography sx={{
                  fontSize: '10.5rem',
                  height: '100%',
                  fontFamily: 'Ms Madi',
                  textAlign: 'center',
                  alignItems: 'center',
                  alignContent: 'center'
                }}>Simply Modern</Typography>
              </ImageTriangled>
            </Container>
            */
            }

            <Paper square sx={{padding: '.5%', textAlign: 'center'}}>
            <Typography sx={{fontSize:'1.5rem'}}>Dominio de aptitudes tecnológicas</Typography> </Paper><br/>
            <TecnologiesSkills tecnologies={tecnologies}/>
            <br/>
            <LanguageGrafica/>
            <br/>
        </div>    
    )
}

export default Home