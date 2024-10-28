import "./passport/github.auth.js";
import passport from "passport";
import session from "express-session";

import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes.js";
import exploreRoutes from "./routes/explore.routes.js";
import authRoutes from "./routes/auth.routes.js";
import cors from "cors";
import connectMongoDB from "./db/connectMongoDB.js";

dotenv.config();
const app = express();
app.use(cors());

app.get("/", (req, res) => {
    res.send("<h1>Server is ready</h1>");
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/explore", exploreRoutes);

app.listen(5000, () => {
    console.log("Server running on port 5000");
    connectMongoDB();
});
