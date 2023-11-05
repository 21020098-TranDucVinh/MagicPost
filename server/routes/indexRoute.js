const adminRoute = require('./adminRoute');
const transactionRoute = require('./transactionRoute');
const collectionRoute = require('./collectionRoute');

function routesInit(app) {
  app.use('/', adminRoute);
  app.use('/', transactionRoute);
  app.use('/', collectionRoute);
}

module.exports = routesInit;