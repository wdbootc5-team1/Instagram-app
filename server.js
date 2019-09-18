const express = require("express");
const mongoose = require('mongoose');
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();

//first route
app.get('/', (req, res) => res.send('hello!'));

app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const port = 5700;
app.listen(port, () => console.log(`Server running on port ${port}`));