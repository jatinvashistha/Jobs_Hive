const bcrypt = require('bcrypt')
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required : [true,"Please provide your name"]
    },
    email: {
        type: String,
        required : [true, "Please provide your email"]
    },
    phone: {
        type: Number,
        required : [true, "Please provide your phone number"]
    },
    password: {
        type: String,
        required : [true, "Please provide your password"]
    },
    role: {
        type: String,
        required: [true, "Please provide your role "],
        enum : ["Job Seeker", "Employee"]
    },
    resume : {
        type: String,
        
    }
,
    createdAt: {
        type: Date,
        default : Date.now
    }
})
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);

    }
    next();
    
})

userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
}

userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY,
        {
            expiresIn : process.env.JWT_EXPIRE
        }

    
    )
    
}
module.exports = mongoose.model("User",userSchema)