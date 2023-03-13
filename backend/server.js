const express = require('express');
const dotenv = require('dotenv');
const path = require('path');


const app = express();
app.use(express.json());

dotenv.config();
require('./db/db');

app.use(require("./routes/auth"));
// const DefaultData = require('./defalutData');

const PORT = process.env.PORT || 2000;

const _dirname = path.resolve();
app.use(express.static(path.join(_dirname, '/client/build')))
app.get('*', (req, res) =>
    res.sendFile(path.join(_dirname, '/client/build/index.html'))
);

app.listen(PORT, () => {
        console.log(`Server is running ${PORT}`);
    })
    // DefaultData();