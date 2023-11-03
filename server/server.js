import express from 'express';

const app = express();

app.use(express.json()) //Parse JSON bodies
app.use(express.urlencoded({ extended: true })) //Parse URL-encoded bodies

app.get('/', (req, res) => {
  res.send('Hello Babeeee!');
});

app.listen(5000, () => {
  console.log('Server is listening on port 5000');
});