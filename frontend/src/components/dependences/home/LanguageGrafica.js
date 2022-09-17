import { Paper, Container, Typography } from "@mui/material"
import Grafica from "../Grafica"

const data = [
    {
      name: "2002",
      'Java': 24.6,
      'C': 18.83,
      'C++': 14.96,
      'PHP': 7.27,
      'JavaScript': 1.46,
      'SQL': 1.87,
      'C#': .59,
      'Python': 1.04
    },
    {
      name: "2003",
      'Java': 24.23,
      'C': 18.25,
      'C++': 13.19,
      'PHP': 7.61,
      'JavaScript': 2.42,
      'SQL': 2.52,
      'C#': 2.45,
      'Python': 1.03
    },
    {
      name: "2004",
      'Java': 22.56,
      'C': 18.6,
      'C++': 16.08,
      'PHP': 6.31,
      'JavaScript': 1.74,
      'SQL': 3.1,
      'C#': 1.8,
      'Python': 1.01
    },
    {
      name: "2005",
      'Java': 18.34,
      'C': 20.14,
      'C++': 11.93,
      'PHP': 9.48,
      'JavaScript': 1.7,
      'SQL': 2.44,
      'C#': 2.2,
      'Python': 2.51
    },
    {
      name: "2006",
      'Java': 22.25,
      'C': 20.71,
      'C++': 11.46,
      'PHP': 9.4,
      'JavaScript': 1.54,
      'SQL': 2.45,
      'C#': 3.55,
      'Python': 2.6
    },
    {
      name: "2007",
      'Java': 20.89,
      'C': 15.81,
      'C++': 10.42,
      'PHP': 7.94,
      'JavaScript': 2.84,
      'SQL': 2.44,
      'C#': 3.52,
      'Python': 3.5
    },
    {
      name: "2008",
      'Java': 20.85,
      'C': 13.92,
      'C++': 8.73,
      'PHP': 9.2,
      'JavaScript': 3.2,
      'SQL': 2.43,
      'C#': 4.86,
      'Python': 5.54
    },
    {
      name: "2009",
      'Java': 19.02,
      'C': 15.93,
      'C++': 10.12,
      'PHP': 8.88,
      'JavaScript': 3.36,
      'SQL': 2.47,
      'C#': 5.61,
      'Python': 4.73
    },
    {
      name: "2010",
      'Java': 17.48,
      'C': 16.22,
      'C++': 9.71,
      'PHP': 10.07,
      'JavaScript': 2.71,
      'SQL': 2.44,
      'C#': 5.77,
      'Python': 4.45
    },
    {
      name: "2011",
      'Java': 17.77,
      'C': 15.82,
      'Assembly Language': .86,
      'Visual Basic': .26,
      'C++': 8.78,
      'PHP': 7.83,
      'JavaScript': 1.59,
      'SQL': 2.43,
      'C#': 6.23,
      'Python': 6.26
    },
    {
      name: "2012",
      'Java': 17.47,
      'Visual Basic': .48,
      'C': 16.97,
      'Assembly Language': .54,
      'C++': 8.05,
      'PHP': 5.7,
      'JavaScript': 2.32,
      'SQL': 2.46,
      'C#': 8.76,
      'Python': 3.21
    },
    {
      name: "2013",
      'Visual Basic': 1.04,
      'Java': 17.42,
      'C': 17.85,
      'Assembly Language': .67,
      'C++': 9.14,
      'PHP': 5.55,
      'JavaScript': 1.37,
      'SQL': 2.45,
      'C#': 6.2,
      'Python': 4.17
    },
    {
      name: "2014",
      'Java': 16.52,
      'C': 17.94,
      'Assembly Language': .49,
      'Visual Basic': 1.56,
      'C++': 7.56,
      'PHP': 4.61,
      'JavaScript': 1.58,
      'SQL': 2.44,
      'C#': 5.85,
      'Python': 2.37
    },
    {
      name: "2015",
      'Java': 15.53,
      'C': 16.7,
      'Assembly Language': 1.17,
      'Visual Basic': 1.07,
      'C++': 6.7,
      'PHP': 3.78,
      'JavaScript': 3.27,
      'SQL': 2.46,
      'C#': 5.05,
      'Python': 2.61
    },
    {
      name: "2016",
      'Java': 21.47,
      'C': 16.04,
      'Assembly Language': 2.09,
      'Visual Basic': 1.68,
      'C++': 6.91,
      'PHP': 2.71,
      'JavaScript': 2.57,
      'SQL': 2.44,
      'C#': 4.71,
      'Python': 3.85
    },
    {
      name: "2017",
      'Java': 17.28,
      'C': 9.35,
      'Assembly Language': 2.7,
      'Visual Basic': 1.91,
      'C++': 6.3,
      'PHP': 2.56,
      'JavaScript': 2.85,
      'SQL': 2.45,
      'C#': 4.04,
      'Python': 3.46
    },
    {
      name: "2018",
      'Java': 14.22,
      'Visual Basic': 2.31,
      'C': 11.04,
      'Assembly Language': 2.06,
      'C++': 5.6,
      'PHP': 2.53,
      'JavaScript': 3.47,
      'SQL': 2.28,
      'C#': 3.75,
      'Python': 1.04
    },
    {
      name: "2019",
      'Java': 16.9,
      'C': 13.34,
      'Assembly Language': 1.2,
      'Visual Basic': 1.03,
      'C++': 8.16,
      'PHP': 2.68,
      'JavaScript': 3.3,
      'SQL': 1.5,
      'C#': 3.28,
      'Python': 3.78
    },
    {
      name: "2020",
      'Java': 16.9,
      'C': 15.77,
      'Assembly Language': .88,
      'Visual Basic': .83,
      'C++': 5.57,
      'PHP': 2.41,
      'JavaScript': 2.45,
      'SQL': 1.61,
      'C#': 5.35,
      'Python': 9.7
    },
    {
      name: "2021",
      'Java': 11.96,
      'C': 17.38,
      'Assembly Language': 1.64,
      'Visual Basic': 3.84,
      'C++': 7.56,
      'PHP': 1.99,
      'JavaScript': 2.2,
      'SQL': 1.8,
      'C#': 3.95,
      'Python': 11.72
    },
    {
      name: "2022",
      'Java': 10.66,
      'C': 12.44,
      'Assembly Language': 1.85,
      'Visual Basic': 4.74,
      'C++': 8.29,
      'PHP': 1.44,
      'JavaScript': 2.09,
      'SQL': 1.87,
      'C#': 5.68,
      'Python': 13.58,
    },
  ];
  
  const linesForChart = [
    {
      id: 1,
      dataKey: 'Java',
      stroke: '#42d308'
    },
    {
      id: 2,
      dataKey: 'Python',
      stroke: '#05afee'
    },
    {
      id: 3,
      dataKey: 'C',
      stroke: '#022836'
    },
    {
        id: 4,
        dataKey: 'C++',
        stroke: '#f49f04'
    },
    {
        id: 5,
        dataKey: 'C#',
        stroke: '#8004f4'
    },
    {
        id: 6,
        dataKey: 'Visual Basic',
        stroke: '#ea3415'
    },
    {
        id: 7,
        dataKey: 'JavaScript',
        stroke: '#dfc508'
    },
    {
        id: 8,
        dataKey: 'Assembly Language',
        stroke: '#29783c'
    },
    {
        id: 9,
        dataKey: 'SQL',
        stroke: '#0ebba5'
    },
    {
        id: 10,
        dataKey: 'PHP',
        stroke: '#da0977'
    }
  ]  

const LanguageGrafica = () => {
    return (
        <Paper square sx={{padding: '2.5%', display: {xs: 'none', s: 'none', md: 'block'}}}>
              <Typography sx={{
                fontFamily: 'Cascadia Code',
                textAlign: 'center',
                fontSize: 25
              }}>
                Evolución de la popularidad de los lenguajes de programación
              </Typography><br/>
            <Container sx={{display: 'flex', justifyContent: 'center'}}>
              <Grafica data={data} width={1135} height={400} lineCharts={linesForChart}/>
            </Container>
            <span>Fuente: <a href="https://www.tiobe.com/tiobe-index/" target="_blank" rel="noreferrer">Index Tiobe</a></span>
        </Paper>    
    )
}

export default LanguageGrafica