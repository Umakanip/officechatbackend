// routes/authRoutes.ts
import { Router, Request, Response } from "express";
import User from "../models/UserModel";
import bcrypt from "bcrypt";

const router = Router();

router.post("/login", async (req: Request, res: Response) => {
  console.log(req.body);
  const { Email, PasswordHash } = req.body;

  try {
    const user = await User.findOne({ where: { Email, PasswordHash } });
    console.log("user data", user.dataValues);
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // const validPassword = await bcrypt.compare(PasswordHash, user.PasswordHash);

    // if (!validPassword) {
    //   return res.status(401).json({ message: "Invalid credentials2" });
    // }

    // Here you can generate a JWT token or session
    return res
      .status(200)
      .json({ userDetails: user.dataValues, message: "Login successful" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
