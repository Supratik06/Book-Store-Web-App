import React from "react";
import { Link } from "react-router-dom";
//import axios from "axios";
const BooksSection= ({ data }) => {
return (
<div className="d-flex justify-content-center align-items-center flex-wrap my-3" style={{ gap: "20px" }}>
  {data && data.map((item, index) => (
    <div key={index}
      style={{
        width: "200px",
        height: "350px",
        background: "transparent",
        border: "1px solid white",
        borderRadius: "10px",
        padding: "10px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <img
          style={{ width: "200px", height: "210px",borderTopLeftRadius:"20px",borderTopRightRadius:"20px", objectFit: "cover" }}
          className="img-fluid"
          src={item.image}
          alt={item.bookname}
        />
      </div>

      <h6 style={{ fontSize: "15px", color: "white" }} className="p-2 text-center">
        {item.bookname.slice(0, 20)}...
      </h6>

      {/* <p style={{ fontSize: "20px", color: "white" }} className="mb-0 text-center">
        Rs.{item.price}
      </p> */}

      <b style={{ fontSize: "20px", color: "white" }} className="m-0 px-2 text-center mb-3">
        Rs.{item.price}
      </b>
      <div className="d-flex justify-content-center mt-auto pb-2" style={{ gap: "10px", alignItems: "center" }}>
        <Link to={`/books/${item._id}`} className="btn btn-primary" style={{ padding: "3px 15px", fontSize: "16px" }}>
          View
        </Link>
        <a href={`https://www.amazon.com/s?k=${encodeURIComponent(item.bookname)}`} target="_blank" rel="noreferrer" className="btn btn-success" style={{ padding: "3px 15px", fontSize: "16px" }}>
          Buy
        </a>
      </div>
    </div>
  ))}
</div>
);
};
export default BooksSection;
