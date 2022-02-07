import React from 'react';
import {Text, StyleSheet, FlatList} from 'react-native';
import Card from './Card';
import PropTypes from 'prop-types'

const propTypes = {
    title: PropTypes.string,
    content: PropTypes.arrayOf(PropTypes.object),
  }

class List extends React.PureComponent {
  render() {
    const {navigation, title, content} = this.props;
    return (
      <>
        <Text style={styles.text}>{title}</Text>
        <FlatList
          data={content}
          horizontal={true}
          renderItem={({item}) => <Card navigation={navigation} item={item} />}></FlatList>
      </>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop:10,
    color: 'white',
  },
});

List.propTypes = propTypes;
export default List;
