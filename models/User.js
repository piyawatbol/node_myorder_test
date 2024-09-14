const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String, required: false, unique: false },
    password: { type: String, required: true },
    sex: { type: String, enum: ["Male", "Female", "Other"], required: true },
    pincode: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    bank_account_number: { type: String, required: true },
    account_holder_name: { type: String, required: true },
    ifsc_code: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
