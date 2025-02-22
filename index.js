const express = require('express');
const { resolve } = require('path');
const mongoose = require("mongoose")
require("dotenv").config()
const User = require("./schema")

const app = express();
const port = 3010;

app.use(express.json())
const connectionString = process.env.MONGO_URI


mongoose.connect(connectionString)
  .then(()=>console.log('Connected to database'))
  .catch((e)=>console.log("Error connecting to database",e.message))

app.use(express.static('static'));

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});
app.post("/api/users",async (req,res)=>{
  
  const {name,email,password} = req.body
  const user = new User({name:name,email:email,password:password})
  await user.save()
  .then(user=>
    res.status(201).send({"Message": "User created successfully" })
  )
  .catch(
    (err)=>{
      console.log(err.errmsg)
      res.status(400).send({"Message": `${err}`})
  
  }  )

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
