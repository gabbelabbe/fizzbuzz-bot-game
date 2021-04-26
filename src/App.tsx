import './App.css'
import ChatContainer from './components/ChatContainer'
import { ChatLogProvider } from './providers/ChatLogProvider'
import Bot from './utils/Bot'
import Header from './components/Header'

function App() {
  // I use the provider here to make sure that everything has access to the chatLog
  return (
    <ChatLogProvider>
      <div className="App">
        <Header />
        <Bot />
        <ChatContainer />
      </div>
    </ChatLogProvider>
  )
}

export default App
