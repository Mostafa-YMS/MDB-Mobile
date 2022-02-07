import React from 'react';
import {TouchableOpacity, StyleSheet, Image, Text} from 'react-native';
import PropTypes from 'prop-types'

const propTypes = {
  item: PropTypes.object,
}
class Card extends React.PureComponent {
  render() {
    const {navigation, item} = this.props;
    const imgBase = 'https://image.tmdb.org/t/p/w500';
    const placeHolder = require('../assets/images/placeholder.png');

    return (
      <TouchableOpacity style={styles.movieCard} onPress={()=>navigation.navigate("Details", item.id)}>
        <Image
          resizeMode="cover"
          style={styles.img}
          source={
            item.poster_path ? {uri: imgBase + item.poster_path} : placeHolder
          }
        />
        {!item.poster_path && (
          <Text style={styles.movieTitle}>{item.title}</Text>
        )}
      </TouchableOpacity>
    );
  }
}
styles = StyleSheet.create({
  movieCard: {
    padding: 5,
    position: 'relative',
    alignItems: 'center',
  },
  img: {
    height: 200,
    width: 120,
    borderRadius: 20,
  },
  movieTitle: {
    position: 'absolute',
    top: 20,
    textAlign: 'center',
  },
});

Card.propTypes = propTypes;
export default Card;
