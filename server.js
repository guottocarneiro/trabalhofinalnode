require('dotenv').config(); 
 
const express = require ('express'); 
const cors = require('cors');  
const app = express ();
const usuarioRouter = require('./api/routes/usuarioRouter');
const filmesRouter = require('./api/routes/filmesRouter');

app.use(cors()) ;
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use('/', usuarioRouter);
app.use('/', filmesRouter);

let port = process.env.PORT || 3000;
app.listen (port);