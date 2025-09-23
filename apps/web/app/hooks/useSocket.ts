
import { useEffect, useState } from "react"
import { wsUrl } from "../utils/apiUrl"

export default function useSocket() {
  const [isLoading, setisLoading] = useState(true)
  const [socket, setSocket] = useState<WebSocket>()
  useEffect(() => {
    const ws =
      new WebSocket(`${wsUrl}/?
`); 
    ws.onopen=(() => {
      setisLoading(false)
      setSocket(ws)
    })
  },[])
  return {isLoading,socket}
}
