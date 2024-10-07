const express = require("express")
const app= express()

app.get('/',(req,res)=>{
    res.send("I'm the goat.")
})

app.listen(3096, ()=>{
    console.log("Server listening on port 3096")
})

