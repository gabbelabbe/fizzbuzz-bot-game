import { useContext, useEffect, useRef } from "react"
import { iChatLogItem } from "../interfaces/ContextInterfaces"
import { ChatLogContext } from "../providers/ChatLogProvider"

const ChatMessageList = () => {
  const [chatLog] = useContext(ChatLogContext) as [iChatLogItem[]]
  const dummy = useRef<HTMLSpanElement>(null)

  // Makes it so that the page scolls down to the dummy element when a new msg appears
  useEffect(() => {
    dummy.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatLog])

  return (
    <div className='ChatMessageList'>
      {
        chatLog.map((chatItem, i) => (
          <div className={`ChatMsg ${chatItem.sender}`} key={i}>
            {chatItem.text}
          </div>
        ))
      }
      <span ref={dummy}></span>
    </div>
  )
}

export default ChatMessageList