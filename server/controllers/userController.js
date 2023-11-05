class userController {
  // GET 
  index(req, res) {
    res.send('admin home page');
  }

  // GET 
  loginAdmin(req, res) {
    res.send('admin login page');
  }
}

module.exports = new userController();