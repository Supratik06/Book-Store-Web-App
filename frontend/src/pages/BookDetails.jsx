import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const BookDetails = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                // If it's a mock DB ID (1, 2, 3), we'll do a fallback logic just in case the server still fails to connect to mongo.
                // However, first let's try the backend endpoint.
                const API_URL = process.env.REACT_APP_API_URL || "";
                const res = await axios.get(`${API_URL}/api/v1/getBooks/${id}`);
                setBook(res.data.book);
            } catch (error) {
                console.error("Error fetching book", error);
                
                // Fallback for mock data if DB is still not connected
                const mockBooks = {
                    "1": { bookname: "The Pragmatic Programmer", author: "David Thomas", description: "Your journey to mastery", image: "https://m.media-amazon.com/images/I/51W1sBPO7tL._SX380_BO1,204,203,200_.jpg", price: 40 },
                    "2": { bookname: "Clean Code", author: "Robert C. Martin", description: "A Handbook of Agile Software Craftsmanship", image: "https://m.media-amazon.com/images/I/41xShlnTZTL._SX376_BO1,204,203,200_.jpg", price: 45 },
                    "3": { bookname: "Design Patterns", author: "Erich Gamma", description: "Elements of Reusable Object-Oriented Software", image: "https://m.media-amazon.com/images/I/81gtKoapHFL.jpg", price: 55 }
                };
                if (mockBooks[id]) {
                    setBook(mockBooks[id]);
                }
            } finally {
                setLoading(false);
            }
        };
        fetchBook();
    }, [id]);

    if (loading) return <div className="bg-dark text-white d-flex justify-content-center align-items-center" style={{minHeight: "91.5vh"}}>Loading...</div>;
    
    if (!book) return <div className="bg-dark text-white d-flex justify-content-center align-items-center flex-column" style={{minHeight: "91.5vh"}}>
        <h3 className="mb-4">Book Not Found</h3>
        <Link to="/books" className="viewBook">Go Back</Link>
    </div>;

    return (
        <div className="bg-dark" style={{ minHeight: "91.5vh", padding: "40px 0" }}>
            <div className="container">
                <div className="row align-items-center" style={{
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    borderRadius: "15px",
                    backdropFilter: "blur(10px)",
                    padding: "30px",
                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)"
                }}>
                    <div className="col-md-4 d-flex justify-content-center mb-4 mb-md-0">
                        <img 
                            src={book.image} 
                            alt={book.bookname} 
                            className="img-fluid" 
                            style={{ borderRadius: "10px", boxShadow: "0 5px 15px rgba(255,255,255,0.1)", maxHeight: "400px", objectFit: "cover" }} 
                        />
                    </div>
                    <div className="col-md-8 text-white px-md-5">
                        <h2 className="mb-3" style={{ background: "linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontWeight: "bold" }}>
                            {book.bookname}
                        </h2>
                        <h4 className="mb-4 text-muted">By {book.author || "Unknown Author"}</h4>
                        <p className="mb-4" style={{ fontSize: "18px", lineHeight: "1.6", color: "#ddd" }}>
                            {book.description || "No description available for this book."}
                        </p>
                        <h3 className="mb-5 text-success font-weight-bold">
                            Rs. {book.price}
                        </h3>
                        <div className="d-flex gap-3">
                            <Link to="/books" className="viewBook bg-secondary" style={{ border: "none" }}>Back</Link>
                            <a href={`https://www.amazon.com/s?k=${encodeURIComponent(book.bookname)}`} target="_blank" rel="noreferrer" className="viewBook" style={{ textDecoration: "none", textAlign: "center" }}>Buy Now</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookDetails;
