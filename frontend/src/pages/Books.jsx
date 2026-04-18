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
            const API_URL = process.env.REACT_APP_API_URL || "";
            const res = await axios.get(`${API_URL}/api/v1/getBooks`);
            if (res.data && res.data.books) {
                setData(res.data.books);
            } else {
                throw new Error("Invalid API response format");
            }
        } catch (err) {
            console.error("API Error:", err);
            // Fallback for mock data if DB is still not connected
            const mockBooksArray = [
                { _id: "1", bookname: "The Pragmatic Programmer", author: "David Thomas", description: "Your journey to mastery", image: "https://m.media-amazon.com/images/I/51W1sBPO7tL._SX380_BO1,204,203,200_.jpg", price: 40 },
                { _id: "2", bookname: "Clean Code", author: "Robert C. Martin", description: "A Handbook of Agile Software Craftsmanship", image: "https://m.media-amazon.com/images/I/41xShlnTZTL._SX376_BO1,204,203,200_.jpg", price: 45 },
                { _id: "3", bookname: "Design Patterns", author: "Erich Gamma", description: "Elements of Reusable Object-Oriented Software", image: "https://m.media-amazon.com/images/I/81gtKoapHFL.jpg", price: 55 }
            ];
            setData(mockBooksArray);
            setError(true);
        }
      };
      fetch();
    }, []);
    
  return (
    <div className="bg-dark" style={{minheight:"91.5vh"}}>
        <div className="d-flex flex-column justify-content-center align-items-center py-3">
        <h4 className='text-white mb-4'>Books Section</h4>
        {error && (
            <div className="text-danger mt-4 text-center mb-4">
                <h5>Unable to reach the Database! Using mock data fallback.</h5>
                <p>1. Ensure your MongoDB Network Access IP is set to 0.0.0.0/0.</p>
                <p>2. Ensure the backend server is running and connected.</p>
                <p>3. If using Vercel, ensure you've updated localhost to your Vercel URL.</p>
            </div>
        )}
        {Data ? (
            <BooksSection data={Data}/>
        ) : !error && (
            <div className="text-white">Loading...</div>
        )}
        </div>
      </div>
  );
};

export default Books;
