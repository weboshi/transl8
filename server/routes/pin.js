import express from "express";
import pin from "../controllers/pinsController"

const router = express.Router();


router.post("/", pin.createPin);
router.put("/update", pin.editUserPin);
router.delete("/:username", pin.remove);
router.get("/getUserPins/:username", pin.getUserPins);
router.get("/getPins", pin.findAll);
router.put("/upvote", pin.upVote);
router.put("/downvote", pin.downVote)



export default router;