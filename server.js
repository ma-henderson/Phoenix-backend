const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config()

const UserRoutes = require('./Routes/User');
const ProfileRoutes = require('./Routes/Profile');


const app = express();

app.use(cors(
  //{origin: http://localhost:3000,
  //credentials: true}
));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())

const dbURL = 'mongodb+srv://admin:wwmp72j6d@cluster0-57cgu.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(dbURL, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
  console.log('db is connected')
});

app.use('/user', UserRoutes);

app.use('/profile', ProfileRoutes);

app.get('/', (req, res) => {
  res.send("Home page (GET)");
})
app.get('/*', (req, res) => {
  res.send("404 not found");
})

app.listen(3010, () => {
  console.log('you are connected')
})