const adminRoutes = require('./adminRoute');

function routesInit(app) {
  app.use('/admin', adminRoutes);

}

module.exports = routesInit;