import logo from './logo.svg';
import './App.css';
import {Button, Card, CardContent, CardHeader, Typography} from '@mui/material'
import uris from './settings/uris';
import {useDispatch, useSelector} from 'react-redux'
import { actOfSetAdmin } from './redux/reducers/admin';
import useAdminService from './services/admin';
import { useNotification } from './components/dependences/Notification';
import {useEffect} from 'react'
import { getUriParam } from './utils/uri';
import { Route, Routes } from 'react-router-dom';
import Auth from './components/main/Auth';
import Dashboard from './components/main/Dashboard';

const App = () => {


  return (
    <div>
      <Routes>
        <Route element={<Dashboard/>} path='/dashboard'/>
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
