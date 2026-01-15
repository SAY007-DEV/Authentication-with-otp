import { useEffect, useState } from 'react'
import './App.css'
import {toast,ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import RegisterPage from './pages/RegisterPage'
import { Route, Routes } from 'react-router-dom'
import OTPPage from './pages/OTPPage'
import Home from './pages/Home'


function App() {
  
  
 
  return (
 <>
 <ToastContainer/>
     
      {/* <RegisterPage/> */}
{/* routes */}
<Routes>
  <Route path='/otp' element={<OTPPage/>}></Route>
  <Route path='/register' element={<RegisterPage/>}></Route>
  <Route path='/' element={<RegisterPage/>}></Route>
  <Route path='/home' element={<Home/>}></Route>
</Routes>
    </>
  )
}

export default App
