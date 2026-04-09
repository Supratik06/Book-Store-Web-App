import React from 'react'
import "./Home.css";
import { Link } from 'react-router-dom';
const Home = () => {
    const image=require("../images/smart-boy.avif");
  return (
    <div className="Home-Page bg-dark text-white container-fluid">
<div className="row container">
<div
className="col-lg-6 d-flex justify-content-center align-items-center align-items-lg-start flex-column"
style={{ height: "91.5vh" }}
>
<h2 className="title-text">BOOK STORE</h2>
<h3 className="subtitle-text">FOR YOU</h3>
<p className="mb-4" style={{color:"silver"}}>Checkout The Books</p>
<Link to="/books" className='viewBook mb-4'>View Books</Link>

</div>
<div
className="col-lg-6 d-flex justify-content-center align-items-center flex-column"
style={{ height: "91.5vh" }}>
<img className="img-fluid homing" src={image} alt="/"/>
</div>
</div>
</div>
  );
};

export default Home