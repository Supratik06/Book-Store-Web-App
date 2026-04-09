import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <Link className="navbar-brand" to="/">Books Bank</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
              {user ? (
                <>
                  <Link className="nav-item nav-link active" to="/">Home</Link>
                  <Link className="nav-item nav-link active" to="/books">Books</Link>   
                  <Link className="nav-item nav-link active" to="/addBooks">Add Books</Link>
                  
                  <li className="nav-item ms-3" style={{ position: "relative" }}>
                    <button 
                      className="btn btn-dark text-white px-3 fw-bold rounded-pill d-flex align-items-center gap-2" 
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      style={{ border: "1px solid rgba(255,255,255,0.2)" }}
                    >
                      {user.username || 'Profile'} ▼
                    </button>
                    {isDropdownOpen && (
                      <div className="dropdown-menu shadow border-0 show" style={{ position: "absolute", top: "110%", right: "0", borderRadius: "10px", minWidth: "150px", display: "block" }}>
                        <span className="dropdown-item-text text-muted small px-3 py-2 d-block">{user.email}</span>
                        <hr className="dropdown-divider m-0"/>
                        <button className="dropdown-item text-danger fw-bold px-3 py-2" onClick={handleLogout}>Sign Out</button>
                      </div>
                    )}
                  </li>
                </>
              ) : (
                <Link className="btn btn-primary rounded-pill px-4" to="/login">Login</Link>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;