"use client"
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [roomId, setroomId] = useState("")
  const router=useRouter()
  return (
    <div>
      <input type="text" placeholder="Enter Room Id" value={roomId} onChange={(e)=>setroomId(e.target.value)}/>
      <button onClick={() => {
        if(!roomId) return 
        router.push(`/room/${roomId}`)
      }}>Join Room</button>
    </div>
  );
}
