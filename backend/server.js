
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

const PORT=process.env.PORT || 5000

// Configure express-session middleware
app.use(
    session({
        secret: process.env.SESSION_SECRET || "your-secret-key", // Use a secure secret
        resave: false, // Prevents session being saved back to the store if not modified
        saveUninitialized: false, // Prevents saving uninitialized sessions
        cookie: {
            secure: false, // Set to true if using HTTPS in production
            maxAge: 24 * 60 * 60 * 1000, // Cookie expiration (e.g., 1 day)
        },
    })
);

// Initialize passport and session support
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
    res.send("<h1>Server is ready</h1>");
});

// Define routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/explore", exploreRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    connectMongoDB();
});
