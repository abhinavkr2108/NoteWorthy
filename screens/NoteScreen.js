import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React,{useState, useEffect, useContext} from 'react'
import { StatusBar } from 'expo-status-bar';
import Colors from '../misc/Colors';
import { AntDesign } from '@expo/vector-icons';
import Searchbar from '../components/Searchbar';
import InputModal from '../components/InputModal';
import { FA5Style } from '@expo/vector-icons/build/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Note from '../components/Note';
import { useNotes } from '../context/NoteProvider';
import NotFound from '../components/NotFound';


const NoteScreen = ({user, navigation}) => {
    const [greeting, setGreeting] = useState("Morning");
    const [modalVisible, setModalVisible] = useState(false);
    const {notes, setNotes, getNotes} = useNotes()
    const [searchQuery, setSearchQuery] = useState("")
    const [notFound, setNotFound] = useState(false)

   

    const greetUser = () => {
        const hours = new Date().getHours()
        if(hours===0 || hours<12) return setGreeting("Morning");
        if(hours===12 || hours<17) return setGreeting("Afternoon");
        setGreeting("Evening");
    }

    const openNote = (note) =>{
        navigation.navigate('NoteDetail', {note})
    }
    useEffect(()=>{
        greetUser();
        // AsyncStorage.clear();
    },[])

    const handleOnSubmit = async (title, desc) => {
        const time = new Date().getTime();
        const note = {
            id: Date.now(),
            title: title,
            description: desc,
            time: time,
        };
        const updatedNotes = [...notes, note];
        setNotes(updatedNotes);
        await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes))
    };

    const handleSearch = async (text) =>{
        setSearchQuery(text)
        if(!text.trim()){
            setSearchQuery("")
            setNotFound(false)
            return await getNotes();
        }
        
        const filteredNotes = notes.filter(note => {
            if (note.title.toLowerCase().includes(text.toLowerCase())) {
                return note;
            }
        })
        if(filteredNotes.length){
            setNotes([...filteredNotes])
        }else{
            setNotFound(true)
        }
    }


  return (
    
        <View style={styles.container}>
            <Text style={styles.greeting}>{`Good ${greeting}, ${user.name}`}</Text>

            <Searchbar
                value={searchQuery}
                onChangeText={handleSearch}
            />
            {
                notFound==true ? <NotFound/> :
                <FlatList
                data={notes}
                key={item => item.id}
                numColumns={2}
                columnWrapperStyle={
                    {   justifyContent: 'space-between',
                        marginBottom: 10
                    }
                }
                keyExtractor={item => item.id.toString()}
                renderItem={({item})=> <Note item={item} onPress={()=> openNote(item)}/>}
                />
            }
            
            {
                !notes.length ? (
                    <View style={[StyleSheet.absoluteFillObject, styles.addNoteContainer]}>
                        <Text style={styles.addNoteText}>Add Notes</Text> 
                    </View>
                ) : null
            }

            
            <View>
                <TouchableOpacity 
                    style={styles.btnAddNote}
                    onPress={() => setModalVisible(true)}
                    >
                    <AntDesign name="plus" size={24} color="white" />
                </TouchableOpacity>
            </View>
            
            <InputModal 
            visible={modalVisible} 
            onClose={() => setModalVisible(false)}
            onSubmit={handleOnSubmit}/>
           
        </View>
    
        
   
  )
}

export default NoteScreen

const styles = StyleSheet.create({
    container:{
        flex: 1,
        marginTop: 30,
        marginHorizontal: 20,
    },
    greeting:{
        fontSize: 23,
        fontWeight: "bold",
    },
    addNoteContainer:{
        flex:1,
        justifyContent: "center",
        alignItems: "center",
        
    },
    addNoteText:{
        fontSize: 20,
        fontWeight: "bold",
        opacity: 0.4,
    },
    btnAddNote:{
        backgroundColor: Colors.PRIMARY,
        padding: 10,
        borderRadius: 50,
        position: "absolute",
        right: 15,
        bottom: 50,
    }
})