import React from "react";
const BooksSection= ({ data }) => {
console.log(data);
//  const handleDelete = async () => {
//     try {
//       const res = await axios.delete(`http://localhost:5000/api/v1/delete`);
//       alert(res.data.message);
//     } catch (err) {
//       console.error(err);
//       alert("Delete failed!");
//     }
//   };
return (
<div className="d-flex justify-content-between align-items-center flex-wrap my-3">
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

      <b style={{ fontSize: "20px", color: "white" }} className="m-0 px-2 text-center">
        Rs.{item.price}
      </b>
      {/* <div className="d-flex justify-content-around align-items-center">
      <button className="btn btn-primary">UPDATE</button>
      <button className="btn btn-danger" onClick={handleDelete}>DELETE</button>
      </div> */}
    </div>
  ))}
</div>
);
};
export default BooksSection;