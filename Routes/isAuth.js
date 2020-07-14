const { verify } = require('jsonwebtoken');
const UserProfile = require('../Models/Profile.js');
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId;

const secret = process.env.ACCESS_TOKEN_SECRET;

const isAuth = req => {
  const authorization = req.headers['authorization'];
    if (!authorization) {res.send("You need to log in")};
    // Assuming format of "bearer ey4lkasSDLKFjlk4231"
    const token = authorization.split(' ')[1];
    try {
      // Verify the token
      var userId = verify(token, secret);
      console.log(`user ${userId.email} verified`)
      console.log(ObjectId(userId.id))
      // Pulling _id from DB
      UserProfile.findById(userId.id) // !! Needs understanding
      .then((dbResults)=>{
        if (dbResults.length > 0) {
          // send Frontend id and email
          console.log("success", dbResults);
          return dbResults
        } else {
          res.send('no profile for this user')
        }
      })
    } catch(err) { // Wrong or expired token
      console.log("Invalid authentication")
      res.send("Invalid authentication")
    }
}
module.exports = {
  isAuth
}