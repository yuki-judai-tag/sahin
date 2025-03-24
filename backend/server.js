import express from "express";
import dotenv from "dotenv";
import { connectionDB } from "./config/db.js";
import Product from "../models/product.model.js";
import product from "../models/product.model.js";
import mongoose from "mongoose";


dotenv.config();
const app = express();

app.use(express.json());

app.get("/api/products",async(req,res)=>{
try{
    const products = await product.find({});
    res.status(200).json({success:true,Data:products});
}catch(error){
    console.log("error in fetching products:",error.message);
    res.status(500).json({success:false, message:"server error"});
}

});
app.post("/api/products",async(req,res)=>{
const product = req.body;

if(!product.name || !product.price || !product.image){
    return res.status(400).json({success:false ,message:"please provide all fields"});
}
 
const newProduct =new Product(product); 

try{

    await newProduct.save();
    res.status(201).json({success:true,Data:newProduct})
}catch(error){
console.error("error in create product",error.message);
res.status(500).json({success:false, message:"server error"});
}
});
app.put("/api/products/:id",async(req, res)=>{

    const{id}=req.params;

    const product=req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
     return res.status(404).json({success:false,message:"invalid product Id"});
    }
    try{
       const updatedProduct= await Product.findByIdAndUpdate(id,product,{new:true});
        res.status(200).json({success:true,Data:updatedProduct});
    }catch(error){
       res.status(500).json({success:false, message:"server error"});
    }
});
app.delete("/api/products/:id",async(req,res)=>

{
    const {id} =req.params;

    try{
        await product.findByIdAndDelete(id);
        res.status(200).json({success:true, message:"product deleted"});

    }catch (error){
      console.log("error in deleting product:",error.message);
        res.status(404).json({success:false,message:"product not found"});
    }
});


app.listen(5000,()=>{
    connectionDB();
    console.log("server started at https://localhost:5000 ");
});