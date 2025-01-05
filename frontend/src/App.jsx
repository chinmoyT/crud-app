import { useEffect, useState } from 'react';
import './App.css'
import Users from './components/Users'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from 'firebase/auth';
import {auth} from './firebase/firebase_config'
import LoginPage from './components/LoginPage'

function App() {

  const [user, setUser] = useState(null)
  useEffect(()=> {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  },[])
  return (
    
    <Router>
      <Routes>
        <Route path='/' element={!user ? <LoginPage /> : <Navigate to="/user" replace />} />
        <Route path="/user"element={user ? <Users /> : <Navigate to="/" replace />}
        />
      </Routes>
    </Router>
    
  )
}

export default App
