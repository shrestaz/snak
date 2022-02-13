# [Snak](https://snak.vercel.app/)

## Welcome to [Snak](https://snak.vercel.app/). A chat app built to connect you to the world.

"_Det at nogen snakker venskabeligt, afslappet eller uformelt med nogen_" - [Den Danske Ordbog](https://ordnet.dk/ddo/ordbog?query=snak)

This is a chat application built with MEAN stack fully developed with TypeScript. It is fully responsive built on [Angular 13](https://angular.io/) and powered by [Tailwind CSS](https://tailwindcss.com/).

### Features:

- Sign up as a new user
- Log in with your user
- See a list of all chat rooms
- Create a chat room
- Join any chat room in the list
- Send and receive messages in the chat room you have joined (powered by [socket.io](https://socket.io/))
- Persistent messages and users

### Screenshots

**[All screenshots](https://imgur.com/gallery/02jE89d)**

<kbd><img src="https://github.com/shrestaz/snak/blob/master/screenshots/landing-page.png" width=500></kbd>

### Demo

<img src="https://github.com/shrestaz/snak/blob/master/screenshots/demo.gif">

### Steps to run locally:

_This application was built on a UNIX-compliant system and assumes you are running it on one as well. Linux, WSL and MacOS are supported._

0. Have Node.js installed.
1. Clone the repository: `git clone https://github.com/shrestaz/snak.git`
2. Navigate into the folder: `cd snak`
3. Install dependencies: `npm install`
4. Create an `.env` file inside the folder `snak-server`.
   - Complete path to `.env` file is `snak/snak-server/.env`
5. Populate with secrets provided to you
6. From root of the project, start the application: `npm start`
   - Wait for both server and client to be built.
7. In your browser, access the application at `localhost:4200`
8. Profit!

### Steps to run unit tests:

_Only a handful of tests were written for the server due time crunch. Jest framework was used to write the unit tests._

1. Navigate to the server folder: `cd snak-server`
2. Run the test: `npm test`
