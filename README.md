# What is this?
>### This project is a test for [Dialogtrail](https://www.dialogtrail.com/).

It's bootstraped with [create-react-app](https://github.com/facebook/create-react-app) and uses react hooks, typescript and no extra packages.

It's a site where you play the game [fizzbuzz](https://en.wikipedia.org/wiki/Fizz_buzz) against a bot through a chat window. The bot is a [react functional component](src/utils/Bot.tsx) that listens on changes in the [chatLog array](src/providers/ChatLogProvider.tsx) and after that sends responds depending on the input from the user.

The color scheme of the site is black, white, yellow and a dark green. The yellow and green are from Dialogtrails site.

It work both for mobile and for desktop.

Since i only applied for a frontend role the bot is only client based and don't use a backend, but this is a feature I wan't to add in the future, I'm thinking a loggin system where your entire chatLog is saved aswell as you can login and see imporvements and also make it customizable per user. For exampel more than 1 -> 100, maybe buzz at 7 and much more.

You can visit and try it out [here](https://fizzbuzz-bot-game.vercel.app/).

# Run it locally

## Requirements
* ### Git
* ### Node
* ### A computer
(In this order)

## Set it up
* ### Clone the repo
* ### ```cd {folder name}```
* ### ```yarn / npm i```
* ### ```yarn start / npm start```
* ### Have fun!
