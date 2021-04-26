import { useContext, useEffect, useState } from "react"
import { iChatLogItem } from "../interfaces/ContextInterfaces"
import { ChatLogContext } from "../providers/ChatLogProvider"

const Bot = () => {
  const [chatLog, setChatLog] = useContext(ChatLogContext)
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [playingGame, setPlayingGame] = useState(false)
  const [gameIndex, setGameIndex] = useState(0)

  // Create the fizzbuzz pattern to have as a check if the user inputs the correct value
  // Also so the bot knows what it should send back
  // Also gets the highscore saved in the browser
  const [fizzBuzzPattern, setFizzBuzzPattern] = useState<string[]>([])
  useEffect(() => {
    const tempArr = []
    for (let i = 1; i <= 100; i++) {
      if (i % 15 === 0) {
        tempArr.push('fizzbuzz')
      } else if (i % 3 === 0) {
        tempArr.push('fizz')
      } else if (i % 5 === 0) {
        tempArr.push('buzz')
      } else {
        tempArr.push(i.toString())
      }
    }
    setFizzBuzzPattern(tempArr)

    // checks for highscore and sets it in the stateful variabe
    if (localStorage.getItem('highScore')) {
      setHighScore(parseInt(localStorage.getItem('highScore')!))
    }
  }, [])

  // The main bot logic, making use of the useEffect hook so that whenever the chatLog array updates the logic runs
  useEffect(() => {
    // Checks if should send the initial messages whith insctructions and so on
    if (!chatLog.length) {
      setChatLog(startMessages())
    } else {
      // Makes sure that the bot don't send msgs to itself and get's stuck in an infinite loop
      if (chatLog[chatLog.length - 1].sender === 'user') {
        const lastMsg = chatLog[chatLog.length - 1]

        // checks the differnet cases and what to respond with
        if (playingGame) {
          playGame(lastMsg)
        } else if (lastMsg.text.toLowerCase() === 'start') {
          startGame()
        } else if (lastMsg.text.toLowerCase() === 'score') {
          setChatLog([...chatLog, { text: `Your last score was ${score} points! 😴`, sender: 'bot' }])
        } else if (lastMsg.text.toLowerCase() === 'highscore') {
          setChatLog([...chatLog, { text: `Your highscore is ${highScore} points! 🤯`, sender: 'bot' }])
        } else if (lastMsg.text.toLowerCase() === 'fizzbuzz') {
          setChatLog([...chatLog, ...fizzBuzzText()])
        } else if (lastMsg.text.toLowerCase().includes('thank')) {
          setChatLog([...chatLog, { text: `No problemo kiddo! 🥳`, sender: 'bot' }])
        } else if (!lastMsg.text) {
          setChatLog([...chatLog, { text: `Are you afraid of me, or did you misclick? 🤔`, sender: 'bot' }])
        } else {
          setChatLog([...chatLog, { text: `I don't know this command... ❓`, sender: 'bot' }])
        }
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatLog])

  // What the bot should respond if the commenad from the user is "fizzbuzz"
  const fizzBuzzText = () => {
    const msgs: iChatLogItem[] = [
      { 
        text: 'Fizzbuzz is a computer program commonly used as a test for potentionall employees 🤹‍♀️',
        sender: 'bot' 
      }, 
      { 
        text: 'You go from 1 too 100 and say each number',
        sender: 'bot'
      }, 
      { 
        text: `If it's divisible by 3 you say "fizz"`,
        sender: 'bot'
      },  
      { 
        text: `If it's divisible by 5 you say "buzz"`,
        sender: 'bot'
      },  
      { 
        text: `If it's divisible by both 3 and 5 you say "fizzbuzz"`,
        sender: 'bot'
      },
    ]

    return msgs
  }

  // Creates an array that contains the initial values
  const startMessages = () => {
    const msgs: iChatLogItem[] = [
      {
        text: 'Welcome to FizzBuzz! 🎮',
        sender: 'bot',
      },
      {
        text: "Here's how to play:",
        sender: 'bot',
      },
      {
        text: 'To start the game type "start" 🧠',
        sender: 'bot',
      },
      {
        text: "When the game has started it's random who start, then we take turns 🎲",
        sender: 'bot',
      },
      {
        text: 'You get a point if the message you send is the correct in the pattern 🤯',
        sender: 'bot',
      },
      {
        text: "And that's it! 😎",
        sender: 'bot',
      },
      {
        text: 'To see the score from the previous game type "score" 🤩',
        sender: 'bot',
      },
      {
        text: 'To see all time highscore type "highscore" 🤑',
        sender: 'bot',
      },
      {
        text: `Don't know how fizzbuzz works? Type "fizzbuzz" to see how it works 😲`,
        sender: 'bot',
      },
    ]

    return msgs
  }

  // The logic for if the game is supposed to start
  const startGame = () => {
    setPlayingGame(true)
    const botStarts = Math.random() < 0.5

    const msgs: iChatLogItem[] = [] 
    if (botStarts) {
      msgs.push({ text: 'HAH! I go first! 🔥', sender: 'bot' })
      msgs.push({ text: fizzBuzzPattern[gameIndex], sender: 'bot' })
      setGameIndex(val => val + 1)
    } else {
      msgs.push({ text: 'Shoot! You go first... 😢', sender: 'bot' })
    }

    setChatLog([...chatLog, ...msgs])
  }

  // The logic for running the game
  const playGame = (chatLogItem: iChatLogItem) => {
    const msgs: iChatLogItem[] = []
    let tempScore = score
    // checks if you got it right or not
    if (fizzBuzzPattern[gameIndex] === chatLogItem.text.toLocaleLowerCase()) {
      tempScore++
      msgs.push({ text: 'Shoot! You got it right! 😤', sender: 'bot' })
    } else {
      msgs.push({ text: `HAH! You got it wrong! It should have been ${fizzBuzzPattern[gameIndex]} 😎`, sender: 'bot' })
    }
    
    // checks if the game is over or you should continue
    if (!fizzBuzzPattern[gameIndex + 1] || !fizzBuzzPattern[gameIndex + 2]) {

      // checks if the bot has the last input and then adds so that the bot finishes the pattern
      if (fizzBuzzPattern[gameIndex + 1]) {
        msgs.push({ text: fizzBuzzPattern[gameIndex + 1], sender: 'bot' })
      }

      msgs.push({ text: 'The game is over! 💩', sender: 'bot' })
      msgs.push({ text: `You got a score of ${tempScore} points! 🤩`, sender: 'bot' })
      
      // adds the new highscore and saves it in the browser
      if (score >= highScore) {
        msgs.push({ text: "Would you look at that! That's a new highscore! 🤯", sender: 'bot' })
        setHighScore(tempScore)
        localStorage.setItem('highScore', tempScore.toString())
      } else {
        msgs.push({ text: `You were ${highScore - tempScore} points off your highscore! 😢`, sender: 'bot' })
      }
      
      // sends msgs and also resets the game
      setChatLog([...chatLog, ...msgs])
      setGameIndex(0)
      setPlayingGame(false)
      setScore(0)
    } else {
      msgs.push({ text: fizzBuzzPattern[gameIndex + 1], sender: 'bot' })
      setChatLog([...chatLog, ...msgs])
      setGameIndex(val => val + 2)
      setScore(tempScore)
    }
  }

  // this makes it so that i can use it on the site but since it's an invisible element it does not appear on the site
  return (
    <>
    </>
  )
}

export default Bot
