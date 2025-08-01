import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import RegisterComponent from './components/RegisterComponent';
import HomeComponent from './components/HomeComponent';
import LoginComponent from './components/LoginComponent';
import NotFound from './components/NotFound';
import NotAuthorized from './components/NotAuthorized';

function App() {
  return (
   <Router>
    <Routes>
      <Route path='/' element={<HomeComponent/>}/>
      <Route path='/register' element={<RegisterComponent/>}/>
      <Route path='/login' element={<LoginComponent/>}/>
      
      {/* constrains */}
      <Route path='*' element={<NotFound/>}/>
      <Route path='/not-authorized' element={<NotAuthorized/>}/>
    </Routes>
   </Router>
  );
}

export default App;
