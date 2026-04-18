import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddBooks = () => {
  const [Data, setData] = useState({ bookname: "", auther: "", description: "", price: "", image: "", contact_no: "" });
  const navigate = useNavigate();
  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };
  console.log(Data);
  const submit = async (e) => {
    e.preventDefault();
    await axios.post("https://bookstoreapp-6qoq.vercel.app/api/v1/add", Data).then((res) => alert(res.data.message));
    setData({ bookname: "", auther: "", description: "", price: "", image: "", contact_no: "" });
    navigate('/books');
  };
  return (
    <div className="bg-dark d-flex justify-content-center align-item-center" style={{ minheight: "100vh" }}>
      <div className="container p-4">
        <div className="mb-3">
          <label for="exampleFormControlInput1" className="form-label text-white">Book Name</label>
          <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Enter Book Name" name="bookname" value={Data.bookname} onChange={change} />
        </div>
        <div className="mb-3">
          <label for="exampleFormControlInput1" className="form-label text-white">Author</label>
          <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Enter Author Name" name="auther" value={Data.auther} onChange={change} />
        </div>
        <div className="mb-3">
          <label for="exampleFormControlInput1" className="form-label text-white">Description</label>
          <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Enter Book Description" name="description" value={Data.description} onChange={change} />
        </div>
        <div className="mb-3">
          <label for="exampleFormControlInput1" className="form-label text-white">Image</label>
          <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Book Image url" name="image" value={Data.image} onChange={change} />
        </div>
        <div className="mb-3">
          <label for="exampleFormControlInput1" className="form-label text-white">Price</label>
          <input type="number" className="form-control" id="exampleFormControlInput1" placeholder="Enter The Book Price" name="price" value={Data.price} onChange={change} />
        </div>
        <button className='btn btn-success' onClick={submit}>ADD BOOK</button>
      </div>
    </div>
  )
}

export default AddBooks
