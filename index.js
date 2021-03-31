const express = require('express')
require('dotenv').config()

const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fg2cz.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express()

console.log(process.env.DB_USER)

client.connect(err => {
  const collection = client.db("emaJohnStore").collection("products");
 console.log('database connected')
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(5000)