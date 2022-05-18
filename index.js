const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;
const app = express();


app.use(express.json());
app.use(cors());












app.get('/', (req, res) => {
    res.send({message: 'hello taskify app server'})
})







app.listen(port, ()=>{
    console.log('listening on port', port)
})
