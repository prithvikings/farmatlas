import React from 'react'
import { Route, Routes } from "react-router-dom";
import Landing from './page/Landing'
import Support from './page/Support'
import SupportBlog from './components/Landing/SupportBlog';
import Signin from './page/Signin';
import Signup from './page/Signup';

const App = () => {
  
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path='/support' element={<Support />} />
      <Route path="/support/:supportname" element={<SupportBlog />} />
      <Route path='/get-started' element={<Signin />} />
      <Route path='/Signup' element={<Signup />} />
    </Routes>
  )
}

export default App