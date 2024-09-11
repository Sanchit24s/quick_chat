import { Server, Socket } from "socket.io";

interface CustomSocket extends Socket {
    room?: string;
}

export function setupSocket(io: Server) {

    io.use((socket: CustomSocket, next) => {
        const room = socket.handshake.auth.room;
        if (!room) {
            return next(new Error("Invalid room pls pass correct room id"));
        }

        socket.room = room;
        next();
    });

    io.on("connection", (socket: CustomSocket) => {
        // Join the room
        socket.join(socket.room);

        socket.on("message", (data) => {
            console.log("Server side message", data);
            // socket.broadcast.emit("message", data);
            io.to(socket.room).emit("message", data);
        });

        socket.on("disconnect", () => {
            console.log("A user disconnected", socket.id);
        });
    });
}
