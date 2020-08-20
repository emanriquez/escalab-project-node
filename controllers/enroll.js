const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const Enroll = require("../models/enroll");
const { errorHandler } = require("../helpers/dbErrorHandler");


//ENROLL ID
exports.enrollById = (req, res, next, id) => {
    Enroll.findById(id)
        .populate("course.course", "_id, name")
        .exec((err, enroll) => {
            if (err || !enroll) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            req.enroll = enroll;
            next();
        });
};


//CREATE ENROLL STUDENT IN COURSE
exports.create = (req, res) => {
    
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields) => {
       
        // check for all fields
        const {
            course,
            status,
            user
        } = fields;

        if (
            !course ||
            !status ||
            !user
        ) {
            return res.status(400).json({
                error: "All fields are required"
            });
        }

       

        let enroll = new Enroll(fields);
      

        enroll.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }

            res.json(result);
        });
    });


};


//LIST ENROLL
exports.list = (req, res) => {

    let order = req.query.order ? req.query.order : "asc";
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";


    Enroll.find({user: req.profile._id})
        .populate("course", "_id name")
        .sort([[sortBy, order]])
        .exec((err, enroll) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(error)
                });
            }
            res.json(enroll);
        });
};


//LIST STUDENT ENROLL FOR COURSE
exports.listStudentCourse = (req, res) => {

    let order = req.query.order ? req.query.order : "asc";
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";


    Enroll.find({course: req.course._id})
        .populate("user", "_id name email")
        .sort([[sortBy, order]])
        .exec((err, enroll) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(error)
                });
            }
            res.json(enroll);
        });
};



//LIST STATUS VAL
exports.getStatusValues = (req, res) => {
    res.json(Enroll.schema.path("status").enumValues);
};
