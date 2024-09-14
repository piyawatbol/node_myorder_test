const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const upload = require('../../multer/multer-config.js');

router.get("/get-all", async (req, res) => {
  try {
    const users = await User.find();
    if (users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving users", error });
  }
});

router.get("/get-one/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving user", error });
  }
});

router.post("/add",upload.single('image'), async (req, res) => {
  try {

    const userData = req.body;
    console.log(userData);
    const newUser = new User({
      email: userData.email,
      password: userData.password,
      image: req.file ?  req.file.filename : "",
      sex: userData.sex,
      pincode: userData.pincode,
      address: userData.address,
      city: userData.city,
      state: userData.state,
      country: userData.country,
      bank_account_number: userData.bank_account_number,
      account_holder_name: userData.account_holder_name,
      ifsc_code: userData.ifsc_code,
    });

    await newUser.save();

    res
      .status(201)
      .json({ message: "User added successfully!", user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding user", error });
  }
});

router.post("/update/:id", upload.single('image'), async (req, res) => {
  try {
    const userId = req.params.id;
    const updateData = req.body;

    if (req.file) {
      updateData.image = req.file.filename;
    }
    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating user", error });
  }
});


router.delete("/delete/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting user", error });
  }
});

module.exports = router;
