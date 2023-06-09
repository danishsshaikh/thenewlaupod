import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import {Slider} from '@rneui/themed';
import {useRoute} from '@react-navigation/native';
import TrackPlayer, {
  Capability,
  usePlaybackState,
  useProgress,
  State,
} from 'react-native-track-player';
import {Tab} from '@rneui/base';
import {songs} from '../MusicData';
import MiniPlayer from './MiniPlayer';
import {atom, useAtom} from 'jotai';
import {currentSongAtom} from './atoms';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {height, width} = Dimensions.get('window');

const Music = () => {
  const route = useRoute();
  const progress = useProgress();
  const playbackState = usePlaybackState();
  const [currentSong, setCurrentSong] = useState(route.params.index);
  const [currentSongPlaying, setCurrentSongPlaying] = useAtom(currentSongAtom);
  const ref = useRef();
  const [playProgress, setPlayProgress] = useState(0);

  //console.log(route.params.index);

  useEffect(() => {
    setTimeout(() => {
      ref.current.scrollToIndex({
        animated: true,
        index: currentSong,
      });
    }, 500);
  }, []);

  useEffect(() => {
    setupPlayer();
  }, []);

  useEffect(() => {
    const getPlayProgress = async () => {
      try {
        const value = await AsyncStorage.getItem('playProgress');
        if (value !== null) {
          setPlayProgress(JSON.parse(value));
        }
      } catch (e) {
        console.log(e);
      }
    };

    getPlayProgress();
  }, []);

  useEffect(() => {
    const savePlayProgress = async () => {
      try {
        await AsyncStorage.setItem(
          'playProgress',
          JSON.stringify(playProgress),
        );
      } catch (e) {
        console.log(e);
      }
    };

    savePlayProgress();
  }, [playProgress]);

  const setupPlayer = async () => {
    try {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.updateOptions({
        // Media controls capabilities
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
          Capability.Stop,
        ],

        // Capabilities that will show up when the notification is in the compact form on Android
        compactCapabilities: [Capability.Play, Capability.Pause],

        // Icons for the notification on Android (if you don't like the default ones)
      });
      await TrackPlayer.add(songs);
      await TrackPlayer.skip(currentSong);
      togglePlayback(playbackState);
    } catch (e) {}
  };

  const togglePlayback = async playbackState => {
    console.log(playbackState);
    if (
      playbackState === State.Paused ||
      playbackState === State.Ready ||
      playbackState === State.Buffering ||
      playbackState === State.Connecting
    ) {
      await TrackPlayer.play();
    } else {
      await TrackPlayer.pause();
    }

    // Get the current playing song index
    const currentSongIndex = await TrackPlayer.getCurrentTrack();
    setCurrentSongPlaying(currentSongIndex);
    //console.log('Jotai:' + currentSongPlaying);

    // If the current playing song is not the same as the one in state, update the state
    if (currentSongIndex !== currentSong) {
      setCurrentSong(currentSongIndex);
      setPlayProgress(0); // reset play progress for the new song
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <FlatList
          horizontal
          ref={ref}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          data={songs}
          onScroll={async e => {
            const x = e.nativeEvent.contentOffset.x / width;
            setCurrentSong(parseInt(x.toFixed(0)));
            await TrackPlayer.skip(parseInt(x.toFixed(0)));
            togglePlayback(playbackState);
          }}
          renderItem={({item, index}) => {
            return (
              <View style={styles.bannerView}>
                <Image source={item.artwork} style={styles.banner} />
                <Text style={styles.name}>{item.title}</Text>
                <Text style={styles.nameArtist}>{item.artist}</Text>
                <Text style={styles.nameArtist}>{item.artist}</Text>
              </View>
            );
          }}
        />
      </View>

      <View style={styles.sliderView}>
        <Slider
          value={progress.position}
          maximumValue={progress.duration}
          minimumValue={0}
          thumbStyle={{width: 20, height: 20}}
          thumbTintColor={'black'}
          onValueChange={async value => {
            await TrackPlayer.seekTo(value);
          }}
        />
      </View>

      <View style={styles.btnArea}>
        <TouchableOpacity
          onPress={async () => {
            if (currentSong > 0) {
              setCurrentSong(currentSong - 1);
              ref.current.scrollToIndex({
                animated: true,
                index: parseInt(currentSong) - 1,
              });
              await TrackPlayer.skip(parseInt(currentSong) - 1);
              togglePlayback(playbackState);
            }
          }}>
          <Image
            source={require('../images/previous.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={async () => {
            // await TrackPlayer.skip(1);
            togglePlayback(playbackState);
          }}>
          <Image
            source={
              playbackState === State.Paused || playbackState === State.Ready
                ? require('../images/play.png')
                : require('../images/pause.png')
            }
            style={[styles.icon, {width: 50, height: 50}]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={async () => {
            if (songs.length - 1 > currentSong) {
              setCurrentSong(currentSong + 1);
              ref.current.scrollToIndex({
                animated: true,
                index: parseInt(currentSong) + 1,
              });
              await TrackPlayer.skip(parseInt(currentSong) + 1);
              togglePlayback(playbackState);
            }
          }}>
          <Image source={require('../images/next.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>

      <View style={styles.btnArea}>
        <TouchableOpacity>
          <Image source={require('../images/repeat.png')} style={styles.icon} />
        </TouchableOpacity>

        <TouchableOpacity>
          <Image source={require('../images/suffle.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>

      {/* Add the MiniPlayer component */}
      {/* {currentSong && <MiniPlayer currentSong={songs[currentSong]} />} */}
      {/* {<MiniPlayer currentSong={songs[currentSong]} />} */}
    </View>
  );
};

export default Music;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '',
  },
  bannerView: {
    width: width,
    height: height / 2 - 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 100,
  },
  banner: {
    width: '80%',
    height: '90%',
    borderRadius: 20,
  },
  name: {
    marginTop: 10,
    fontSize: 18,
    // marginLeft: 20,
    fontWeight: '500',
    color: '#000',
  },
  nameArtist: {
    marginTop: 0,
    fontSize: 18,
    // marginLeft: 20,
    fontWeight: '500',
    color: '#000',
  },
  sliderView: {
    marginTop: 20,
    alignSelf: 'center',
    width: '90%',
  },
  btnArea: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 20,
  },
  icon: {
    width: 35,
    height: 35,
  },
  durationView: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 20,
  },
});
