const User = require("../models/user");
const { errorHandler } = require("../helpers/dbErrorHandler");


//USER ID
exports.userById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "User not found"
            });
        }
        req.profile = user;
        next();
    });
};

//USER READ
exports.read = (req, res) => {
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    return res.json(req.profile);
};


//USER UPDATE
exports.update = (req, res) => {
    User.findOneAndUpdate(
        { _id: req.profile._id },
        { $set: req.body },
        { new: true },
        (err, user) => {
            if (err) {
                return res.status(400).json({
                    error: "You are not authorized to perform this action"
                });
            }
            user.hashed_password = undefined;
            user.salt = undefined;
            res.json(user);
        }
    );
};


//USER ADD HISTORY ENROLL
exports.addEnrollHistory = (req, res, next) => {
    let history = [];

    history.push({
            course: req.body.course,    
            status: req.body.status
    });


    User.findOneAndUpdate(
        { _id: req.profile._id },
        { $push: { history: history } },
        { new: true },
        (error, data) => {
            if (error) {
                return res.status(400).json({
                    error: "Could not update user purchase history"
                });
            }
            next();
        }
    );
};


//LIST ALL USER 
exports.list = (req, res) => {
    let order = req.query.order ? req.query.order : "asc";
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    let limit = req.query.limit ? parseInt(req.query.limit) : 100;

    User.find()
      
        .sort([[sortBy, order]])
        .limit(limit)
        .exec((err, user) => {
            if (err) {
                return res.status(400).json({
                    error: "User not found"
                });
            }
            res.json(user);
        });
};


//SEARCH USER WITH DATA
exports.seachStudent = (req, res) => {
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
    let findArgs = {};

    for (let key in req.body) {
        if (req.body[key].length > 0) {
           
                findArgs[key] = req.body[key];
        
        }
    }

    User.find(findArgs)
        .populate("history.course","_id name")
        .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit)
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: "Products not found"
                });
            }
            res.json({
                size: data.length,
                data
            });
        });
};
