import React, { useEffect, useState } from 'react'
import Header from './Components/Header'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from './Components/Signup'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from './Firebase/firebase';
import Home from './Components/Home';
import Login from './Components/Login';
import ProtectedRoute from './Routes/Routes';
import 'bootstrap/dist/css/bootstrap.min.css'


const Pr12 = () => {
  const [logIn, setLogIn] = useState(null)

  useEffect(() => {
    const auth = getAuth(app);
    onAuthStateChanged(auth, (user) => {
      if (user) {

        const uid = user.uid;
        setLogIn(uid)
        // ...
      } else {

        setLogIn(null)
      }
    });
  }, [])

  useEffect(() => {

  }, [logIn])

  return (
    <BrowserRouter>
      <Header logIn={logIn} setLogIn={setLogIn} />
      <Routes>
        <Route path='/' element={<ProtectedRoute logIn={logIn} setLogIn={setLogIn} Cmp={<Home />} />} />
        <Route path='/login' element={<Login logIn={logIn} setLogIn={setLogIn} />} />
        <Route path='/signup' element={<Signup logIn={logIn} setLogIn={setLogIn} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Pr12
