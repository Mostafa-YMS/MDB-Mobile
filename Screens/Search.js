import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {search} from './../services/services';
import Card from '../components/Card';
import Error from '../components/Error';

const Search = ({navigation}) => {
  const [text, setText] = useState('');
  const [searchResult, setSearchResult] = useState();
  const [eror, setError] = useState(false);

  const onSubmit = query => {
    Promise.all([search(query, 'movie'), search(query, 'tv')])

      .then(([movie, tv]) => {
        const data = [...movie, ...tv];
        setSearchResult(data);
      })
      .catch(() => {
        setError(true);
      });
    console.log(searchResult);
    // search(query, 'tv').then(reult => setSearchResult(reult))
  };
  return (
    <>
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              value={text}
              onChangeText={setText}
              placeholder={'Search for Movie or TV Show'}
            />
            <TouchableOpacity style={styles.btn} onPress={() => onSubmit(text)}>
              <Icon name={'search-outline'} size={30} color={'white'} />
            </TouchableOpacity>
          </View>
          <View>
            {searchResult && searchResult.length > 0 && (
              <FlatList
                numColumns={3}
                data={searchResult}
                renderItem={({item}) => (
                  <Card navigation={navigation} item={item} />
                )}
                keyExtractor={item => item.id}
              />
            )}

            {searchResult && searchResult.length == 0 && (
              <Text style={styles.noResult}>{'No Reuslts found'}</Text>
            )}

            {eror && <Error />}
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    marginBottom: 12,
    marginHorizontal: 12,
    padding: 8,
    borderWidth: 1,
    borderRadius: 10,
    flexGrow: 1,
    backgroundColor:'white'
  },
  noResult: {
    alignSelf: 'center',
    margin: 20,
    fontSize: 20,
  },
  container: {
    padding: 10,
    paddingTop: 20,
    backgroundColor:'black',
  },
  form: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btn: {
    color: 'black',
  },
});
export default Search;
