import logo from './logo.svg';
import './App.css';
import Navbar from './components/main/Navbar';
import {Routes, Route} from 'react-router-dom'
import Conoceme from './components/main/Conoceme';
import { Container } from '@mui/material';
import Home from './components/main/Home';
import Footer from './components/main/Footer';
import Contacto from './components/main/Contacto';
import Notification from './components/main/Notification';
import Documentation from './components/main/Documentation';
import 'https://kit.fontawesome.com/c86d60ac91.js'
import Blogs from './components/main/Blogs';
import ABlog from './components/main/ABlog';

function App() {
  return (
    <div>
      <Navbar/>
      <Container>
      <Notification/>
      <Routes>
        <Route path="/blogs/:id" element={<ABlog/>}/>
        <Route path="/blogs" element={<Blogs/>}/>
        <Route path="/conoceme" element={<Conoceme/>}/>
        <Route path="/contactar" element={<Contacto/>}/>
        <Route path="/legal" element={<Documentation/>}/>
        <Route path="/" element={<Home/>}/>
      </Routes>
      </Container>
      <Footer/>
    </div>
  );
}

export default App;
