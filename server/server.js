const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');

const uri = "mongodb+srv://xuanbao_01:02022003aA@cluster0.yjcpjwu.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (err) {
    console.error(err);
  }
}

run();

async function findOneListingByName(nameOfListing) {
  const result = await client.db("sample_airbnb").collection("listingsAndReviews").findOne({ name: nameOfListing });
  return result; // Add this line to return the result
}

const app = express();
const cors = require('cors');
app.use(cors());
const port = 5000;

app.get('/giaodichvien/', async (req, res) => {
 // const nameOfListing = req.params.nameOfListing;
  const nameOfListing = "Lovely Loft"
  const result = await findOneListingByName(nameOfListing);

  if (result) {
    console.log(`Found a listing in the collection with the name '${nameOfListing}':`);
    console.log(result);
    res.send(result);
  } else {
    console.log(`No listings found with the name '${nameOfListing}'`);
    res.send({ error: `No listings found with the name '${nameOfListing}'` });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
