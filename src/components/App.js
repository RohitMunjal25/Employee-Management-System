import React from 'react';

import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './styling/App.css'; 


import Front from './Front'; 
import Menu from './Menu';
import Add from './Add';
import Delete from './Delete';
import Modify from './Modify';
import Find from './Find';
import FindAll from './Findall';
import AuthPage from './Login';
import SecureRoute from './Secureroute';




function MainLayout() {
  const location = useLocation(); 

  
  const showMenu = location.pathname !== '/front';

  return (
    <div className="container">
      
      {showMenu && <Menu />}
      
      <div className="output">
        <Routes>
          <Route path="/front" element={<Front />} />
          <Route path="/add" element={<Add />} />
          <Route path="/delete" element={<Delete />} />
          <Route path="/modify" element={<Modify />} />
          <Route path="/find" element={<Find />} />
          <Route path="/findall" element={<FindAll />} />
        </Routes>
      </div>
    </div>
  );
}


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SecureRoute><AuthPage/> </SecureRoute>} />
        <Route 
          path="/*" 
          element={
           
              <MainLayout />
           
          } 
        />
      </Routes>
    </Router>
  );
}