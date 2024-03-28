import { Route, Routes } from 'react-router-dom';
import { useState,useEffect } from 'react'
import viteLogo from '/vite.svg'
import HomePage from './Components/HomePage'
import Menu from './Components/Menu';
import AddPatient from './Components/AddPatient';
import Patients from './Components/Patients';
import Vaccination from './Components/Vaccination';
import AddVaccination from './Components/AddVaccination';
import './App.css'

function App() {
 
  return (
    <>
     <Menu/>

   <Routes>
      <Route path='/'         element={<HomePage/>}></Route>
      <Route path='/HomePage' element={<HomePage/>}></Route>
      <Route path='/AddPatient' element={<AddPatient />}></Route>
      <Route path='/Patients' element={<Patients/>}></Route>
      <Route path='/Vaccination' element={<Vaccination/>}></Route>
      <Route path='/AddVaccination' element={<AddVaccination/>} ></Route>



 
    </Routes>

    
    </>
  )
}

export default App
