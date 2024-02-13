import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import api from "./src/server/apiHandler.js";
const port = 50001;
const app = express();
const PORT = process.env.PORT || port;

// Middleware to parse JSON payloads
app.use(bodyParser.json());

// Enable CORS for all origins
app.use(cors());

// Webhook route
app.use("/", api);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${PORT}`);
});
