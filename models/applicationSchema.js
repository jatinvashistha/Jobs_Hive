const mongoose = require('mongoose');
const applicationSchema = new mongoose.Schema({
    name: {
        type: String,
        required : [true,"Please enter your name"]
    },
    email: {
        type: String,
        required : [true, "Please enter your email"]
    },
    coverLetter: {
        type: String,
        required : [true, "Please provide a cover letter"]
        
    },
    phone: {
        type: Number,
        required : [true, "Please enter your phone number"]
    },
    address: {
        type: String,
        required  :[true, "Please enter your address"]
    },
    resume: {
        public_id: {
            type: String,
            required : true,
        },
        url: {
            type: String,
            required : true
        }
    },
    applicantID: {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required : true
        },
        role: {
            type: String,
            enum: ["Job Seeker"],
            required : true
        }
    },
    employerID: {
        user: {
            type: mongoose.Schema.Types.ObjectID,
            ref: "User",
            required : true
        },
        role: {
            type: String,
            enum: ["Employer"],
            required : true
        }
    }
})
module.exports = mongoose.model("Application", applicationSchema)
