import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

const propTypes = {
  errTxt1: PropTypes.string,
  errTxt2: PropTypes.string,
};
const defaultProps = {
  errTxt1: 'Oops! Something went wrong.',
  errTxt2: 'Make sure you are online and restart the app',
};

class Error extends React.PureComponent {
    render() {
    const {errTxt1, errTxt2} = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{errTxt1}</Text>
        <Text style={styles.text}>{errTxt2}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  text: {
    fontWeight: 'bold',
    color: 'white',
  },
});

Error.defaultProps = defaultProps;
Error.propTypes = propTypes;
export default Error;
