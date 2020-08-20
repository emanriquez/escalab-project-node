const express = require("express");
const router = express.Router();

const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");

const { userById, read, update, seachStudent,list } = require("../controllers/user");

router.get("/secret/:userId", requireSignin, isAuth, isAdmin, (req, res) => {
    res.json({
        user: req.profile
    });
});

router.get("/user/:userId", requireSignin, isAuth, read);
router.get("/user/list/:userId", requireSignin, isAuth,isAdmin, list);
router.put("/user/:userId", requireSignin, isAuth, update);
router.get("/user/search/:userId", requireSignin, isAuth, isAdmin, seachStudent);
router.param("userId", userById);

module.exports = router;