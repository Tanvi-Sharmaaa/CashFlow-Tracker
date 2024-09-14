//const express = require('express');
import express from 'express';
import cors from 'cors';
import { transactionModel } from './models/transaction.model.js';
import mongoose from 'mongoose';
import 'dotenv/config';
import connectDB from '../db/index.js';

const app= express();

app.use(cors());
app.use(express.json());//to parese json 

const PORT=4000;

app.get("/api/test", (req,res) => {
    res.json({body:'text ok2'});
})

app.post('/api/transaction',async(req,res) => {
    //console.log(process.env.MONGO_URL);
     await mongoose.connect(process.env.MONGO_URL)
    //connectDB()
    const {price,name,description,datetime} =req.body
    
    const transaction = await transactionModel.create({
        price,name,description,datetime
    })
    
    res.json(transaction);
})

app.get('/api/transactions', async(req,res) => {
    //await connectDB() why in this MONGODB connected is infinity
    await mongoose.connect(process.env.MONGO_URL)//while in this it is working fine
    const transactions = await transactionModel.find();
    res.json(transactions)
})

app.listen(PORT , function(err){
    if(err){
        console.log("Error in server setup")
    } 
    console.log(`Server is listening on port ${PORT}`);
})
