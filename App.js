import Home from './pages/Home';
import List from './pages/List';
import Detail from './pages/Detail';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


// import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>  
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{headerShown:false}}/>
        <Stack.Screen name="List" component={List} />
        <Stack.Screen name="Detail" component={Detail} />
      </Stack.Navigator> 
    </NavigationContainer>
  )
}