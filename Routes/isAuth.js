const { verify } = require('jsonwebtoken');
const UserModel = require ('../Models/User.js');
const mongoose = require('mongoose');

const secret = process.env.ACCESS_TOKEN_SECRET;

const isAuth = async req => {
  const authorization = req.headers['authorization'];
    if (!authorization) {res.send("You need to log in")};
    // Assuming format of "bearer ey4lkasSDLKFjlk4231"
    const token = authorization.split(' ')[1];
    try {
      // Verify the token
      var userId = verify(token, secret);
      console.log(`user ${userId.email} verified`)
      // Pulling _id from DB
      return await UserModel.findById(userId.id, (err, dbResults)=>{
        if (dbResults) {
          // send Frontend id and email
          return dbResults;
        } else {
          send('no profile for this user')
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