import {View, Text, StyleSheet, FlatList, Image} from 'react-native';
import React, {useEffect} from 'react';
import {songs, artworkPodcasts} from '../MusicData';
import MusicListItem from '../common/MusicListItem';
import MiniPlayer from './MiniPlayer';
import {atom, useAtom} from 'jotai';
import {currentSongAtom} from './atoms';

const Home = () => {
  const [currentSongPlayingIndex] = useAtom(currentSongAtom);
  //console.log('Jotai from Home :' + currentSongPlayingIndex);
  // useEffect(() => {
  //   console.log(currentSongAtom);
  // }, 2000);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>| NewsLaundry</Text>
      </View>
      <Text style={[styles.logo, {marginTop: 30}]}>| All Shows</Text>
      <View style={styles.allShows}>
        <FlatList
          horizontal
          data={artworkPodcasts}
          renderItem={({item, index}) => {
            return (
              <View>
                <Image source={item.artwork} style={styles.image} />
              </View>
            );
          }}
        />
      </View>
      <Text style={styles.logo}>| Latest Episodes</Text>
      <FlatList
        data={songs}
        renderItem={({item, index}) => {
          return <MusicListItem item={item} index={index} data={songs} />;
        }}
      />
      {<MiniPlayer currentSong={songs[currentSongPlayingIndex]} />}
    </View>
  );
};

export default Home;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  allShows: {
    borderWidth: 1,
    borderRadius: 0,
    borderColor: '#FF0D0D',
    padding: 0,
    marginVertical: 20,
    marginHorizontal: 30,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: 'black',
  },

  header: {
    height: 60,
    backgroundColor: '#000',
    width: '100%',
    elevation: 5,
    justifyContent: 'center',
  },
  logo: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FF0D0D',
    marginLeft: 20,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    marginRight: 10,
  },
});
