import { Button, Space } from 'antd';
import './stylesheets/text-elements.css'
import './stylesheets/form-elements.css'
import './stylesheets/custom-components.css'
import './stylesheets/theme.css'
import './stylesheets/alignments.css'
import './stylesheets/layout.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './pages/Login';
import Register from './pages/Register';
import Home from "./pages/Home/index";
import ProtectedRoute from '../src/components/protectedRoute';
import PublicRoute from './components/publicRoute';
import { RegisterUser } from './apicalls/users';
import Loader from './components/loader';
import { useSelector } from 'react-redux';
import DefaultLayout from './components/DefaultLayout';
import Transactions from './pages/Transactions';
import PageTitle from './components/pageTitle';
// const env = require("dotenv").config();



function App() {
  const {loading} = useSelector(state=>state.loaders)
  return (
    <div>
      {loading && <Loader/>}
      <BrowserRouter>
        <Routes>
          {/* <Route path="/login" element={<PublicRoute><Login/></PublicRoute>}/>
          <Route path="/register" element={<PublicRoute><Register/></PublicRoute>}/> */}
          <Route path="/" element={<PublicRoute><Home/></PublicRoute>}/>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/register" element={<Register/>}></Route>
          {/* <Route path="/" element={<DefaultLayout><Home/><PageTitle/></DefaultLayout>}></Route> */}
          {/* <Route path="/" element={<Home></Home>}></Route> */}
          <Route path="/transactions" element={<DefaultLayout><Transactions/></DefaultLayout>}></Route>
        </Routes>
      </BrowserRouter>
      
    </div>
    
  );
}

export default App;
