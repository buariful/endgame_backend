const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb'); // require mongodb
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

// middlewares
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello endgame222222!')
})

app.listen(port, () => {
    console.log(`endgame app listening on port ${port}`)
})

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.rehht.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        await client.connect();
        const dbConnection = client.db('all_tasks').collection('todo_tasks');
        const completedCollection = client.db('all_tasks').collection('completed_task');

        app.get('/todos', async (req, res) => {
            const query = {};
            const cursor = dbConnection.find(query);
            const tasks = await cursor.toArray();
            res.send(tasks);

        })
        app.get('/completed', async (req, res) => {
            const query = {};
            const cursor = completedCollection.find(query);
            const tasks = await cursor.toArray();
            res.send(tasks);

        })

        app.post('/uptodos', async (req, res) => {
            const todo = req.body;
            const result = dbConnection.insertOne(todo);
            res.send(result);
        })
        app.post('/upcomplete', async (req, res) => {
            const todo = req.body;
            const result = completedCollection.insertOne(todo);
            res.send(result);
        })

        app.delete('/deletetask/:id', async (req, res) => {
            const todoId = req.params.id;
            const query = { _id: todoId }
            const result = await dbConnection.deleteOne(query)
            res.send(result);
        })
    }
    finally {

    }
}
run().catch(console.dir);

// 57915   41408.1 1492.9