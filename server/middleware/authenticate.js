const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET_KEY; // secret key for jwt

exports.adminAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
      if (err) {
        return res.status(401).json({
          errorCode: 1,
          msg: 'Not authorized'
        });
      } else {
        if (decodedToken.role !== 'ADMIN') {
          return res.status(401).json({
            errorCode: 1,
            msg: 'Not authorized'
          });
        } else {
          next();
        }
      }
    });
  } else {
    return res.status(401).json({
      errorCode: 1,
      msg: 'Not authorized, token not available'
    });
  }
};

exports.adminCollectionAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ message: 'Not authorized' });
      } else {
        if (decodedToken.role !== 'COLLECTION_ADMIN') {
          return res.status(401).json({ message: 'Not authorized' });
        } else {
          next();
        }
      }
    });
  } else {
    return res
      .status(401)
      .json({ message: 'Not authorized, token not available' });
  }
};

exports.adminTransactionAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ message: 'Not authorized' });
      } else {
        if (decodedToken.role !== 'TRANSACTION_ADMIN') {
          return res.status(401).json({ message: 'Not authorized' });
        } else {
          next();
        }
      }
    });
  } else {
    return res
      .status(401)
      .json({ message: 'Not authorized, token not available' });
  }
};

exports.staffTransactionAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ message: 'Not authorized' });
      } else {
        if (decodedToken.role !== 'TRANSACTION_STAFF') {
          return res.status(401).json({ message: 'Not authorized' });
        } else {
          next();
        }
      }
    });
  } else {
    return res
      .status(401)
      .json({ message: 'Not authorized, token not available' });
  }
};

exports.staffCollectionAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ message: 'Not authorized' });
      } else {
        if (decodedToken.role !== 'COLLECTION_STAFF') {
          return res.status(401).json({ message: 'Not authorized' });
        } else {
          next();
        }
      }
    });
  } else {
    return res
      .status(401)
      .json({ message: 'Not authorized, token not available' });
  }
};