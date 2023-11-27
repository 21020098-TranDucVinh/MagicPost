const adminRoute = require('./adminRoute');
const staffRoute = require('./staffRoute');
const transactionRoute = require('./transactionRoute');
const collectionRoute = require('./collectionRoute');
const parcelsRoute = require('./parcelsRoute');
const trackingRoute = require('./trackingRoute');
const loginController = require('../controllers/loginController');

function routesInit(app) {
  app.post('/login', loginController.login);
  app.get("/logout", (req, res) => {
    res.cookie("jwt", "", { maxAge: "1" })
    res.send("logout")
  })
  app.use('/', adminRoute);
  app.use('/', staffRoute);
  app.use('/', transactionRoute);
  app.use('/', collectionRoute);
  app.use('/', parcelsRoute);
  app.use('/', trackingRoute);
}

module.exports = routesInit;
