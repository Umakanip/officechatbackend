import { Request, Response } from "express";
import Users from "../models/UserModel";
import Messages from "../models/MessageModel";
import Chats from "../models/ChatModel";
import Groups from "../models/GroupModel";
import Files from "../models/FileModel";
import fs from 'fs';
import path from 'path';
import GroupMembers from "../models/GroupMembers";
import { Op } from "sequelize";
import { updateUserActivity, getUserActivity } from "../routes/activityTracker";
import { getLoggedInUsers } from "../routes/userTracker";

export const getUserList = async (req: Request, res: Response) => {
  console.log("/Users API check");
  try {
    // Step 1: Fetch unique SenderIDs from the Messages table
    const messages = await Messages.findAll({
      attributes: ["SenderID"],
      group: ["SenderID"],
    });

    if (!messages || messages.length === 0) {
      console.warn("No messages found.");
      return res.status(404).json({ message: "No messages found." });
    }

    // Extract unique user IDs from the messages
    const senderIDs = messages.map((message: any) => message.SenderID);

    // If no SenderIDs found, return an empty array
    if (senderIDs.length === 0) {
      console.warn("No SenderIDs found.");
      return res.status(200).json([]);
    }

    // Step 2: Fetch user details from the Users table
    const users = await Users.findAll({
      where: {
        UserID: senderIDs,
      },
    });

    // If no users found, return an empty array
    if (!users || users.length === 0) {
      console.warn("No users found.");
      return res.status(404).json({ message: "No users found." });
    }
    // Step 3: Add active status to each user
    const activeUserIDs = new Set(getLoggedInUsers());
    const usersWithStatus = users.map((user) => ({
      ...user.toJSON(), // Convert Sequelize model instance to plain object
      isActive: activeUserIDs.has(user.UserID),
    }));

    res.json(usersWithStatus);
  } catch (err: any) {
    console.error("Error fetching users:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getActiveUser = async (req: Request, res: Response) => {
  try {
    const activeUserIDs = await getLoggedInUsers();
    res.json(activeUserIDs);
  } catch (err: any) {
    console.log("Error in Get USer Active Status API");
  }
};
export const getMessageList = async (req: Request, res: Response) => {
  // console.log("req.body", req.query);
  try {
    const messageResult = await Messages.findAll({});
    res.json(messageResult);
  } catch (err: any) {
    console.log("err", err.Message);
    res.status(500).send("Internal Server Error");
  }
};

export const getMessageListforSingle = async (req: Request, res: Response) => {
  console.log("Request received");
  console.log(`chatId: ${req.params.senderId}`);
  const senderId = parseInt(req.params.senderId, 10);

  try {
    const messages = await Messages.findAll({
      where: { SenderID: senderId },
      order: [["SentAt", "ASC"]], // Optional: Order messages by creation date
    });

    if (messages.length === 0) {
      return res
        .status(404)
        .json({ error: "No messages found for this ChatID" });
    }

    res.json(messages);
  } catch (err: any) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while fetching messages" });
  }
};

export const getGroupList = async (req: Request, res: Response) => {
  console.log("req.body", req.query);
  try {
    const groupResult = await Groups.findAll({
      order: [["CreatedAt", "DESC"]],
    });
    res.json(groupResult);
  } catch (err: any) {
    console.log("err", err.Message);
    res.status(500).send("Internal Server Error");
  }
};

export const getGroupMessagesList = async (req: Request, res: Response) => {
  console.log("Groupid: ", req.query.groupid);

  const groupId = req.query.groupid;
  console.log("Groupid: ", groupId);

  if (!groupId) {
    return res.status(400).json({ error: "Group ID is required" });
  }

  try {
    // Fetch all Chat IDs that belong to the given GroupID
    const chats = await Chats.findAll({
      attributes: ["ChatID"],
      where: {
        GroupID: groupId,
      },
    });
    console.log("chatIds", chats);
    // Extract Chat IDs
    const chatIds = chats.map((chat: any) => chat.ChatID);
    console.log("chatIds", chatIds);
    // Fetch messages for these Chat IDs
    const messages = await Messages.findAll({
      where: {
        ChatID: chatIds,
      },
      order: [["SentAt", "ASC"]], // Sort messages by timestamp
    });

    res.json(messages);
  } catch (err: any) {
    console.error("Error fetching group messages:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// export const getMessageList = async (req: Request, res: Response) => {
//   console.log("req.body", req.query);
//   try {
//     // Ensure SenderID is coming from query parameters
//     const senderID = req.query.SenderID as string;

//     if (!senderID) {
//       return res
//         .status(400)
//         .json({ error: "SenderID query parameter is required" });
//     }

//     const messageResult = await Messages.findAll({
//       where: {
//         SenderID: req.query.SenderID,
//       },
//     });
//     res.json(messageResult);
//   } catch (err: any) {
//     console.log("err", err.Message);
//     res.status(500).send("Internal Server Error");
//   }
// };

// export const createGroup = async (request: Request, response: Response) => {
//   const data = request.body;
//   console.log("data.GroupName", data.GroupName);

//   try {
//     // Create the group
//     const group = await Groups.create({
//       GroupName: data.GroupName,
//       CreatedBy: data.CreatedBy,
//       CreatedAt: data.CreatedAt,
//     });

//     // Optionally, you might want to return the created group or some confirmation
//     response.json({ success: true, group });
//   } catch (err: any) {
//     console.error("Error creating group chat:", err.message);
//     response.status(500).json({ error: "Internal Server Error" });
//   }
// };

// export const createGroup = async (request: Request, response: Response) => {
//   console.log("request check", request.body);
//   const { GroupName, userIDs, CreatedBy, CreatedAt } = request.body;
//   try {
//     // Check if the user ID exists in the Users table
//     const users = await Users.findAll({
//       where: {
//         Username: userIDs,
//       },
//     });

//     const existingUserIDs = users.map((user) => user.UserID);
//     const allUsersExist = userIDs.every((userID: any) =>
//       existingUserIDs.includes(userID)
//     );

//     if (!allUsersExist) {
//       return response
//         .status(400)
//         .json({ error: "One or more user IDs do not exist." });
//     }
//     // Create the group
//     const group = await Groups.create({
//       GroupName: GroupName,
//       CreatedBy: CreatedBy,
//       CreatedAt: CreatedAt,
//     });

//     // Add members to the group
//     const groupMembers = userIDs.map((UserID: any) => ({
//       GroupID: group.GroupID,
//       UserID,
//       JoinedAt: new Date(),
//     }));
//     console.log("Groupmembers", groupMembers);
//     await GroupMembers.bulkCreate(groupMembers);

//     response.json(group);
//   } catch (error) {
//     response.status(500).json({ error: "Error creating group" });
//   }
// };

export const createGroup = async (request: Request, response: Response) => {
  console.log("Request body:", request.body);
  const { GroupName, Username, CreatedBy, CreatedAt } = request.body;

  try {
    // Check if usernames are provided
    if (!Username || !Array.isArray(Username) || Username.length === 0) {
      return response.status(400).json({
        error: "Usernames array is required and should not be empty.",
      });
    }

    // Fetch user IDs based on provided usernames
    const users = await Users.findAll({
      where: {
        Username: Username, // Ensure the column name matches your schema
      },
    });

    console.log("Users fetched:", users);

    // Create a map of usernames to user IDs
    const userIDMap = new Map(
      users.map((user) => [user.Username, user.UserID])
    );

    console.log("UserID Map:", userIDMap);

    // Convert usernames to user IDs
    const userIDs = Username.map((name) => userIDMap.get(name)).filter(
      (id) => id !== undefined
    );

    console.log("User IDs:", userIDs);

    // Check if all provided usernames are valid
    if (userIDs.length !== Username.length) {
      return response
        .status(400)
        .json({ error: "One or more usernames do not exist." });
    }

    // Create the group
    const group = await Groups.create({
      GroupName: GroupName,
      CreatedBy: CreatedBy,
      CreatedAt: CreatedAt,
    });

    console.log("Group created:", group);

    // Add members to the group
    const groupMembers = userIDs.map((UserID: number) => ({
      GroupID: group.GroupID,
      UserID,
      JoinedAt: new Date(),
    }));

    console.log("Group members to be inserted:", groupMembers);
    await GroupMembers.bulkCreate(groupMembers);

    response.json(group);
  } catch (error: any) {
    console.error("Error creating group:", error.message);
    response.status(500).json({ error: "Error creating group" });
  }
};

export const addUsersToGroup = async (request: Request, response: Response) => {
  const { GroupID, Usernames } = request.body;
  console.log("Usernames", Usernames);

  try {
    // Check if GroupID and Usernames are provided
    if (!GroupID || !Usernames || !Array.isArray(Usernames)) {
      return response.status(400).json({ error: "Invalid input data" });
    }
    // Array to hold the inserted group members
    const insertedMembers: {
      GroupID: number;
      UserID: number;
      Username: string;
    }[] = [];
    // Iterate over the array of usernames
    for (const username of Usernames) {
      // Check if the user exists
      const user = await Users.findOne({ where: { Username: username } });
      if (!user) {
        return response
          .status(404)
          .json({ error: `User not found: ${username}` });
      }

      // Check if the user is already a member of the group
      const existingMember = await GroupMembers.findOne({
        where: {
          GroupID: GroupID,
          UserID: user.dataValues.UserID,
        },
      });

      if (existingMember) {
        console.log(`User ${username} is already a member of this group.`);
        // continue; // Skip to the next username
      }

      // Add the user to the group
      await GroupMembers.create({
        GroupID: GroupID,
        UserID: user.dataValues.UserID,
        JoinedAt: new Date(),
      });

      // Collect the inserted member details
      insertedMembers.push({
        GroupID: GroupID,
        UserID: user.dataValues.UserID,
        Username: user.dataValues.Username,
      });
    }
    const updatedGroup = await Groups.findOne({ where: { GroupID: GroupID } });
    console.log("/adduser success");
    return response.status(200).json({
      message: "Users added to group successfully",
      insertedMembers: insertedMembers,
      group: updatedGroup, // Include updated group details
    });
  } catch (error: any) {
    console.error("Error adding users to group:", error);
    // Handle unique constraint error specifically
    if (error.name === "SequelizeUniqueConstraintError") {
      return response
        .status(400)
        .json({ error: "Some users might already be members of this group." });
    }
    return response.status(500).json({ error: "Internal Server Error" });
  }
};

// Endpoint to get username suggestions based on input
export const getUsernameSuggestions = async (
  request: Request,
  response: Response
) => {
  const { query } = request.query;

  try {
    if (!query || typeof query !== "string") {
      return response.status(400).json({ error: "Invalid query parameter" });
    }

    // Search for users where username matches the query
    const users = await Users.findAll({
      where: {
        UserName: {
          [Op.like]: `%${query}%`, // Case-insensitive partial match
        },
      },
      attributes: ["Username"], // Return only the UserName attribute
    });

    // Extract usernames from the result
    const userNames = users.map((user) => user.Username);

    response.json(userNames);
  } catch (error) {
    response.status(500).json({ error: "Error fetching suggestions" });
  }
};

// export const getUserStatus = async (request: Request, response: Response) => {
//   try {
//     const users = await Users.findAll({
//       attributes: ["UserID", "Username", "Status"],
//     });
//     console.log("Status", users);
//     response.json(users);
//   } catch (error: any) {
//     response.status(500).json({ error: error.message });
//   }
// };

// Endpoint to update user activity status
// export const updateStatus = async (req: Request, res: Response) => {
//   const { userId, isActive } = req.body;

//   try {
//     updateUserActivity(userId, isActive);
//     res.status(200).json({ message: "Status updated" });
//   } catch (error) {
//     res.status(500).json({ message: "Error updating status" });
//   }
// };

// Endpoint to get user activity status
export const getUserStatus = async (req: Request, res: Response) => {
  console.log("getuserSattus", req.params.userId);
  const userId = parseInt(req.params.userId, 10);

  try {
    const status = getUserActivity(userId);
    res.status(200).json(status);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving status" });
  }
};


export const uploadFileContent = async (req: Request, res: Response) => {
  console.log('uploadFileContent',req.body);
  const { fileBlob, filename, MessageID } = req.body;
  console.log(filename);
  if (!fileBlob || !filename) {
    return res.status(400).json({ success: false, message: 'Content and Filename are required' });
  }

  try {

    const FileContent = Buffer.from(fileBlob, 'base64');

    // Define file path
    const filePath = path.join(__dirname, 'public', filename);

    // Save file content to a file
    fs.writeFileSync(filePath, FileContent);

    // Save file info to database
    await Files.create({
      MessageID: MessageID,
      FileName: filename,
      FileType: filename.mimetype, // Store MIME type
      FileSize: filename.size,
      FileContent: fs.readFileSync(filePath) // Read file content
    });

    res.status(200).json({ success: true, message: 'File content uploaded and saved successfully' });

  } catch (error) {
    console.error('Error uploading file content:', error);
    res.status(500).json({ success: false, message: 'Error uploading file content' });
  }
};
