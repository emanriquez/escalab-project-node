const express = require("express");
const router = express.Router();

const {
    create,
    courseById,
    read,
    remove,
    update,
    list,
} = require("../controllers/courses");



const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");

router.get("/course/:coursesId", read);
router.post("/course/create/:userId", requireSignin, isAuth, isAdmin, create);
router.delete(
    "/course/:coursesId/:userId",
    requireSignin,
    isAuth,
    isAdmin,
    remove
);

router.put(
    "/course/update/:coursesId/:userId",
    requireSignin,
    isAuth,
    isAdmin,
    update
);


router.get("/course", list);
router.param("userId", userById);
router.param("coursesId", courseById);

module.exports = router;