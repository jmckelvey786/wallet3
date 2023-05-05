import { Button, Space } from 'antd';
import './stylesheets/text-elements.css'
import './stylesheets/form-elements.css'
import './stylesheets/custom-components.css'
import './stylesheets/theme.css'
import './stylesheets/alignments.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      </Routes>
      </BrowserRouter>
      
    </div>
    
  );
}

export default App;
