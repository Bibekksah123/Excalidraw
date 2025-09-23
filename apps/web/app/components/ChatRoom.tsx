import axios from "axios"
import { backendUrl } from "../utils/apiUrl"
import { ChatMessage } from "./ChatMessage";

const getChatMessage = async (id: number) => {
  const response = await axios.get(`${backendUrl}/chat/${id}`);
  return response.data;
}

export default async function ChatRoomMessage({ id }: {
  id:number
}) {
  const messages = await getChatMessage(id)
  return <ChatMessage id={id} messages={messages}/>
}
