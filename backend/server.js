require("dotenv").config();

const express = require("express");
const mongoose = require('mongoose')
const productRoutes = require('./routes/products')
const cors = require('cors')

const app = express();

app.use(cors())

//middleware

app.use(express.json())
app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next()
})

//Routes
app.use('/api/products',productRoutes)

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log('Connected to database')
    app.listen(process.env.PORT, () => {
        console.log("listening to", process.env.PORT);
      });
})
.catch((err)=>{
    console.log(err)
})

