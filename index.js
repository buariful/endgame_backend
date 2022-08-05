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

        app.get('/todos', async (req, res) => {
            const query = {};
            const cursor = dbConnection.find(query);
            const tasks = await cursor.toArray();
            res.send(tasks);

        })
    }
    finally {

    }
}
run().catch(console.dir);

// 57915   41408.1 1492.9