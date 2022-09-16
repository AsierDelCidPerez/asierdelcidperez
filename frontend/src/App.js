import logo from './logo.svg';
import './App.css';
import Navbar from './components/main/Navbar';
import {Routes, Route} from 'react-router-dom'
import Conoceme from './components/main/Conoceme';
import { Container } from '@mui/material';
import Home from './components/main/Home';
import Footer from './components/main/Footer';

function App() {
  return (
    <div>
      <Navbar/>
      <Container>
      <Routes>
        <Route path="/conoceme" element={<Conoceme/>}/>
        <Route path="/" element={<Home/>}/>
      </Routes>
      </Container>
      <Footer/>
    </div>
  );
}

export default App;
