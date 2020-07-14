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
    const dbData = await isAuth(req);
    console.log("dbData is:", dbData)
    const formdata = {
      userId: "NULLVALUE",
      username: req.body.username, // Learn how to get data from another collection
      description: req.body.description,
      currentWeight: req.body.currentWeight,
      goalWeight: req.body.goalWeight,
      // profileImage: req.body.profileImage,
    }
    const theProfile = new UserProfile(formdata);
    theProfile.save();
    res.send('Profile editted succesfully');
    console.log(formdata)
  }
)

// Front-end needs to present use information in profile (My Profile) - simple API endpoint
router.post(
  '/info',
  (req, res)=>{
    res.send(isAuth(req))
  }
)

module.exports = router;