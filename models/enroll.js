const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;


const EnrollSchema = new mongoose.Schema(
  {
    course: { type: ObjectId, ref: "Course"},
    status: {
      type: String,
      default: "enroll",
      enum: ["enroll", "cancelled"] // enum means string objects
    },
    updated: Date,
    user: { type: ObjectId, ref: "User" }
  },
  { timestamps: true }
);


module.exports = mongoose.model("Enroll", EnrollSchema);