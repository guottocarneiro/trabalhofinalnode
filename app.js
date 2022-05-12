require('dotenv').config() 
 
const express = require ('express') 
const cors = require('cors') 
const path  = require ('path') 
const app = express ()

app.use(cors()) 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

let port = process.env.PORT || 3000 
app.listen (port)