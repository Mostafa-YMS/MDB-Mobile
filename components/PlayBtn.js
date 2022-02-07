import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors} from 'react-native/Libraries/NewAppScreen';

class PlayBtn extends React.PureComponent {
  render() {
    const {handlePress} = this.props;
    return (
      <View style={styles.container}>
        <Pressable onPress={() => handlePress()} style={styles.btn}>
          <Icon name={'caret-forward-outline'} size={30} color={'white'} />
        </Pressable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  btn: {
    alignContent: 'center',
    position: 'absolute',
    top: -25,
    right: 25,
    borderRadius: 50,
    width: 50,
    height: 50,
    padding: 10,
    backgroundColor: Colors.primary,
  },
});
export default PlayBtn;
