import { Paper, Typography } from "@mui/material";
import { Container } from "@mui/system";
import ImageTriangled from "../dependences/home/ImageTriangled";
import MainSkills from "../dependences/home/MainSkills"
import TecnologiesSkills from "../dependences/home/TecnologiesSkills";

// Relación de las imagenes w/h = 1,6

// Recogeremos los arrays de la BBDD

const images = [
  {
    label: 'Ingeniero asociado a Microsoft en Inteligencia Artificial',
    imgPath:
      'https://i.ibb.co/tcmVJrX/Azure-AI-Engineer-Associate.png',
  },
  {
    label: 'Desarrollador web moderno especializado en MERN',
    imgPath:
      'https://i.ibb.co/w40TSWz/certificate-fullstack-1.png',
  },
  {
    label: 'Certificado en Oracle Cloud Infrastructure',
    imgPath:
      'https://i.ibb.co/2y4cyWp/Screenshot-2022-09-16-at-15-53-12-e-Certificate-pdf.png',
  },
  {
    label: 'Certificado por Microsoft en varios campos',
    imgPath:
      'https://i.ibb.co/Ks0DVWQ/certificaciones-varias-microsoft.png',
  },
];

const tecnologies = [
  {
    id: 2,
    title: 'Java',
    uri: 'https://i.ibb.co/5vvqTQM/java-1.png',
    description: 'Alta experiencia en Java SE en resolución de problemas, así como en Java EE para la programación web.',
    skill: 5
  },
  {
    id: 1,
    title: 'C#',
    uri: 'https://i.ibb.co/xFfg6jd/csharp9.png',
    description: 'Experiencia elevada en C# en resolución de problemas y alta experiencia en desarrollo machine learning (en especial inteligencia artificial) en el mismo.',
    skill: 4
  }
]

const imagenPortada = "https://i.ibb.co/v1Kftzz/apple-1868496-960-720.png"

const Home = () => {

    return (
        <div>
            <MainSkills images={images}/>
            <br/>
            <br/>
            <br/>
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
            <Paper square sx={{padding: '.5%', textAlign: 'center'}}>
            <Typography sx={{fontSize:'1.5rem'}}>Dominio de aptitudes tecnológicas</Typography> </Paper><br/>
            <TecnologiesSkills tecnologies={tecnologies}/>
            <br/>
        </div>    
    )
}

export default Home