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


function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/" />;
}


function MainLayout() {
  const location = useLocation(); 

  
  const showMenu = location.pathname !== '/front';

  return (
    <div className="container">
      {/* Conditionally render the Menu based on our rule */}
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
        <Route path="/" element={<AuthPage />} />
        <Route 
          path="/*" 
          element={
            <PrivateRoute>
              <MainLayout />
            </PrivateRoute>
          } 
        />
      </Routes>
    </Router>
  );
}