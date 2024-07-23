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
  //   const fetchResult = await Users.findAll();
  //   console.log(fetchResult);
  try {
    const fetchResult = await Users.findAll();
    res.json(fetchResult);
    console.log(fetchResult);
    return fetchResult;
  } catch (err: any) {
    console.log("err", err.Message);
  }
  //   return fetchResult;
  // res.send({'Message':fetchResult})
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
