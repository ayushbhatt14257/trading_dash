const express = require('express');
const dotenv = require('dotenv');

const app = express();
app.use(express.json());

dotenv.config();
require('./db/db');

app.use(require("./routes/auth"));
// const DefaultData = require('./defalutData');

const PORT = process.env.PORT || 2000;

app.listen(PORT, () => {
        console.log(`Server is running ${PORT}`);
    })
    // DefaultData();