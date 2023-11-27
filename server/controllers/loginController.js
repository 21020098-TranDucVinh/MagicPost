const {
  models: { Admin, Staff },
} = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class loginController {
  // [POST] /login
  async login(req, res) {
    const { username, password, role } = req.body;
    // Check if username and password is provided
    if (!username || !password) {
      return res.status(400).json({
        errorCode: 1,
        msg: 'Username or Password not present',
      });
    }
    try {
      let user;
      if (role === 'admin') {
        user = await Admin.findOne({ where: { username } });
      } else {
        user = await Staff.findOne({ where: { username } });
        if (!user) {
          if (user.transaction_zip_code == null) user.role = 'COLLECTION_STAFF';
          else user.role = 'TRANSACTION_STAFF';
        }
      }
      if (!user) {
        res.status(400).json({
          errorCode: 1,
          msg: 'Username not found',
        });
      } else {
        console.log(user, username, password);
        // comparing given password with hashed password
        bcrypt.compare(password, user.password).then(function (result) {
          if (result) {
            const maxAge = 3 * 60 * 60;
            const token = jwt.sign(
              { id: user._id, username, role: user.role },
              process.env.JWT_SECRET_KEY, // secret key for jwt
              {
                expiresIn: maxAge, // 3hrs in sec
              },
            );
            res.cookie('jwt', token, {
              httpOnly: true,
              maxAge: maxAge * 1000, // 3hrs in ms
            });
            res.status(200).json({
              errorCode: 0,
              msg: 'User successfully Logged in',
              role: user.role,
            });
          } else {
            res.status(400).json({
              errorCode: 1,
              msg: 'Password is incorrect',
            });
          }
        });
      }
    } catch (error) {
      res.status(400).json({
        errorCode: 1,
        msg: error.message,
      });
    }
  }
}

module.exports = new loginController();
