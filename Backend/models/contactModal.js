const mongoose = require("mongoose");

// Schema for contact
const messageModel = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, 
    },
    firstName: {
      type: String,
      trim: true,
      required: [true, "First name is required"], d
    },
    lastName: {
      type: String,
      trim: true,
      required: [true, "Last name is required"], 
    },
    email: {
      type: String,
      trim: true,
      required: [true, "Email is required"],
      unique: true, 
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"], 
    },
    phone: {
      type: String,
      trim: true,
      required: [true, "Phone number is required"], 
      match: [/^\d{10}$/, "Please enter a valid 10-digit phone number"],
    },
    company: {
      type: String,
      trim: true,
      required: [true, "Company name is required"], 
    },
    jobTitle: {
      type: String,
      trim: true,
      required: [true, "Job title is required"], 
    },
  },
  {
    timestamps: true,
  }
);

const Contact = mongoose.model("Contact", messageModel);
module.exports = Contact;
