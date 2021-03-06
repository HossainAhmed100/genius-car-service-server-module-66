const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.tg3shwu.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        await client.connect();
        const userCollection = client.db("geniusCar").collection("service");

        // Get User
        app.get('/service', async (req, res) =>  {
            const query  = {};
            const cursor = userCollection.find(query);
            const users = await cursor.toArray();
            console.log("Genius Car Server Connected")
            res.send(users)
        });

        app.get('/service/:id', async (req, res) => {
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const result = await userCollection.findOne(query);
            res.send(result)
        })
        
        //Post Data
        app.post('/service', async (req, res) => {
            const newService = req.body;
            const result = await userCollection.insertOne(newService);
            res.send(result);
        })
        //Update Data
        app.post('/manageService', async (req, res) => {
            const newService = req.body;
            const result = await userCollection.insertOne(newService);
            res.send(result);
        });

        // Delete Service
        app.delete('/service/:id', async (req, res) => {
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const result = await userCollection.deleteOne(query);
            res.send(result);
        })
    


    
    }finally{
            // await client.close();
        }
    }

run().catch(console.dir)
app.get('/', (req, res) => {
    res.send('Running Genius Server');
});

app.listen(port, () => {
    console.log("Listening To Port", port)
})

