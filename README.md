# Music Podcast App

A React Native app for playing music podcasts.

## Features

- Play/pause, skip forward/backward, and adjust volume
- Save playback progress across multiple sessions using AsyncStorage
- Jotai is used for state management
- React Navigation is used for navigation between screens
- MiniPlayer component displays information about the currently playing song
- List of available podcasts and latest episodes on the Home screen
- Detailed view of the currently playing podcast on the Music screen

## Code Structure

The app is composed of several files:

- `MusicData.js`: Contains metadata for the music podcasts, including title, artist, artwork, and URL.
- `AppNavigator.js`: Defines the stack navigator for the app's screens.
- `atoms.js`: Contains Jotai atoms used for state management.
- `Home.js`: Renders the Home screen, which displays a list of available podcasts and latest episodes, as well as a MiniPlayer component.
- `Music.js`: Renders the Music screen, which displays a detailed view of the currently playing podcast, including controls for playback, volume, and seeking, as well as a MiniPlayer component.
- `MiniPlayer.js`: Renders a MiniPlayer component that displays information about the currently playing song, including its artwork, title, artist, and playback progress.
- `MusicData.test.js`: Tests for the `songs` array in `MusicData.js`.

## Installation

1. Clone the repository: `git clone https://github.com/danishsshaikh/thenewlaupod.git`
2. Install dependencies: `npm install`
3. Run the app: `npx react-native run-android` (for Android) or `npx react-native run-ios` (for iOS)
4. To run the tests, use the command: `npm test`

Note: You will need to have Node.js, npm, and React Native installed on your machine in order to run the app.

## Conclusion

This is a simple example of a music podcast app built with React Native. It includes basic functionality for playing, pausing, skipping, and adjusting volume, as well as saving playback progress across multiple sessions.
