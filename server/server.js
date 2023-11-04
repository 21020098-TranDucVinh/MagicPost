const express = require('express');
const routesInit = require('./routes/indexRoute');

const app = express();

//database
const db = require('./models');
(async () => {
  await db.sequelize.sync();
})();

//Parse JSON bodies
app.use(express.json())
//Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }))

// handle routes
routesInit(app);

const port = process.env.PORT || 5000;
app.listen(5000, () => {
  console.log(`Server is running on port ${port}`);
});