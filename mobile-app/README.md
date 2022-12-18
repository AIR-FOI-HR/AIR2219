# eFlush Mobile application

## Technologies
* [React Native](https://reactnative.dev/)

## Prerequisites

* Latest [node.js](https://nodejs.org/en/) LTS version
* yarn - `npm install --global yarn`
* mobile app [Expo Go](https://expo.dev/client)

## Running the application

1. Run `yarn install` to install all the project dependencies
2. `yarn start` to run the project locally
3. The computer and mobile device need to be connected to the same network
3. Scan the QR code from the terminal with Expo Go (Android) or the Camera app (iOS)

*NOTE: eduroam internet is known to cause issues, try other networks*

## Project scripts
* `yarn install` - install project dependencies.
* `yarn start` - start the project in the development mode.
* `yarn android` - starts the Android simulator (if installed), installs the app and runs it.
* `yarn ios` - starts the iOS simulator (only on a Mac with Xcode), installs the app and runs it.

## Connect to phone

* Install Expo Go
* Make sure your phone and PC are on the same Wifi.
* `yarn start` the app and scan the code with Expo Go.

## Test API response 

* Run on Linux: 
`url -s https://ngrok-agent.s3.amazonaws.com/ngrok.asc | sudo tee /etc/apt/trusted.gpg.d/ngrok.asc >/dev/null && echo "deb https://ngrok-agent.s3.amazonaws.com buster main" | sudo tee /etc/apt/sources.list.d/ngrok.list && sudo apt update && sudo apt install ngrok`
* After installment run:
`ngrok http 8000`
* Run:
`hostname -I`
* Copy the first IP address and paste it in file src/api/api.ts instead of "localhost"  
