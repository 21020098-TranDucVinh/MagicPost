const adminRoute = require('./adminRoute');
const staffRoute = require('./staffRoute');
const transactionRoute = require('./transactionRoute');
const collectionRoute = require('./collectionRoute');
const parcelsRoute = require('./parcelsRoute');
const trackingRoute = require('./trackingRoute');

function routesInit(app) {
  app.use('/', adminRoute);
  app.use('/', staffRoute);
  app.use('/', transactionRoute);
  app.use('/', collectionRoute);
  app.use('/', parcelsRoute);
  app.use('/', trackingRoute);
}

module.exports = routesInit;