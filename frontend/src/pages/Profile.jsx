import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="bg-dark text-white d-flex justify-content-center align-items-center" style={{ minHeight: "91.5vh" }}>
      <div className="container d-flex justify-content-center">
        <div style={{
          background: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(15px)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "20px",
          padding: "40px",
          maxWidth: "500px",
          width: "100%",
          boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
          textAlign: "center"
        }}>
          <div 
            style={{ 
              width: "100px", 
              height: "100px", 
              background: "linear-gradient(135deg, #00c6ff, #0072ff)", 
              borderRadius: "50%", 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center", 
              fontSize: "40px", 
              fontWeight: "bold",
              margin: "0 auto 20px auto"
            }}
          >
            {user.username ? user.username.charAt(0).toUpperCase() : 'U'}
          </div>
          <h2 className="mb-3" style={{ background: "linear-gradient(to right, #00c6ff, #0072ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontWeight: "bold" }}>
            {user.username}
          </h2>
          <p className="text-muted mb-4" style={{ fontSize: "18px" }}>{user.email}</p>
          
          <div className="d-flex justify-content-center gap-3">
            <button className="btn btn-primary px-4 rounded-pill" onClick={() => navigate('/books')}>Browse Books</button>
            <button className="btn btn-outline-danger px-4 rounded-pill" onClick={handleLogout}>Sign Out</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
