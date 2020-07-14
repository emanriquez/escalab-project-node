const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;


const courseSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32,
            unique: true
        },

        description: {
            type: String,
            required: true,
            maxlength: 2000
        },

        teacher: {
            type: ObjectId,
            ref: "Teacher",
            required: true
        },

       

        photo: {
            data: Buffer,
            contentType: String
        },


    },
    { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);