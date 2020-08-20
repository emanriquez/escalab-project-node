const express = require("express");
const router = express.Router();

const {
    create,
    lessonById,
    read,
    remove,
    update,
    list,
    listbyCourse
} = require("../controllers/lesson");



//CONTROLLER REFERENCE
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");
const { courseById } = require("../controllers/courses");



//API ROUTER

//GET LEASSON
router.get("/leassons/:lessonId/:userId", requireSignin, isAuth, read);


//CREATE LEASSON
router.post("/leassons/create/:userId", requireSignin, isAuth, isAdmin, create);

// DELETE LEASSON
router.delete(
    "/leassons/:lessonId/:userId",
    requireSignin,
    isAuth,
    isAdmin,
    remove
);

//UPDATE LEASSON
router.put(
    "/leassons/update/:lessonId/:userId",
    requireSignin,
    isAuth,
    isAdmin,
    update
);

//LIST LEASSON FULL
router.get("/leassons", list);

//LIST LEASSON FOR COURSE
router.get("/leassons/list/:coursesId/:userId", listbyCourse);



router.param("userId", userById);
router.param("coursesId", courseById);
router.param("lessonId", lessonById);

module.exports = router;