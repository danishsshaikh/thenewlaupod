import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {usePlaybackState, useProgress} from 'react-native-track-player';

const MiniPlayer = ({currentSong}) => {
  const playbackState = usePlaybackState();
  const progress = useProgress();

  return (
    <View style={styles.container}>
      <Image source={currentSong.artwork} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{currentSong.title}</Text>
        <Text style={styles.artist}>{currentSong.artist}</Text>
      </View>
      <View style={styles.progressContainer}>
        <View
          style={{
            width: (progress.position / progress.duration) * 100 + '%',
            backgroundColor: '#FF0D0D',
            height: 3,
          }}
        />
      </View>
      <View style={styles.playbackContainer}>
        <Image
          source={
            playbackState == 'playing'
              ? require('../images/pause.png')
              : require('../images/play.png')
          }
          style={styles.playbackButton}
        />
      </View>
    </View>
  );
};

export default MiniPlayer;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 20,
  },
  image: {
    width: 50,
    height: 50,
    margin: 10,
    borderRadius: 5,
  },
  infoContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  artist: {
    fontSize: 10,
    color: '#888',
  },
  progressContainer: {
    flex: 2,
    height: 3,
    backgroundColor: '#eee',
    marginHorizontal: 10,
  },
  playbackContainer: {
    width: 50,
    alignItems: 'center',
  },
  playbackButton: {
    width: 20,
    height: 20,
  },
});
