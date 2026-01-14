import { useEffect, useState } from 'react'
import './App.css'
import {toast,ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Register from './pages/Register';

function App() {
  
  
  // useEffect(()=>{
  //   toast.error("Comming sooon...")
  //   toast.error('ok')
  // },[]);
  return (
 <>
 <ToastContainer/>
      {/* Comming Sooon...
      <br /><br />
      <div class="loader"></div> */}
      <Register/>
{/* routes */}

    </>
  )
}

export default App
