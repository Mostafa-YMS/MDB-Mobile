import React from 'react';
import {
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {PropTypes} from 'prop-types';

const propTypes = {
  main: PropTypes.bool,
};
const defaultProps = {
  main: false,
};
class Navbar extends React.PureComponent {
  render() {
    const {navigation, main} = this.props;
    return (
      <SafeAreaView>
        {main ? (
          <View style={styles.mainHead}>
            <Text style={styles.logo}>{'MDB'}</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Search')
              }}>
              <Icon name={'search-outline'} size={30} color={'white'} />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.detailHead}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <Icon name={'chevron-back'} size={40} color={'white'} />
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  detailHead: {
    backgroundColor: 'black',
  },
  mainHead: {
    //   flex:1,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: 'black',
  },
});
Navbar.defaultProps = defaultProps;
Navbar.propTypes = propTypes;
export default Navbar;
