import './App.css';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import RegisterComponent from './components/RegisterComponent';

function App() {
  return (
   <Router>
    <Routes>
      <Route path='/' element={<RegisterComponent/>}/>
    </Routes>
   </Router>
  );
}

export default App;
