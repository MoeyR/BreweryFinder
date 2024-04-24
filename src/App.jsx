import './App.scss';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from "react";
import Home from './Home/Home';
import BreweryDetails from './BreweryDetails/BreweryDetails';


function App() {
  return (
    <>
      <BrowserRouter> 
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/breweries/:breweryId' element={<BreweryDetails />}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
