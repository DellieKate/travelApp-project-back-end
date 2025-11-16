import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

// Define User Schema
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 2,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (newEmail) => validator.isEmail(newEmail),
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    citizenship: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      validate: {
        validator: (newPassword) => {
          const passwordStrengthRules = {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 0,
            returnScore: false,
          };
          return validator.isStrongPassword(newPassword, passwordStrengthRules);
        },
        message: (props) =>
          `${props.value} is a weak password. Please use a mix of upper, lower, and numbers.`,
      },
    isAdmin: {
			type: Boolean,
			required: false
		},
		isBanned: {
			type: Boolean,
			required: false
    }},
  },
  { timestamps: true }
);

// 🔐 Hash password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// 🔍 Add method for comparing passwords during login
UserSchema.methods.comparePassword = async function (inputPassword) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  console.log("inputPassword, password", inputPassword, this.password);
  return bcrypt.compare(inputPassword, this.password);
};

// Export the model
const UserModel = mongoose.model("User", UserSchema);
export { UserSchema, UserModel };
