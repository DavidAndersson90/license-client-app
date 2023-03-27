
import './App.css';

import Admin from './Admin';
import LicenseRental from './LicenseRental';
import Navigation from './Navigation';

import {BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <div className="container">
     <Navigation/>
     <Routes>
       <Route path='/' element={<LicenseRental/>}/>
       <Route path='/admin' element={<Admin/>}/>
     </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
