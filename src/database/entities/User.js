import mongoose from "mongoose";
import { validator } from "validator";
import * as crypto from "crypto";

let UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            minLength: 2
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: function (newEmail) {
                    return validator.isEmail(newEmail);
                },
            message: validatorError => `${validatorError.value} is not a valid email!`
        }},
        citizenship: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 8,
            validate: {
                validator: function (newPassword) {
                    let passwordStrengthRules = {
                        minLength: 8,
                        minLowercase: 1,
                        minUppercase: 1,
                        minNumbers: 1,
                        minSymbols: 0,
                        returnScore: false,
                        pointsPerUnique: 1,
                        pointsPerRepeat: 0.5,
                        pointsForContainingLower: 10,
                        pointsForContainingUpper: 10,
                        pointsForContainingNumber: 10,
                        pointsForContainingSymbol: 10
                    };
                    return validator.isStrongPassword(newPassword, passwordStrengthRules);
                },
                message: validatorError => `${validatorError.value} is a weak password. Try again!`
            }
        },
        salt: {
            type: String,
            required: false,
            default: function () {
                return crypto.randomBytes(64).toString("hex");
            }
        }
    }
);

// after salting password, need to hash it for more security before it is saved in the database
// do it here....

//password is saved!


const UserModel = mongoose.model("User", UserSchema);

exports = {
    UserSchema, UserModel
}
