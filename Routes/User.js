const express = require('express');
const router = express.Router()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require ('../Models/User.js');

const secret = process.env.ACCESS_TOKEN_SECRET

router.post(
  '/register',
  (req, res) => {
    const formdata = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    }
    bcrypt.genSalt(10,
      (err, salt)=>{
        bcrypt.hash(
          formdata.password,
          salt,
          (err, hashedPassword) => {
            formdata.password = hashedPassword;
            const theUser = new UserModel(formdata);
            theUser.save();
            res.send('User registration completed');
          }
        );
      });
  }
);

router.post(
  '/login',
  (req, res) => {
    const formdata = {
      email: req.body.email,
      password: req.body.password
    }
    UserModel.find({email: formdata.email})
    .then((dbResults)=>{
      if (dbResults.length > 0) {
        bcrypt.compare(formdata.password, dbResults[0].password, (err, result) =>{
          if (result == true) {
            const payload = {
              id: dbResults[0]._id,
              email: dbResults[0].email
            }
            jwt.sign(
              payload,
              secret,
              (err, theJWT)=>{
                res.send({accesstoken: theJWT,
                  username: dbResults[0].username
                })
              }
            )
            console.log('password validated');
          } else {
            console.log('Incorrect password for user ' + dbResults[0].email);
            res.send('Please check email & password');
          }
        })
      } else {
        console.log('Incorrect user email');
        res.send('Please check email & password');
      }
    })
  }
);

module.exports = router;