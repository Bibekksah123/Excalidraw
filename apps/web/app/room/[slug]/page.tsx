import axios from "axios"
import { backendUrl } from "../../utils/apiUrl"
import ChatRoom from "../../components/ChatRoom"

const getRoom = async (slug: string) => {
  const response = await axios.get(`${backendUrl}/chatinfo/${slug}`)
  return response.data
}
export default async function ChatRoomId({ params }: {
  params: {
    slug:string
  }
}) {
  const slug = params.slug
  const getRoomId = await getRoom(slug)  
  const id = getRoomId?.id;
  return (
    <div>
      <ChatRoom id={1} />
    </div>
  )
}
