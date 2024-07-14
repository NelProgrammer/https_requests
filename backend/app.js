import fs from 'node:fs/promises';
import bodyParser from 'body-parser';
import express from 'express';
// import cors from 'cors';

const app = express();
// app.use(cors());
app.use(express.static('images'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // allow all domains
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  next();
});

// READ '/places'
app.get('/places', async (req, res) => {
  try {
    const filePath = new URL('./data/places.json', import.meta.url);
    const fileContent = await fs.readFile(filePath, { encoding: 'utf8' });
    const places = JSON.parse(fileContent);

    res.status(200).json({ places });
    console.log(`** Response Data - READ Places.`);
  } catch (err) {
    console.error(err.message);
  }
  console.log(`\n`);
});

// READ '/user-places'
app.get('/user-places', async (req, res) => {
  try {
    const filePath = new URL('./data/user-places.json', import.meta.url);
    const fileContent = await fs.readFile(filePath, { encoding: 'utf8' });
    const places = JSON.parse(fileContent);

    res.status(200).json({ places });
    console.log(`** Response Data - READ User-Places.`);
  } catch (err) {
    console.error(err.message);
  }
  console.log(`\n`);
});

// WRITE '/user-places'
app.put('/user-places', async (req, res) => {
  try {
    const places = req.body.places;

    const filePath = new URL('./data/user-places.json', import.meta.url);

    await fs.writeFile(filePath, JSON.stringify(places));

    res.status(200).json({ message: 'User places updated!' });
    console.log(`** Response Data - WRITE User-Places.`);
  } catch (err) {
    console.error(err.message);
  }
  console.log(`\n`);
});

// 404
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }
  res.status(404).json({ message: '404 - Not Found' });
  console.log(`** Response is 404.`);
  console.log(`\n`);
});

// Port
const port = process.env.PORT || 3001;
console.log(`** Port - Hardcoded: ${port}`);
console.log(`** Process Env Port: ${process.env.PORT}.`);

// Server is up
app.listen(+port, () => {
  console.log(`** Sever is UP at http://localhost:${port}.`);
  console.log(`***************************`);
});
