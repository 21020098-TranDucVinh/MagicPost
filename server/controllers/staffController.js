const {
  models: { Staff },
} = require("../models");

class staffController {
  // [POST] /staff
  async createStaff(req, res) {
    try {
      const { username, password, phone, zip_code } = req.body;
      console.log("check body : ", req.body);
      if (!username || !password || !phone || !zip_code) {
        return res.status(400).json({
          errorCode: 1,
          message: "Missing required field(s)",
        });
      }

      if (zip_code.startsWith("T")) {
        const staff = await Staff.create({
          username,
          password,
          phone,
          transaction_zip_code: zip_code,
        });

        // Return a success response
        return res.status(200).json({
          errorCode: 0,
          message: "Created a new transaction staff successfully!",
          staff,
        });
      } else if (zip_code.startsWith("C")) {
        const staff = await Staff.create({
          username,
          password,
          phone,
          collection_zip_code: zip_code,
        });

        // Return a success response
        return res.status(200).json({
          errorCode: 0,
          message: "Created a new collection staff successfully!",
          staff,
        });
      }
    } catch (error) {
      console.log(error);
      // Return a 500 status code for server errors
      return res.status(500).json({
        errorCode: 1,
        message: "Error creating a new staff!",
      });
    }
  }

  // [GET] /transaction_staff/:transaction_zip_code
  async getTransactionStaff(req, res) {
    try {
      const transaction_zip_code = req.params.transaction_zip_code;

      const staff = await Staff.findAndCountAll({
        where: {
          transaction_zip_code,
        },
      });
      return res.status(200).json({
        errorCode: 0,
        count: staff.count,
        staff: staff.rows,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        errorCode: 1,
        message: "Error find a transaction staff!",
      });
    }
  }

  // [PUT] /staff/:staff_id
  async updateStaff(req, res) {
    try {
      const staff_id = req.params.staff_id;
      const {
        username,
        password,
        phone,
        transaction_zip_code,
        collection_zip_code,
      } = req.body;
      if (!username || !password || !phone) {
        res.status(400).json({
          errorCode: 1,
          message: "Missing required field(s)",
        });
      }
      const staff = await Staff.update(
        {
          username,
          password,
          phone,
          transaction_zip_code,
          collection_zip_code,
        },
        {
          where: { staff_id },
        }
      );
      res.status(200).json({
        errorCode: 0,
        message: "Staff updated successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        errorCode: 1,
        message: "Error updating staff",
      });
    }
  }

  // [DELETE] /staff/:staff_id
  async deleteStaff(req, res) {
    try {
      const staff_id = req.params.staff_id;
      const staff = await Staff.destroy({
        where: { staff_id },
      });
      if (staff === 0) {
        res.status(404).json({
          errorCode: 1,
          message: "No staff found with ID = " + id,
        });
      } else {
        res.status(200).json({
          errorCode: 0,
          message: "Staff deleted successfully",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        errorCode: 1,
        message: "Something went wrong with server",
      });
    }
  }
}

module.exports = new staffController();
