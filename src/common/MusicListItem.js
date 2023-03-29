import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
const {height, width} = Dimensions.get('window');
const MusicListItem = ({item, index, data}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={[
        styles.conatainer,
        {marginBottom: index == data.length - 1 ? 30 : 0},
      ]}
      onPress={() => {
        navigation.navigate('Music', {
          data: item,
          index: index,
        });
        //setModalVisible(true);
      }}>
      <Image source={item.artwork} style={styles.songImage} />
      <View style={styles.nameView}>
        <Text style={styles.name}>{item.title}</Text>
        <Text style={styles.name}>{item.artist}</Text>
      </View>
      {/* <TouchableOpacity>
        <Image source={require('../images/play.png')} style={styles.play} />
      </TouchableOpacity> */}
    </TouchableOpacity>
  );
};

export default MusicListItem;
const styles = StyleSheet.create({
  conatainer: {
    width: width - 20,
    height: 100,
    elevation: 5,
    marginTop: 20,
    backgroundColor: '#000',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  songImage: {
    width: 100,
    height: 90,
    borderRadius: 10,
    marginLeft: 7,
  },
  nameView: {
    paddingLeft: 15,
    width: '50%',
  },
  name: {
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
  },
  play: {
    width: 30,
    height: 30,
    // backgroundColor: 'white',
  },
});
