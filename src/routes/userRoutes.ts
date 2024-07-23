import { Router } from "express";
import { getUserList, getMessageList } from "../controllers/userController";

const router = Router();

router.get("/users", getUserList);
router.get("/messages", getMessageList);

export default router;
