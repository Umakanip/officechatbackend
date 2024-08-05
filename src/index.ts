import express, { Request, Response } from "express";
import cors from "cors";
import syncDatabase from "./models/dbSync"; // Import from the correct path
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import bodyParser from "body-parser";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;

// Sync database
syncDatabase();

// Middleware
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, world!");
});

app.use("/api/auth", authRoutes);
app.use("/api", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
