import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Intro from './screens/Intro';
import React, {useState, useEffect} from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NoteScreen from './screens/NoteScreen';
import NoteDetails from './components/NoteDetails';
import SampleScreen from './screens/SampleScreen';
import NoteProvider from './context/NoteProvider';

const Stack = createNativeStackNavigator();
export default function App() {
  const [user, setUser] = useState({})
  const [appFirsttime, setAppFirsttime] = useState(false)

  const getUser = async () =>{
    const result = await AsyncStorage.getItem('user')

    if( result===null) return setAppFirsttime(true)
    
    setUser(JSON.parse(result))
    setAppFirsttime(false)
    
    
  }
  

  useEffect(() => {
    getUser()
    // AsyncStorage.clear();
  },[])

  

  
  if(appFirsttime) return <Intro onFinish={getUser}/>
  return (
    // <NoteScreen  user={user}/>
    <NavigationContainer>
      <NoteProvider>
      <Stack.Navigator>
        <Stack.Screen name='Note Screen' options={{headerShown: false}}>
        {(props) => <NoteScreen {...props} user={user} />}
        </Stack.Screen>
        <Stack.Screen component={NoteDetails} name='NoteDetail'/>
      </Stack.Navigator>
      </NoteProvider>
      
    </NavigationContainer>
   
   
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 18,
  },
});
