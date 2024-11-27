import { useState } from "react";



export const addToFavorite = async(film) => {
    const [favorite, setFavorite] = useState([])

  if (favorite.includes(film)) {
    console.log("unfav", film.title)
    setFavorite(favorite.filter(item => item !== film))
    return
  }
  setFavorite([...favorite, film])
  console.log("fav list",favorite)
  data = {favorite}
  try {
    await AsyncStorage.setItem('favorite', JSON.stringify(data))
  } 
  catch (e) {
    console.log(e)
  }
}
export default addToFavorite;