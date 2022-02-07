import React, {useState, useEffect} from 'react';
import {
  Text,
  Modal,
  ScrollView,
  StyleSheet,
  Image,
  View,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import StarRating from 'react-native-star-rating';
import {getMovie} from './../services/services';
import dateFormat from 'dateformat';
import PlayBtn from './../components/PlayBtn';
import {Video} from './../components/Video';

const dimensions = Dimensions.get('screen');

const Detail = ({route, navigation}) => {
  const [movieDetails, setMovieDetails] = useState();
  const [loaded, setLoaded] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const movieId = route.params;
  const imgBase = 'https://image.tmdb.org/t/p/w500';
  const placeHolder = require('../assets/images/placeholder.png');

  useEffect(() => {
    getMovie(movieId).then(movieData => {
      setMovieDetails(movieData);
      setLoaded(true);
    });
  }, [movieId]);

  const showVideo = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <React.Fragment>
      {loaded && (
        <View>
          <ScrollView style={style.scroll}>
            <Image
              resizeMode="cover"
              style={style.movieImg}
              source={
                movieDetails.poster_path
                  ? {uri: imgBase + movieDetails.poster_path}
                  : placeHolder
              }
            />
            <PlayBtn handlePress={showVideo} />
            <View style={style.container}>
              <Text style={style.name}>{movieDetails.title}</Text>
            </View>

            {movieDetails.genres && (
              <View style={style.genresContainer}>
                {movieDetails.genres.map(genre => {
                  return (
                    <Text key={genre.id} style={style.genres}>
                      {genre.name}
                    </Text>
                  );
                })}
              </View>
            )}
            <View style={style.rating}>
              <StarRating
                disabled={true}
                starSize={30}
                fullStarColor={'gold'}
                emptyStarColor={'gold'}
                maxStars={5}
                rating={movieDetails.vote_average / 2}
              />
              <Text style={style.overview}>{movieDetails.overview}</Text>
              <Text style={style.release}>{`Release date: ${dateFormat(
                movieDetails.release_date,
                'dd-mmmm-yyyy',
              )}`}</Text>
            </View>
          </ScrollView>
          <Modal
            animationType="slide"
            // transparent={true}
            visible={modalVisible}>
            <View style={style.modalClose}>
              <Video navigation={navigation} showVideo={showVideo} />
            </View>
          </Modal>
        </View>
      )}
      {!loaded && <ActivityIndicator size="large" style={style.loadingMovie} />}
    </React.Fragment>
  );
};

style = StyleSheet.create({
  movieImg: {
    height: dimensions.height / 2,
  },
  loadingMovie: {
    backgroundColor: 'black',
    height: dimensions.height,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 30,
    color: 'white',
  },
  genres: {
    color: 'white',
    marginHorizontal: 10,
    fontWeight: 'bold',
  },
  scroll: {backgroundColor: 'black'},
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  genresContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  rating: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  overview: {
    color: 'white',
    paddingVertical: 15,
  },
  release: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalClose: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});

export default Detail;
