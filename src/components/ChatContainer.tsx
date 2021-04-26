import ChatInputField from "./ChatInputField"
import ChatMessageList from "./ChatMessageList"

const ChatContainer = () => {

  return (
    <div className='ChatContainer'>
      <ChatMessageList />
      <ChatInputField />
    </div>
  )
}

export default ChatContainer