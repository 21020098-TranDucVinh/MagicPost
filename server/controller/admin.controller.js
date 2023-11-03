

// create

//     console.log(results);
// });

var conn = require('../database');

module.exports.index = function(req, res) {
    var sql = 'SELECT * FROM admin';
    conn.query(sql, function (err, data, fields) {
        if (err) {
            console.error(err);
            res.status(500).send("Server error"); // Or render an error page
            return;
        }
        // Log the data to the console for debugging purposes
        console.log(data);
        // Render the index template and pass the posts data to it
        res.render('index', { posts: data });
        return data;
    });
};
const role = '';
const username = 'xuanbao02';
const password = 'password_02';
const phone = '123'
module.exports.create = function(req, res) {
    const query = "INSERT INTO admin (role, username, password, phone) VALUES (?,?,?,?)";
    conn.query(query, [role, username, password, phone], (err, results) => {
        if (err) {
            throw err;
        }
        // Log the data to the console for debugging purposes
        console.log(results);
        // Render the index template and pass the posts data to it
        res.render('index', { posts: results });
        return results;
    });
};
