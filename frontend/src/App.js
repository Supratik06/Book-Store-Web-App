import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import {
  BrowserRouter as Router,
  Routes, 
  Route,
  Navigate
} from "react-router-dom";
import Books from './pages/Books';
import AddBooks from './pages/AddBooks';
import Footer from './components/Footer';
import BookDetails from './pages/BookDetails';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { useContext } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

function App() {
  // A Google Client ID is required for real OAuth. Replace with your own.
  const GOOGLE_CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID_HERE.apps.googleusercontent.com";

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <AuthProvider>
      <Router>
      <Navbar/>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route exact path="/" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
        <Route path="/books" element={<ProtectedRoute><Books/></ProtectedRoute>}/>
        <Route path="/books/:id" element={<ProtectedRoute><BookDetails/></ProtectedRoute>}/>
        <Route path="/addBooks" element={<ProtectedRoute><AddBooks/></ProtectedRoute>}/>
        <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
      </Routes>
      <Footer/>
    </Router>
    </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
