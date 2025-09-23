"use client";

import { useEffect, useState } from "react";
import useSocket from "../hooks/useSocket";

export function ChatMessage({
  messages,
  id,
}: {
  messages: { message: string }[];
  id: string;
}) {
  const [chats, setChats] = useState(messages);
  const [currentMessage, setCurrentMessage] = useState("");
  const { socket, isLoading } =useSocket();

  useEffect(() => {
    if (socket && !isLoading) {
      socket.send(
        JSON.stringify({
          type: "join_room",
          roomId: id,
        })
      );

      socket.onmessage = (event) => {
        const parsedData = JSON.parse(event.data);
        if (parsedData.type === "chat") {
          setChats((c) => [...c, { message: parsedData.message }]);
        }
      };
    }
  }, [socket, isLoading, id]);
console.log(chats)
  return (
    <div>
     
        <div>{chats.room.message}</div>

      <input
        type="text"
        value={currentMessage}
        onChange={(e) => {
          setCurrentMessage(e.target.value);
        }}
      ></input>
      <button
        onClick={() => {
          socket?.send(
            JSON.stringify({
              type: "chat",
              roomId: id,
              message: currentMessage,
            })
          );

          setCurrentMessage("");
        }}
      >
        Send message
      </button>
    </div>
  );
}
