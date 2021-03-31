const express = require('express')
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config()


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fg2cz.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express()
app.use(bodyParser.json());
app.use(cors());

client.connect(err => {
  const productsCollection = client.db("emaJohnStore").collection("products");
    
    app.post('/addProduct', (req, res) => {
        const products = req.body;
        productsCollection.insertMany(products)
        .then(result => {
            console.log(result.insertedCount);
            res.send(result.insertedCount)
        })
    })
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(5000)