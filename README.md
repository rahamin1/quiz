# quiz v1.0.2
A quiz game, fetching trivia questions from https://opentdb.com/

Note: The categories (e.g. Television, Computers) and difficulty levels (easy, medium) are limited, since not too many questions exist in the site for other categories and for the 'hard' level (I didn't check all, of course. But, for example, there are 'hard' questions only for few categories, therefore 'hard' cannot be selected.). More can be added, if there are questions available.

In a similar way to category and difficulty, adding other 'selections' is quite easy (e.g number of questions).

## Installation

**Install expo and run the app inside expo**
* (For expo installation see full instructions in https://docs.expo.io/versions/v30.0.0/introduction/installation.html)
* install expo cli: `npm install -g expo-cli`
* Install expo mobile client on android or iOS from google play / app store
* On your mobile device, open https://expo.io/@rahamin/the-quiz-game. You will be redirected to the expo application. Inside the expo application, click to open.

*	**Clone and install packages**
```
git clone https://github.com/rahamin1/quiz
cd quiz
yarn install
```

*	**Run on iOS**
		*	Refer to the expo documentation (Has not been tested yet)

*	**Run on Android**
	*	On a Windows PC, make sure you have an `Android emulator` installed and running (genymotion is the preferred one), or, connect a device to your PC's USB
	*	Run `expo start` in your terminal
	* A browser window will be opened. Click on 'run on android device/emulator'
	* For more information refer to https://facebook.github.io/react-native/docs/running-on-device
