import { WebSocketServer, WebSocket } from "ws";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRETE } from "@repo/backend-common/config";
import { prismaClient } from "@repo/db/client"

const ws = new WebSocketServer({ port: 8080 });

interface User {
  userid: string | number;
  ws: WebSocket;
  room: string[];
}

const users: User[] = [];

async function checkUser(token: string) {
  try {
    const decode = await jwt.verify(token, JWT_SECRETE);
    if (typeof decode === "string") {
      return null;
    }
    if (!decode || !(decode as JwtPayload).id) {
      return null;
    }
    return (decode as JwtPayload).id;
  } catch (error) {
    return null;
  }
}

ws.on("connection", async (socket, request) => {
  const url = request.url;
  if (!url) {
    return null;
  }
  const queryString = url.includes("?") ? url.split("?")[1] : "";
  const params = new URLSearchParams(queryString);
  const token = params.get("token") || "";
  if (!token) {
    socket.close(4001, "Missing token");
    return;
  }

  const userId = await checkUser(token);
  if (userId == null) {
    socket.close();
    return;
  }
  if (userId !== null) {
    users.push({
      userid: userId,
      room: [],
      ws: socket,
    });
  }
  socket.on("message", async (data) => {
    const parseData = await JSON.parse(data as unknown as string);
    if (parseData.type == "join-room") {
      const user = users.find((x) => x.ws == socket);
      user?.room.push(parseData.roomId);
    }
    if (parseData.type == "leave-room") {
      const user = users.find((x) => x.ws == socket);
      if (!user) {
        return;
      }
      user.room = user?.room.filter((x) => x !== parseData.room);
    }
    if (parseData.type == "chat") {
      const roomId = parseData.roomId;
      const message = parseData.message;
      try {
        await prismaClient.chat.create({
          data: {
            roomId,
            userId,
            message
          }
        })
      } catch (error) {
        return null;
      }
      users.forEach((user) => {
        if (user.room.includes(roomId)) {
          user.ws.send(
            JSON.stringify({
              type: "chat",
              roomId,
              message: message,
            })
          );
        }
      });
    }
  });

  socket.on("close", () => {
    const index = users.findIndex((user) => user.ws === socket);
    if (index !== -1) {
      users.splice(index, 1);
    }
  });
});
