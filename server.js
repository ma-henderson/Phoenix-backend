require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const UserRoutes = require('./Routes/User');
const ProfileRoutes = require('./Routes/Profile');
const GoalRoutes = require('./Routes/Goal');

const app = express();

app.use(cors(
  //{origin: http://localhost:3000,
  //credentials: true}
));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())

const dbURL = process.env.DB_ACCESS_STRING;
mongoose.connect(dbURL, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
  console.log('db is connected')
});

app.use('/user', UserRoutes);

app.use('/profile', ProfileRoutes);

app.use('/goal', GoalRoutes);

app.get('/', (req, res) => {
  res.send("Home page (GET)");
})
app.get('/*', (req, res) => {
  res.send("404 not found");
})

app.listen(3010, () => {
  console.log('you are connected')
})