import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";


const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            minlength: 2
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
                    const passwordStrengthRules = {
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
            },
        },
    },
        {timestamps: true }
);

userSchema.pre ("save", async function (next) {
    if (!this.isModified("password")) 
    return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});
    

userSchema.methods.comparePassword = async function (anotherPassword) {
    return bcrypt.compare(anotherPassword, this.password); 
};

const UserModel = mongoose.model("User", UserSchema);

export {
    UserSchema, UserModel
}