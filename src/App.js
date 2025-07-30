import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import RegisterComponent from './components/RegisterComponent';
import HomeComponent from './components/HomeComponent';

function App() {
  return (
   <Router>
    <Routes>
      <Route path='/' element={<HomeComponent/>}/>
      <Route path='/register' element={<RegisterComponent/>}/>
    </Routes>
   </Router>
  );
}

export default App;
