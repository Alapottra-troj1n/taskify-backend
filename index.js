const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;
const app = express();


app.use(express.json());
app.use(cors());

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://taskify:${process.env.DB_PASS}@cluster0.ifrt0.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const run = async() =>{

    try{

        await client.connect();
        const database = client.db('taskify');
        const tasksCollection = database.collection('tasks');

        app.post('/getToken', async (req, res) => {
            const userEmail = req.body;
            const jwtToken = jwt.sign(userEmail, process.env.TOKEN_SECRET);
            res.send({ jwtToken });
        })

        app.get('/tasks/:email', async (req, res) => {

            const email = req.params;
            const query = { userEmail: email.email };
            const cursor = await tasksCollection.find(query).toArray(); 
            res.send(cursor);
        })


        app.post('/addtask', async(req,res)=>{

                const task = req.body;
                const result = await tasksCollection.insertOne(task);
                res.send(result)
        });


    }
    finally{



    }
}
run().catch(console.dir);










app.get('/', (req, res) => {
    res.send({message: 'hello taskify app server'})
})







app.listen(port, ()=>{
    console.log('listening on port', port)
})
