import React, { useEffect, useState } from 'react';
import { Image,FlatList, View, Text,StyleSheet,Button, TextInput, ScrollView, TouchableOpacity } from 'react-native';import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home({navigation, route}) {
  const getData = async () => {
    try{
      const film = await AsyncStorage.multiGet(['title','image']);
      console.log('film', film);
      addToFavorite(film[0][1])
      return film != null ? JSON.parse(film[0][1]) : null;
     }catch(e){
      console.log('error',e)
    }
  }
  

   // SET TO FAVORITE
   const [favorite, setFavorite] = useState([])


   const addToFavorite = (film) => {
     if (favorite.includes(film)) {  
       console.log("unfav", film)
       setFavorite(favorite.filter(item => item !== film))
       return
     }
     setFavorite([...favorite, film])
     console.log("fav list",favorite)
     data = {favorite}
   }

  
   
  return (
    
    <View style={styles.container}>
      {/* <FlatList 
      horizontal = {true}
      data= {favorite} // movies est le tableau contenant les films
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
          <View>
            <TouchableOpacity onPress={() => {navigation.navigate('Detail', 
              {film: item,})}}>
              <Image source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }} style={styles.poster} />
            </TouchableOpacity>
            <Text style={styles.text}>{item.title}</Text>
          </View>
          )
        }
      /> */}
      <StatusBar 
         animated={true}
         hidden={true}
        />
            <Text>{favorite}</Text>

        <View>
          <Button title="Reload" onPress={() => getData()}/>
          <Button title="Go to List" onPress={() => navigation.navigate('List')} />
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

