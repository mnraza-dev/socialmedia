const express = require("express");
const app = express();
const PORT = 3000;

app.get("/api/v1/:id", (req, res)=>{
    res.status(200).json({user:req.params.id})
})

// app.get("/api/v1/:token",(req,res)=>{
//     console.log(req.params.token);
//     res.status(200).json({param:req.params.token})
// })

app.listen(PORT,()=>{
    console.log(`I am able to listen at port ${PORT}`);
})