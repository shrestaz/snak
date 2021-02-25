# Snak

## Welcome to Snak. A chat app built to connect you to the world.

"_Det at nogen snakker venskabeligt, afslappet eller uformelt med nogen_" - [Den Danske Ordbog](https://ordnet.dk/ddo/ordbog?query=snak)

This is a chat application built with MEAN stack fully developed with TypeScript. It is fully responsive powered by [Angular](https://angular.io/) and [Tailwind CSS](https://tailwindcss.com/).

### Features:

- Sign up as a new user
- Log in with your user
- See a list of all chat rooms
- Create a chat room
- Join any chat room in the list
- Send and receive messages in the chat room you have joined (powered by [socket.io](https://socket.io/))
- Persistent messages and users

### Steps to run locally:

_This application was built on a UNIX-compliant system and assumes you are running it on one as well. Linux, WSL and MacOS are supported._

0. **IMPORTANT**: Make sure you have LTS version of Node.js with npm version npm 6.14.xx. Angular has issues with npm version 7.xx. [Link to issue](https://github.com/angular/angular-cli/issues/19957)
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
