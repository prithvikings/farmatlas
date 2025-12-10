import React from 'react'
import { Route, Routes } from "react-router-dom";
import Landing from './page/Landing'
import Support from './page/Support'
import SupportBlog from './components/Landing/SupportBlog';
import Signin from './page/Signin';
import Signup from './page/Signup';
import ForgotEmail from './page/ForgotEmail';
import SendOtp from './page/SendOtp';
import AdminDashboard from './page/AdminDashboard';
import WorkerDashboard from './page/WorkerDashboard';
import VetDashboard from './page/VetDashboard';
import OTPDialog from './components/otpdialog';
import ResetPassword from './page/Resetpassword';

const App = () => {
  
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path='/support' element={<Support />} />
      <Route path="/support/:supportname" element={<SupportBlog />} />
      <Route path='/signin' element={<Signin />} />
      <Route path='/Signup' element={<Signup />} />
      <Route path='/forgot-password' element={<ForgotEmail />} />
      <Route path='/send-otp' element={<SendOtp />} />
      <Route path='/reset-password' element={<ResetPassword />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/worker" element={<WorkerDashboard />} />
      <Route path="/vet" element={<VetDashboard />} />

    </Routes>
  )
}

export default App