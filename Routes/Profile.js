const express = require('express');
const router = express.Router()
const jwt = require('jsonwebtoken');
const UserProfile = require('../Models/Profile.js');
const { isAuth } = require('./isAuth.js');

const secret = process.env.ACCESS_TOKEN_SECRET;




// User needs to be able to Edit their profile. Can be new or existing user
router.post(
  '/edit',
  (req, res)=>{
    isAuth(req)
    .then((dbData, err)=>{
      const formdata = {
        userId: dbData._id,
        username: req.body.username,
        description: req.body.description,
        currentWeight: req.body.currentWeight,
        goalWeight: req.body.goalWeight,
        // profileImage: req.body.profileImage,
      }
      
      const theProfile = new UserProfile(formdata);
      theProfile.save();
      res.send('Profile editted succesfully');
    })
    .catch(err=>console.log(err));
  }
);
// Front-end needs to present use information in profile (My Profile) - simple API endpoint
router.post(
  '/',
  (req, res)=>{
    isAuth(req)
    .then((dbData, err)=>{
      dbData.password = undefined;
      res.send(dbData);
    })
    .catch(err=>console.log(err));
  }
)

module.exports = router;