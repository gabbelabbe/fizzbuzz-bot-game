import { useContext, useState } from "react"
import { iChatLogItem } from "../interfaces/ContextInterfaces"
import { ChatLogContext } from "../providers/ChatLogProvider"

const ChatInputField = () => {
  const [msg, setMsg] = useState('')
  const [chatLog, setChatLog] = useContext(ChatLogContext) as [iChatLogItem[], React.Dispatch<React.SetStateAction<iChatLogItem[]>>]

  // this just adds the msg written in the input field to the chatlog array and removes the msg.
  const handleSubmit = (e: any) => {
    e.preventDefault()
    setChatLog([...chatLog, { 
      sender: 'user',
      text: msg 
    }])
    setMsg('')
  }

  return (
    <form className='ChatInputField' onSubmit={handleSubmit}>
      <input 
        type="text"
        placeholder="Type a msg!"
        onChange={(e: any) => setMsg(e.target.value)}
        value={msg}
      />
      <button>Send</button>
    </form>
  )
}

export default ChatInputField