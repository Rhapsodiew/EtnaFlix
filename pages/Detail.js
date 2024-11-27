import { View,StyleSheet, Text, TextInput, ScrollView, Image, ImageBackground } from 'react-native';
import { Button } from '@rneui/themed'; // BUTTON FROM REACT NATIVE ELEMENT 
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';




const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    // HEAD
    head:{
      backgroundColor: '#fff',
      flexDirection: 'row',
    },
    // IMAGE
     poster: {
        width: 200,
        height: 300,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc',
      },
      head_info:{
        flex:1,
        flexDirection: 'column',
        paddingHorizontal:'2%',
        justifyContent:'space-evenly',
      },
      title:{
        fontSize: 30,
        fontWeight: '900',
        alignSelf: 'center',
      },
      

      info:{
        paddingVertical:10,
        paddingHorizontal:10,
        backgroundColor: '#fff',
        marginHorizontal:10,
        borderRadius: 8,
      },
      button_list:{
        justifyContent: 'space-around',
        flexDirection: 'row',
        backgroundColor: '#fff',
        color:'#fff',

      },
      info_title:{
        paddingLeft:'4%',
        fontSize: 20,
        fontWeight:'900',
        color:'#909',
        paddingBottom:10,
        paddingTop:80,
      },
  })

export default function Detail({route, navigation}) {
    const {film} = route.params;
    const [isOverview,setIsOverview] = useState(true);



   

    //SAVE MARCHE PAS 
    const save = async(film) => {
      try {
        console.log('setItem',film);
        await AsyncStorage.setItem('title',JSON.stringify(film.title) );   
        await AsyncStorage.setItem('image',JSON.stringify(film.poster_path) );      
   
    } catch (e) {
        console.log(e)
      }
    }

   

    const image = { uri: `https://image.tmdb.org/t/p/w500${film.poster_path}` }
    return (
            <View style={styles.container}>
              <View style={styles.head}>
              <Image source={image} style={styles.poster} />
                <View style={styles.head_info}>
                  <Text style={styles.title}>{film.title}</Text>
                  <Button style={styles.favorite} title='<3'onPress={() => save(film)  }/>
                </View>
              </View>


              <View style={styles.button_list}> 
                <Button type='clear' style={styles.button} title="Resumé" onPress={() => setIsOverview(true)}/>
                <Button type='clear' title="Info" onPress={() => setIsOverview(false)}/>
                {/* <Button type='clear' title={"uhuh"}/>
                <Button type='clear' title={"eheh"}/> */}
              </View>

                  {isOverview ? (

              <ScrollView >
                <Text style={styles.info_title}>Resumé</Text>
                <Text style={styles.info}>{film.overview}</Text>
              </ScrollView>
                  ) :(

              <ScrollView>
                <Text style={styles.info_title}>Autre</Text>
                <View style={styles.info}>
                  <Text>Date de sortie : {film.release_date}</Text>
                  <Text>Langue : {film.original_language}</Text>
                  <Text>Note : {film.vote_average}/10</Text>
                </View>
              </ScrollView>
                  )}

            </View>
          
        );
      }
    

    


 

