import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/login/Login';
import { useSelector } from 'react-redux';
import Home from './pages/home/Home';
import Layout from './component/layout/Layout';
import Faqs from './pages/Faq\'s/Faqs';
import User from './pages/user/User';
import Inquiry from './pages/inquiry/Inquiry';
import UserDetails from './pages/user/UserDetails';
import ForgotPassword from './pages/forgot/ForgotPassword';


const App = () => {
  const { user } = useSelector((state) => state.userAuth);
  return (
    <Router>
      <Routes>
        {user &&
          <Route exact path="/" element={<Layout />} >
            <Route exact path="/" element={<Navigate to="/home" replace />} />
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/user" element={<User />} />
            <Route exact path="/user/:user_id" element={<UserDetails />} />
            <Route exact path="/faqs" element={<Faqs />} />
            <Route exact path="/inquiry" element={<Inquiry />} />
            <Route path='*' element={<Navigate to="/home" replace />} />
          </Route>
        }
        {!user &&
          <>
            <Route exact path='/' element={<Navigate to="/login" replace />} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/forgot' element={<ForgotPassword />} />
            <Route path='*' element={<Navigate to="/" replace />} />
          </>
        }
      </Routes>
    </Router>
  )
}

export default App
