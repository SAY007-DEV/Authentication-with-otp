import { useEffect, useState } from 'react'
import './App.css'
import {toast,ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  
  
  useEffect(()=>{
    toast.error("Comming sooon...")
    toast.error('ok')
  },[]);
  return (
 <>
 <ToastContainer/>
      Comming Sooon...
      <br /><br />
      <div class="loader"></div>
    </>
  )
}

export default App
