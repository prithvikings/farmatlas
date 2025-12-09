import React from 'react'
import { Route, Routes } from "react-router-dom";
import Landing from './page/Landing'
import Support from './page/Support'
import SupportBlog from './components/Landing/SupportBlog';

const App = () => {
  
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path='/support' element={<Support />} />
      <Route path="/support/:supportname" element={<SupportBlog />} />
    </Routes>
  )
}

export default App