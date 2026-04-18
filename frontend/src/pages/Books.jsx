import React, { useState } from 'react';
import axios from "axios";
import { useEffect } from 'react';
import BooksSection from '../components/BooksSection';
const Books = () => {
    const [Data, setData] = useState();
    const [error, setError] = useState(false);
    
    useEffect(() => {
      const fetch = async()=>{
        try {
            const res = await axios.get("http://localhost:1000/api/v1/getBooks");
            setData(res.data.books);
        } catch (err) {
            console.error("API Error:", err);
            setError(true);
        }
      };
      fetch();
    }, []);
    
  return (
    <div className="bg-dark" style={{minheight:"91.5vh"}}>
        <div className="d-flex flex-column justify-content-center align-items-center py-3">
        <h4 className='text-white mb-4'>Books Section</h4>
        {error ? (
            <div className="text-danger mt-4 text-center">
                <h5>Unable to reach the Database!</h5>
                <p>1. Ensure your MongoDB Network Access IP is set to 0.0.0.0/0.</p>
                <p>2. Ensure the backend server is running and connected.</p>
                <p>3. If using Vercel, ensure you've updated localhost to your Vercel URL.</p>
            </div>
        ) : Data ? (
            <BooksSection data={Data}/>
        ):(<div className="text-white">Loading...</div>)}
        </div>
      </div>
  );
};

export default Books;
