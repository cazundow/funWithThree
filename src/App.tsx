import { useState, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Starter from './Pages/starter'
import Earth from './Pages/Earth'
import Wormwhole from './Pages/Wormhole'


function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Starter />} />
        <Route path='/earth' element={<Earth /> }/>
        <Route path ='/wormhole' element={<Wormwhole />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
