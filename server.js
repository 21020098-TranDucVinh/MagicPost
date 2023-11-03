const express = require('express');
const app = express();
const port = 3000;

var adminRoute = require('./routes/admin.route');
var conn = require('./database')

// app.set('view engine', 'pug');
// app.set('views', './views');

// const bodyParser = require('body-parser')
// app.use(bodyParser.urlencoded({ extended: true }))
 
 conn.connect(function (err){
    if(err)
    {
        throw err.stack;
    }
    else
    console.log("connect success");
 })

 app.use('', adminRoute);

app.listen(port, function(error){
    if (error) {
        console.log("Something went wrong");
    }
    console.log("server is running port:  " + port);
})
