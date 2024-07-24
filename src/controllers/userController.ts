import { Request, Response } from "express";
import Users from "../models/UserModel";
import Messages from "../models/MessageModel";
import sequelize from "../models";

sequelize
  .sync()
  .then(() => {
    console.log("Database synchronized");
  })
  .catch((err) => {
    console.error("Database synchronization error:", err);
  });

export const getUserList = async (req: Request, res: Response) => {
  try {
    // Step 1: Fetch all unique SenderIDs from the Messages table
    const messages = await Messages.findAll({
      attributes: ["SenderID"],
      group: ["SenderID"],
    });

    // Extract unique user IDs from the messages
    const senderIDs = [
      ...new Set(messages.map((message: any) => message.SenderID)),
    ];

    // Step 2: Fetch user details from the Users table
    const users = await Users.findAll({
      where: {
        UserID: senderIDs,
      },
    });

    res.json(users);
  } catch (err: any) {
    console.error("Error fetching users:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getMessageList = async (req: Request, res: Response) => {
  console.log("req.body", req.query);
  try {
    const messageResult = await Messages.findAll({
      where: {
        SenderID: req.query.SenderID,
      },
    });
    res.json(messageResult);
    console.log("messageResult", messageResult);
    // res.json(messageResult);
    // return messageResult;
  } catch (err: any) {
    console.log("err", err.Message);
    res.status(500).send("Internal Server Error");
  }
};
