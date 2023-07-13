import { useEffect, useState } from "react"
import getToken from "./getToken.ts"
import Message from "./components/Message.tsx"
export interface Message {
  id: number
  datetime_created: string
  actor_username: string
  type: "followuser" | "loveproject" | "favoriteproject" | "shareproject" | "becomeownerstudio" | "becomecurator"
  followed_username?: string
  actor_id: number
  followed_user_id?: number
  project_id?: number
  title?: string
  gallery_id?: number
  gallery_title?: string
  recipient_id?: number
  recipient_username?: string
}
export default () => {
  const [token, setToken] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  useEffect(() => {
    setInterval(async () => {
      setToken((await getToken()).user.token)
      console.log(await getMessageData())
    }, 500)
  }, [])
  const getMessageData = async () => {
    const data = await fetch("https://api.scratch.mit.edu/users/nakasyou1103/following/users/activity?limit=5", {
      "headers": {
        "sec-ch-ua": "\"Not.A/Brand\";v=\"8\", \"Chromium\";v=\"114\", \"Google Chrome\";v=\"114\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "x-token": token,
      },
      "referrer": "https://scratch.mit.edu/",
      "referrerPolicy": "strict-origin-when-cross-origin",
      "mode": "cors",
      "credentials": "omit"
    }).then(res=>res.json())
    
    const newMessages: Message[] = [...messages, ...data]
    const messagesRecord: Record<string, Message> = {}
    for(const newMessage of newMessages) {
      messagesRecord[String(newMessage.id) + newMessage.datetime_created] = newMessage
    }
    const result = Object.values(messagesRecord).sort((a,b) => {
      return new Date(b.datetime_created).getTime() - new Date(a.datetime_created).getTime()
    })
    setMessages(result)
    return result
  }
  
  return <>
    <div style={{
    }}>
      {
        messages.map(message => {
          return <Message key={message.id} message={message} />
        })
      }
    </div>
  </>
}
