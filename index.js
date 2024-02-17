import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import api from "./src/server/apiHandler.js";
import authLogic from "./src/server/authLogic.js";
import cookieParser from "cookie-parser";

const port = 50001;
const app = express();
const PORT = process.env.PORT || port;

// Middleware to parse JSON payloads and parse cookies
app.use(bodyParser.json());
app.use(cookieParser());

const corsOptions = {
  origin: "http://localhost:5173", // Specify the exact origin
  credentials: true, // Required to include cookies in cross-origin requests
};

// Enable CORS for spesific origins
app.use(cors(corsOptions));

// Webhook route
app.use("/", api);

app.use("/auth", authLogic);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${PORT}`);
});
