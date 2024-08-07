const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  fullName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.statics.signup = async function (fullName, email, password) {
  const exists = await this.findOne({ email });
  //validation
  if (!fullName || !email || !password) {
    throw Error("All fields must be filled ");
  }
  if (!validator.isEmail(email)) {
    throw Error(`Email isn't valid`);
  }
  if (!validator.isStrongPassword(password)) {
    throw Error(`Password not strong enough`);
  }

  if (exists) {
    throw Error("Email already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ fullName, email, password: hash });

  return user;
};

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled ");
  }
  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Incorrect email");
  }

  const match = await bcrypt.compare(password, user.password)
  if(!match){
    throw Error('Incorrect password')
  }
return user
};
module.exports = mongoose.model("User", userSchema);
