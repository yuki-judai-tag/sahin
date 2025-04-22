import mongoose from "mongoose";
 import Product from "../models/product.model.js";
 import product from "../models/product.model.js";

    export const getProducts=async(req,res)=>{
    try{
        const products = await product.find({});
        res.status(200).json({success:true,Data:products});
    }catch(error){
        console.log("error in fetching products:",error.message);
        res.status(500).json({success:false, message:"server error"});
    }
    };

     export const createProduct=async(req,res)=>{
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
    };

    export const updatedProduct=async(req, res)=>{
    
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
    };

    export const deleteProduct=async(req,res)=>
    
        {
            const {id} =req.params;
        
            try{
                await product.findByIdAndDelete(id);
                res.status(200).json({success:true, message:"product deleted"});
        
            }catch (error){
              console.log("error in deleting product:",error.message);
                res.status(404).json({success:false,message:"product not found"});
            }
    };