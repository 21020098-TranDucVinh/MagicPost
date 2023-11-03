const adminRoutes = require('./adminRoutes');

function routesInit(app) {
  app.use('/admin', adminRoutes);
}

module.exports = routesInit;