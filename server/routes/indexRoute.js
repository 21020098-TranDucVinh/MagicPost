const adminRoute = require('./adminRoute');
const transactionRoute = require('./transactionRoute');
const collectionRoute = require('./collectionRoute');
const parcelsRoute = require('./parcelsRoute');

function routesInit(app) {
  app.use('/', adminRoute);
  app.use('/', transactionRoute);
  app.use('/', collectionRoute);
  app.use('/', parcelsRoute);
}

module.exports = routesInit;