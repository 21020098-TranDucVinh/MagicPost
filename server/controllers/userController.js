class userController {
  // GET /admin
  index(req, res) {
    res.send('admin home page');
  }

  // GET /admin/login
  loginAdmin(req, res) {
    res.send('admin login page');
  }
}

module.exports = new userController();