import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Mainpage from './pages/main/Mainpage';
import Login from './pages/login/Login';
import SignUp from './pages/signUp/SignUp';
import { useSelector } from 'react-redux';
import Profile from './pages/profile/Profile';
import Layout from './component/layout/Layout';
import TermCondition from './pages/setting/TermCondition';
import PrivacyPolicy from './pages/setting/PrivacyPolicy';
import Settings from './pages/setting/Settings';
import ContactUs from './pages/setting/ContactUs';
import ChangePassword from './pages/setting/ChangePassword';
import DeleteAccount from './pages/setting/DeleteAccount';
import Forgot from './pages/forgot/Forgot';


const App = () => {
  const { user } = useSelector((state) => state.userAuth);
  return (
    <Router>
      <Routes>
        {user &&
          <Route exact path="/" element={<Layout />} >
            <Route exact path="/" element={<Navigate to="/profile" replace />} />
            <Route exact path="/profile" element={<Profile />} />
            <Route exact path="/setting" element={<Settings />}>
              <Route exact path="/setting" element={<Navigate to="/setting/term" replace />} />
              <Route exact path="/setting/term" element={<TermCondition />} />
              <Route exact path="/setting/privacy" element={<PrivacyPolicy />} />
              <Route exact path="/setting/contact" element={<ContactUs />} />
              <Route exact path="/setting/change_password" element={<ChangePassword />} />
              <Route exact path="/setting/delet_account" element={<DeleteAccount />} />
            </Route>
            <Route path='*' element={<Navigate to="/profile" replace />} />
          </Route>
        }
        {!user &&
          <>
            <Route exact path='/' element={<Mainpage />} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/signUp' element={<SignUp />} />
            <Route exact path='/forgot' element={<Forgot />} />
            <Route path='*' element={<Navigate to="/" replace />} />

          </>
        }
      </Routes>
    </Router>
  )
}

export default App
