import { createContext, FC, useState } from "react"
import { iChatLogItem } from "../interfaces/ContextInterfaces"

// This is the context and provider for the chatLog, since this is not a big project it's better to just use useContext instead of setting up Redux
// It's in the bottom off the App component and makes it so i can use the chatLog variable aswell as the setChatLog variables anywhere in the application
export const ChatLogContext = createContext<any>(null)

export const ChatLogProvider: FC = ({ children }) => {
  const [chatLog, setChatLog] = useState<iChatLogItem[]>([])

  return (
    <ChatLogContext.Provider value={[chatLog, setChatLog]}>
      {children}  
    </ChatLogContext.Provider>
  )
}
