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
  postCall,
  //  getCallById,
  // getSingleUserList,
  getGroupMembersWithUsernames,
  deleteGroupMembers,
} from "../controllers/userController";

const router = Router();

router.get("/users", getUserList);
// router.get("/users/:callerId", getSingleUserList);
router.get("/messagelist", getMessageList);
router.get("/messages/:senderId", getMessageListforSingle);
router.get("/grouplist", getGroupList);
router.get("/groupmembers/:groupId", getGroupMembersWithUsernames);
router.delete("/groups/:groupId/members/:userId", deleteGroupMembers);
router.get("/groupmessages", getGroupMessagesList);
router.post("/creategroup", createGroup);
router.post("/addUsers", addUsersToGroup);
router.get("/usernamesugggestions", getUsernameSuggestions);
// router.post("/updateStatus", updateStatus);
router.get("/getActiveUser", getActiveUser);
// Route for uploading images
router.post("/uploadFile", getUploadFile);
// router.post("/voiceCall",getVoiceCall)
router.post('/postCall', postCall);
// Route to fetch call record by CallID
// router.get('/calls/:callId', getCallById);
export default router;
