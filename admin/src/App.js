import './App.css';
import { Route, Routes } from 'react-router-dom';
import Auth from './components/main/Auth';
import Dashboard from './components/main/Dashboard';
import Logout from './components/main/Logout';
import AdminUser from './components/main/AdminUser'
import { useNavbar } from './components/main/Navbar';
import { useEffect } from 'react';
import ManageUser from './components/dependences/admin/ManageUser';

const App = () => {

  const [getNavbar, setVisible, setActiveElem] = useNavbar()

  useEffect(() => {
    setVisible(false)
  }, [])

  return (
    <div>
      {getNavbar()}
      <Routes>
        <Route element={<ManageUser setVisible={setVisible}/>} path="/dashboard/user/manage/:id"/>
        <Route element={<AdminUser setVisible={setVisible} setActiveElem={setActiveElem}/>} path="/dashboard/user"/>
        <Route element={<Dashboard setActiveElem={setActiveElem} setVisible={setVisible}/>} path="/dashboard"/>
        <Route element={<Logout/>} path="/logout"/>
        <Route element={<Auth/>} path='/'/>
      </Routes>
    </div>
/*
    <div>
      <br/>
      {getFrontEnd()}
    </div>
*/
  )

}

export default App;
