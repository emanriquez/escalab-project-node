const express = require("express");
const router = express.Router();

const {
    create,
    courseById,
    read,
    remove,
    update,
    list,
    listLeasons,
} = require("../controllers/courses");

const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");

router.get("/course/::coursesId", read);
router.post("/course/create/:userId", requireSignin, isAuth, isAdmin, create);
router.delete(
    "/course/::coursesId/:userId",
    requireSignin,
    isAuth,
    isAdmin,
    remove
);
router.put(
    "/course/::coursesId/:userId",
    requireSignin,
    isAuth,
    isAdmin,
    update
);

router.get("/course", list);
router.get("/course/leasons/:coursesId", listLeasons);


router.param("userId", userById);
router.param("coursesId", courseById);

module.exports = router;