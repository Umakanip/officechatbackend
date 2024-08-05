import { Router } from "express";
import {
  getUserList,
  getMessageList,
  getMessageListforSingle,
  getGroupMessagesList,
  getGroupList,
  createGroup,
  addUsersToGroup,
  getUsernameSuggestions,
  // updateStatus,
  getActiveUser,
} from "../controllers/userController";

const router = Router();

router.get("/users", getUserList);
router.get("/messagelist", getMessageList);
router.get("/messages/:senderId", getMessageListforSingle);
router.get("/grouplist", getGroupList);
router.get("/groupmessages", getGroupMessagesList);
router.post("/creategroup", createGroup);
router.post("/addUsers", addUsersToGroup);
router.get("/usernamesugggestions", getUsernameSuggestions);
// router.post("/updateStatus", updateStatus);
router.get("/getActiveUser", getActiveUser);
export default router;
