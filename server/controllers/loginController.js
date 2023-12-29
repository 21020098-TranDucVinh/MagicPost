const {
  models: { Admin, Staff, Collection, Transaction },
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
        user = await Admin.findOne({
          where: { username },
        });
        if (user) {
          if (user.role === 'COLLECTION_ADMIN') {
            await Collection.findOne({
              attributes: ['zip_code'],
              where: { admin_id: user.id },
            }).then((collection) => {
              user.zip_code = collection.zip_code;
            });
          } else if (user.role === 'TRANSACTION_ADMIN') {
            await Transaction.findOne({
              attributes: ['zip_code'],
              where: { admin_id: user.id },
            }).then((transaction) => {
              user.zip_code = transaction.zip_code;
            });
          }
        }
      } else {
        user = await Staff.findOne({ where: { username } });
        if (user) {
          if (user.transaction_zip_code == null) {
            user.role = 'COLLECTION_STAFF';
            user.zip_code = user.collection_zip_code;
          } else {
            user.zip_code = user.transaction_zip_code;
            user.role = 'TRANSACTION_STAFF';
          }
        }
      }
      if (!user) {
        res.status(400).json({
          errorCode: 1,
          msg: 'Username not found',
        });
      } else {
        console.log("Login: username: ", username, "password: ", password, "role: ", user.role, "zip_code: ", user.zip_code);
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
              httpOnly: false,
              maxAge: maxAge * 1000, // 3hrs in ms
            });
            res.status(200).json({
              errorCode: 0,
              msg: 'User successfully Logged in',
              role: user.role,
              zip_code: user.zip_code,
              token: token,
              staff_id: user.staff_id,
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
