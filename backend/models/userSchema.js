const mongoose = require("mongoose");
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
        name: {
            type: String,
            require: true,
            trim: true
        },
        email: {
            type: String,
            require: true,
            unique: true
        },
        phone: {
            type: String,
            require: true,
        },
        role: {
            type: Number,
            default: 0
        },
        password: {
            type: String,
            require: true
        },
        cpassword: {
            type: String,
            require: true
        },
        tokens: [{
            token: {
                type: String,
                require: true,
            }
        }]
    }, { timestamps: true }

)

// ========== HASHING THE PASSWORD ============

userSchema.pre("save", async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
})

// =========== GNEREATING THE TOKEN ============
userSchema.methods.generateAuthToken = async function() {
    try {

        let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY)
        this.tokens = this.tokens.concat({ token: token });
        await this.save();
        return token;
    } catch (error) {
        console.log(error);
    }
}

module.exports = mongoose.model("user", userSchema);