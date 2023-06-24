import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Intro from './screens/Intro';
import React, {useState, useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import NoteScreen from './screens/NoteScreen';

export default function App() {
  const [user, setUser] = useState({})
  const getUser = async () =>{
    const result = await AsyncStorage.getItem('user')
    if(result!==null){
      setUser(JSON.parse(result))
    }
    
  }

  useEffect(() => {
    getUser()
    // AsyncStorage.clear();
  },[])
  
  if(!user.name) return <Intro onFinish={getUser}/>
  return (
   
   <NoteScreen user={user}/>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 18,
  },
});
