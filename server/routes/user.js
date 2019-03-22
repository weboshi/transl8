import express from "express";
import user from "../controllers/usersController"
import passport from "passport";

const router = express.Router();

router.get("/:id", user.findById);
// router.post("/", user.create);
router.post("/logIn", user.signIn);
router.get("/getUserPins/:username", user.getUserPins);
router.put("/update", user.updateProfile);
router.delete("/:id", user.remove);
router.post("/signup", user.createUser);
// router.put("/newJob", user.newJob)
router.get("/auth", user.authUser);
router.put("/addbookmark/:username", user.addBookmark)
router.get("/bookmarks/:username", user.getBookmarks)
// router.put("/newPin", user.newPin);

export default router;