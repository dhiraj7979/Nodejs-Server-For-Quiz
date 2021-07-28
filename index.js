const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const app = express();
require('dotenv').config();
const port = 3000;
const test = require('./test');


app.use(express.json());
// app.use(cors);

app.get('/', (req, res) => {
    res.status(200).send('Hello World!');
});

app.get('/linux10', (req, res) => {
    fetchQuestions(res, 'linux');
});

app.get('/devops10', (req, res) => {
    fetchQuestions(res, 'DevOps');
});

app.get('/docker10', (req, res) => {
    fetchQuestions(res, 'Docker');
});

app.get('/mysql10', (req, res) => {
    fetchQuestions(res, 'SQL');
});

app.get('/code10', (req, res) => {
    fetchQuestions(res, 'Code');
});

app.listen(port, () => {
    console.log(`Sample server listening on port ${port}!`);
});




async function fetchQuestions(res, category) {

    const response = await fetch(`https://quizapi.io/api/v1/questions?category=${category}&limit=10`, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache', 
        credentials: 'same-origin', 
        headers: {
          'Content-Type': 'application/json',
          'X-Api-Key': process.env.API_KEY,
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer', 
      });

    const data = await response.json();

    let json = JSON.stringify(data);
    res.status(200).send(json);

}