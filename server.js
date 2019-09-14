const express = require("express");
const mongoose = require('mongoose');
const app = express();


//first route
app.get('/', (req, res) => res.send('hello!'));
const port = 5700;
app.listen(port, () => console.log(`Server running on port ${port}`));