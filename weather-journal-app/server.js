const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;
projectData = {};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('website'));


app.get('/all', (req, res) => {
    res.status(200).send(projectData);
});

app.post('/add', (req, res) => {
    projectData = req.body;
    console.log(projectData);
    res.status(200).send(projectData);
});

app.listen(port, () => console.log(`Server is connected on port ${port}`));