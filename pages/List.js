// import { SearchBar } from '@rneui/base';
import React, { useEffect, useState } from 'react';
import { Image,FlatList, View, Text,StyleSheet, TextInput, ScrollView, TouchableOpacity, ActivityIndicator, VirtualizedList } from 'react-native';

const styles =StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
  },
  section_title:{
    fontSize: 25,
    fontWeight: '700',
    color: '#101010',
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center',
  },

  title: {
    fontSize: 15,
    color: '#101010',
    marginTop: 10,
    fontWeight: '700',
    paddingBottom: 10,
    textAlign: 'center',
  },
  movieItem: {
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 20,
    borderWidth: 10,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderColor: '#ccc',
    borderRadius: 75,
    backgroundColor: '#fff',
  },
  poster: {
    marginTop: 5,
    width: 100,
    height: 150,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#ccc',
  },

  //
  movieItemSearch: {
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
    marginHorizontal: 70,
    marginTop: 16,
    marginBottom: 20,
    borderWidth: 10,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderColor: '#ccc',
    borderRadius: 75,
    backgroundColor: '#fff',
  },
  poster_search:{
    marginTop: 5,
    width: 200,
    height: 300,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  title_search:{
    fontSize: 25,
    color: '#101010',
    marginTop: 10,
    fontWeight: '700',
    paddingBottom: 1,
    textAlign: 'center',
  },

 
  searchBar: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 1,
    borderRadius: 8,
  },
  input:{
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  error:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default function List({navigation}) {
  // Tab + API KEY
  const API_KEY = 'be49ddd9d51acd32358b6aa9aff7f823';
  const API_URL_POPULAR = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=fr-FR`;
  const API_URL_NOWPLAYING = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=fr-FR`;
  
  
  // const [query, setQuery] = useState('');
  // const [fullMovies, setFullMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);


// FETCH API DATA  
  const [movies_popular, setMovies_popular] = useState([])
  useEffect(() => {
    fetch(API_URL_POPULAR)
     .then(response => response.json())
     .then(response => {
      console.log('response',response.results); // Affiche les films dans la console
      setMovies_popular(response.results); // Stocke les films dans le state
      setIsLoading(false);
      console.log('Loading',isLoading)
      if (response.results.length === 0) {
        setError(true);
      }
     })
     .catch(error => setError(true));
   },[]);
   

   const [movies_nowplaying, setMovies_nowplaying] = useState([])
   useEffect(() => {
     fetch(API_URL_NOWPLAYING)
      .then(response => response.json())
      .then(response => {
       console.log('response',response.results); // Affiche les films dans la console
       setMovies_nowplaying(response.results); // Stocke les films dans le state
       setIsLoading(false);
       console.log('Loading',isLoading)
       if (response.results.length === 0) { // POUR ERROR AVEC APIKEY
         setError(true);
       }
      })
      .catch(error => setError(true));
    },[]);
    
   
  const [movies, setMovies] = useState([])
  const searchMovies = (query) => {
    onChangeText(query)
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`)
     .then(response => response.json())
     .then(data => setMovies(data.results))
     .catch(error => setError(true));
   };


  const [text,onChangeText] = useState('')
   console.log('text', text);
  if (isLoading) {
    return (
      <View style={styles.error}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.error}>
        <Text>Une erreur s'est produite. Veuillez réessayer.</Text>
      </View>
    );
  }


  const getItem = (_data, index) => ({
    id: Math.random().toString(12).substring(0),
    title: `Item ${index + 1}`,
  });
  
  const getItemCount = _data => 20;
  
  const Item = ({title}) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
  
    return (
      <ScrollView>
        <TextInput 
        style={styles.input}
        autoCorrect={false}
        placeholder='Search here'
        onChangeText={text => searchMovies(text)}
        />
        {text.length > 0 && 
          <View>
          

            <FlatList
          
              scrollEnabled={false}
              refreshing={true}
              data={movies}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
              <View style={styles.movieItemSearch}>
                <TouchableOpacity onPress={() => {navigation.navigate('Detail',
                  {film: item,})}}>
                  <Image source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }} style={styles.poster_search} />
                </TouchableOpacity>
                <Text style={styles.title_search}>{item.title}</Text>
              </View>
              )
            }
          />
          </View>  
        }
        {text.length == 0 &&
        <View>
          <View>
            <Text style={styles.section_title}>Popular</Text>
            <FlatList

            horizontal = {true}
            data={movies_popular} // movies est le tableau contenant les films
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <View style={styles.movieItem}>
                  <TouchableOpacity onPress={() => {navigation.navigate('Detail', 
                    {film: item,})}}>
                    <Image source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }} style={styles.poster} />
                  </TouchableOpacity>
                  <Text style={styles.title}>{item.title}</Text>
      
                </View>
                )
              }
            />
          </View>
          <View>
            <Text style={styles.section_title}>Now Playing</Text>
            <FlatList
            horizontal = {true}
            data={movies_nowplaying} // movies est le tableau contenant les films
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <View style={styles.movieItem}>
                  <TouchableOpacity onPress={() => {navigation.navigate('Detail', 
                    {film: item,})}}>
                    <Image source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }} style={styles.poster} />
                  </TouchableOpacity>
                  <Text style={styles.title}>{item.title}</Text>
      
                </View>
                )
              }
            />
          </View>
        </View>
      }
      </ScrollView>
    ) 
  }











