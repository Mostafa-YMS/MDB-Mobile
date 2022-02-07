import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import {
  getPopularMovies,
  getUpcomingMovies,
  getPopularShows,
  getFamilyMovies,
  getHistoryMovies,
} from '../services/services';
import {SliderBox} from 'react-native-image-slider-box';
import List from './../components/List';
import Error from './../components/Error';

const dimensions = Dimensions.get('screen');
const Home = ({navigation}) => {
  const [popularMovies, setPopularMovies] = useState();
  const [familyMovies, setFamilyMovies] = useState();
  const [popularShows, setPopularShows] = useState();
  const [historyMovies, setHistoryMovies] = useState();

  const [eror, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const [moviesImages, setMoviesImages] = useState([]);
  const imgBase = 'https://image.tmdb.org/t/p/w500';

  const getData = Promise.all([
    getUpcomingMovies(),
    getPopularMovies(),
    getPopularShows(),
    getFamilyMovies(),
    getHistoryMovies(),
  ]);

  useEffect(() => {
    getData
      .then(
        ([
          upcomingMoviesData,
          popularMoviesData,
          popularShowsData,
          familyMoviesData,
          historyMoviesData,
        ]) => {
          // upcoming
          const imgs = [];
          upcomingMoviesData.forEach(element => {
            imgs.push(imgBase + element.poster_path);
          });
          setMoviesImages(imgs);

          //popular shows
          setPopularShows(popularShowsData);

          //popular movies
          setPopularMovies(popularMoviesData);

          //family movies
          setFamilyMovies(familyMoviesData);

          //history
          setHistoryMovies(historyMoviesData);

          setLoaded(true);
        },
      )
      .catch(err => {
        setError(err);
      })
      .finally(() => {
        // setLoaded(true);
      });
  }, []);

  return (
    <>
      {loaded && !eror && (
        <ScrollView style={styles.scroll}>
          {/* {loaded && <ActivityIndicator/>} */}
          {moviesImages && (
            <View style={styles.sliderContainer}>
              <SliderBox
              // onCurrentImagePressed={()=>navigation.navigate("Details")}
                images={moviesImages}
                sliderBoxHeight={dimensions.height / 1.5}
                // autoplay={true}
                circleLoop={true}
                dotStyle={styles.sliderStyle}
              />
            </View>
          )}

          {popularMovies && (
            <View style={styles.carousel}>
              <List navigation={navigation} title="Popular Movies" content={popularMovies} />
            </View>
          )}

          {popularShows && (
            <View style={styles.carousel}>
              <List navigation={navigation} title="Popular Tv Shows" content={popularShows} />
            </View>
          )}

          {familyMovies && (
            <View style={styles.carousel}>
              <List navigation={navigation} title="Family Movies" content={familyMovies} />
            </View>
          )}

          {historyMovies && (
            <View style={styles.carousel}>
              <List navigation={navigation} title="History" content={historyMovies} />
            </View>
          )}
        </ScrollView>
      )}
      {!loaded && !eror && (
        <ActivityIndicator size="large" style={styles.loading} />
      )}
      {eror && <Error />}
    </>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderStyle: {height: 0},
  carousel: {flex: 1, justifyContent: 'center'},
  scroll: {backgroundColor: 'black'},
  loading: {
    backgroundColor: 'black',
    height: dimensions.height,
  },
});

export default Home;
