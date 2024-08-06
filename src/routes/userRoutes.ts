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
  uploadFileContent,
} from "../controllers/userController";
import upload from "../middleware/upload";

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
// Route for uploading images
router.post("/uploadFile", upload.uploadLogo.single("file"), uploadFileContent);
export default router;
