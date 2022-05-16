require('dotenv').config(); 
 
const express = require ('express'); 
const cors = require('cors');  
const app = express ();
const apiRouter = require('./api/routes/apiRouter');

app.use(cors()) ;
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use('/', apiRouter);

let port = process.env.PORT || 3000;
app.listen (port);