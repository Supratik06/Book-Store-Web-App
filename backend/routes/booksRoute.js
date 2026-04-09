const express = require("express");
const router = express.Router();
const bookModel=require("../models/bookmodels");
const mongoose = require("mongoose");

let mockBooks = [
    {
        _id: "1",
        bookname: "The Pragmatic Programmer",
        author: "David Thomas",
        description: "Your journey to mastery",
        image: "https://m.media-amazon.com/images/I/51W1sBPO7tL._SX380_BO1,204,203,200_.jpg",
        price: 40
    },
    {
        _id: "2",
        bookname: "Clean Code",
        author: "Robert C. Martin",
        description: "A Handbook of Agile Software Craftsmanship",
        image: "https://m.media-amazon.com/images/I/41xShlnTZTL._SX376_BO1,204,203,200_.jpg",
        price: 45
    },
    {
        _id: "3",
        bookname: "Design Patterns",
        author: "Erich Gamma",
        description: "Elements of Reusable Object-Oriented Software",
        image: "https://m.media-amazon.com/images/I/81gtKoapHFL.jpg",
        price: 55
    }
];

//Post request
router.post("/add",async(req,res)=>{
    try{
        if (mongoose.connection.readyState !== 1) {
            console.log("Database not connected, adding to mock data");
            const newBook = { ...req.body, _id: Date.now().toString() };
            mockBooks.push(newBook);
            return res.status(200).json({message:"Book Added Successfully"});
        }
        const data=req.body;
        const newBook=new bookModel(data);
        await newBook.save().then(()=>{
            res.status(200).json({message:"Book Added Successfully"});
        });
    }catch(error){
        console.log(error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }

})
//get request
router.get("/getBooks",async(req,res)=>{
    try{
        if (mongoose.connection.readyState !== 1) {
            console.log("Database not connected, returning mock data");
            return res.status(200).json({ books: mockBooks });
        }
        const books=await bookModel.find();
        res.status(200).json({books});
    }catch(error){
        console.log(error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
})

//get request by id
router.get("/getBooks/:id",async(req,res)=>{
    let book;
    const id=req.params.id;
    try{
        if (mongoose.connection.readyState !== 1) {
            console.log("Database not connected, returning mock data by id");
            book = mockBooks.find(b => b._id === id);
            return res.status(200).json({book});
        }
        book=await bookModel.findById(id);
        res.status(200).json({book});
    }catch(error){
        console.log(error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
})

//update books by id
router.put("/updateBook/:id",async(req,res)=>{
    const id=req.params.id;
    const {bookname,description,author,image,price}=req.body;
    let book;
    try{
        if (mongoose.connection.readyState !== 1) {
            console.log("Database not connected, updating mock data");
            const index = mockBooks.findIndex(b => b._id === id);
            if (index !== -1) {
                mockBooks[index] = { ...mockBooks[index], bookname, description, author, image, price };
            }
            return res.status(200).json({message:"Data Updated"});
        }
        book=await bookModel.findByIdAndUpdate(id,{
            bookname,
            description,
            author,
            image,
            price,
        });
            await book.save().then(()=>res.status(200).json({message:"Data Updated"}));
    }catch(error){
        console.log(error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

//Delete book by id
router.delete("/deleteBook/:id",async(req,res)=>{
    const id=req.params.id;
    try{
        if (mongoose.connection.readyState !== 1) {
            console.log("Database not connected, deleting from mock data");
            mockBooks = mockBooks.filter(b => b._id !== id);
            return res.status(201).json({message:"Deleted Successfully"});
        }
        await bookModel
        .findByIdAndDelete(id)
        .then(()=>res.status(201).json({message:"Deleted Successfully"}));
    }catch(error){
        console.log(error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});


module.exports=router;