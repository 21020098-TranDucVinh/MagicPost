const adminRoute = require('./adminRoute');
const staffRoute = require('./staffRoute');
const transactionRoute = require('./transactionRoute');
const collectionRoute = require('./collectionRoute');
const parcelsRoute = require('./parcelsRoute');
const trackingRoute = require('./trackingRoute');
const staffTransactionRoute = require('./staffTransactionRoute');

function routesInit(app) {
  app.use('/', adminRoute);
  app.use('/', staffRoute);
  app.use('/', transactionRoute);
  app.use('/', collectionRoute);
  app.use('/', parcelsRoute);
  app.use('/', trackingRoute);
  app.use('/', staffTransactionRoute);
}

module.exports = routesInit;