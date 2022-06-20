const mongoose = require("mongoose");
const bcrypt = require("bcrypt");                                 //schema fields

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is Required"],
    unique: true,
  },
  mobile: {                          
    type: String,
    required: [true, "phone number is Required"],
    unique: true,
  },
  address: {
    type: String,
    required: [true, "Address is Required"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email is Required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is Required"],
  },
},{collection:"medxite"});                                       //encrypt/decrypt

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect email");
};

module.exports = mongoose.model("Users", userSchema);
