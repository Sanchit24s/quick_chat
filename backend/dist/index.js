import express from "express";
import "dotenv/config";
import cors from "cors";
const app = express();
const PORT = process.env.PORT || 7000;
import Routes from "./routes/index.js";
import { Server } from "socket.io";
import { createServer } from "http";
import { setupSocket } from "./socket.js";
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*"
    }
});
setupSocket(io);
export { io };
// * Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get("/", (req, res) => {
    return res.send("It's working 🙌");
});
// Routes
app.use("/api", Routes);
server.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
