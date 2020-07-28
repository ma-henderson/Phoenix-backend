const express = require('express');
const router = express.Router()
const jwt = require('jsonwebtoken');
const Goal = require('../Models/Goal.js');
const { isAuth } = require('./isAuth.js');


// User needs to be able to Edit their profile. Can be new or existing user
router.post(
  '/create/',
  (req, res)=>{
    isAuth(req)
    .then((dbData, err)=>{
      const formdata = {
        userId: dbData._id,
        title: req.body.title,
        input: req.body.input,
        goal: req.body.goal,
      }
      
      const theGoal = new Goal(formdata);
      theGoal.save();
      console.log("received:", formdata)
      res.send('Goal added');
    })
    .catch(err=>console.log(err));
  }
);

module.exports = router;