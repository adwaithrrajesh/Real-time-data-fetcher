const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const socket = require("socket.io");

// Configuring port
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT || 8080;

// Configuring necessary modules
app.use(express.json());
app.use(morgan("dev"));

// Configuring Cors
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
}));

const dataRouter = require("./route/dataRoute");

app.use("/api", dataRouter);

const server = app.listen(port, () => {
    console.log(`Server started at port ${port}`);
});

// ------------------------------------------------ Socket io ------------------------------------------
const io = socket(server, {
    cors: {
        origin: "*",
        credentials: true
    }
});

app.set("io",io)

io.on("connection", (socket) => {
    console.log("Socket connected");
});

module.exports.io = io;
