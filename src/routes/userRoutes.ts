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
  getUploadFile,
  // getSingleUserList,
} from "../controllers/userController";

const router = Router();

router.get("/users", getUserList);
// router.get("/users/:callerId", getSingleUserList);
router.get("/messagelist", getMessageList);
router.get("/messages/:senderId", getMessageListforSingle);
router.get("/grouplist", getGroupList);
router.get("/groupmessages", getGroupMessagesList);
router.post("/creategroup", createGroup);
router.post("/addUsers", addUsersToGroup);
router.get("/usernamesugggestions", getUsernameSuggestions);
// router.post("/updateStatus", updateStatus);
router.get("/getActiveUser", getActiveUser);
// Route for uploading images
router.post("/uploadFile", getUploadFile);
export default router;
