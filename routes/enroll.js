const express = require("express");
const router = express.Router();

const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById, addEnrollHistory  } = require("../controllers/user");
const { courseById  } = require("../controllers/courses");

const {
    create,
    list,
    getStatusValues,
    listStudentCourse
} = require("../controllers/enroll");


router.post("/enroll/create/:userId", requireSignin, isAuth, isAdmin, addEnrollHistory, create);
router.get("/enroll/list/:userId", requireSignin, isAuth, list);
router.get("/enroll/list-student/:courseId/:userId", requireSignin, isAuth, isAdmin, listStudentCourse);
router.get("/enroll/status-values/:userId", requireSignin, isAuth, isAdmin, getStatusValues);
router.param("userId", userById);
router.param("courseId", courseById);

module.exports = router;