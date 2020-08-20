const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;



const lessonSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32
        },
        description: {
            type: String,
            required: true,
            maxlength: 200
        },
        body: {
            type: String,
            required: true,
            maxlength: 2000
        },
        course: {
            type: ObjectId,
            ref: "Course",
            required: true
        }




       
       
       
    },
    { timestamps: true }
);

module.exports = mongoose.model("Lesson", lessonSchema);