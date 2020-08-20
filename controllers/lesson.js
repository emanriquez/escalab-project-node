const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const Lesson = require("../models/lessons");
const { errorHandler } = require("../helpers/dbErrorHandler");


//LEASSON ID
exports.lessonById = (req, res, next, id) => {
    Lesson.findById(id).exec((err, lessons) => {
        if (err || !lessons) {
            return res.status(400).json({
                error: "Course not found"
            });
        }
        req.lessons = lessons;
        next();
    });
};


//LEASON READ 
exports.read = (req, res) => {
    return res.json(req.lessons);
};


//LEASON CREATE FOR COURSE
exports.create = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields) => {
        // check for all fields
        const {
            name,
            description,
            body,
            course
        } = fields;

        if (
            !name ||
            !description ||
            !body ||
            !course 
        
        ) {
            return res.status(400).json({
                error: "All fields are required"
            });
        }

        let lessons = new Lesson(fields);


        
        lessons.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(result);
        });
    });
};


//REMOVE LEASON FOR COURSE
exports.remove = (req, res) => {
    let lessons = req.lessons;
    lessons.remove((err, deleteLesson) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({
            message: "Lesson deleted successfully"
        });
    });
};


//UPDATE LESOON
exports.update = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields) => {
        

        let lessons = req.lessons;
        lessons = _.extend(lessons, fields);

        
        lessons.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(result);
        });
    });
};


//LIST ALL LESSON
exports.list = (req, res) => {
    let order = req.query.order ? req.query.order : "asc";
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    let limit = req.query.limit ? parseInt(req.query.limit) : 6;

    Lesson.find()
      
        .sort([[sortBy, order]])
        .limit(limit)
        .exec((err, course) => {
            if (err) {
                return res.status(400).json({
                    error: "Course not found"
                });
            }
            res.json(course);
        });
};


//LIST ALL LESSON FOR COURSE
exports.listbyCourse = (req, res) => {
    let order = req.query.order ? req.query.order : "asc";
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
 

    Lesson.find({course: req.course._id})
        .populate("course", "_id name")
        .sort([[sortBy, order]])
        .exec((err, course) => {
            if (err) {
                return res.status(400).json({
                    error: "Course not found"
                });
            }
            res.json(course);
        });
};



