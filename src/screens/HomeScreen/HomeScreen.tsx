import firebase, { updateProfile } from '@firebase/auth';
import React, { useEffect, useState } from 'react'
import { Avatar, Button, Divider, FAB, IconButton, Modal, Portal, Text, TextInput } from 'react-native-paper';
import { auth, dbRealTime } from '../../configs/firebaseConfig';
import { FlatList, View } from 'react-native';
import { styles } from '../../theme/styles';
import { CommentCardComponent } from './components/CommentCardComponent';
import { NewCommentComponent } from './components/NewCommentComponent';
import { onValue, ref } from 'firebase/database';



export interface formUser{
  name:string;
}

export interface Comment{
  comment:string;
}
export const HomeScreen = () => {
  //hooknuseState:manipular el formulario del perfil de usuario
  const [formUser, setFormUser] = useState<formUser>({
    name:''
  });

  useEffect(()=>{
    setUserAuth(auth.currentUser);
    setFormUser({name:auth.currentUser?.displayName??""})
    getAllComment();
  
},[]);


  const [showModalProfile, setShowModalProfile] = useState<boolean>(false)
  const [showModalComment, setShowModalComment] = useState<boolean>(false)
  const [userAuth, setUserAuth] = useState<firebase.User | null>(null);
  const [comment, setComment] = useState<Comment[]>([]);


  const handlerSetValues =(key:string,value:string)=>{
    setFormUser({...formUser, [key]:value})
  }

const handlerUpdateUser = async()=>{
  await updateProfile(userAuth!,{
    displayName:formUser.name
  })
  setShowModalProfile(false);
}

const getAllComment=()=>{

  const dbRef=ref(dbRealTime,'comment');

    onValue(dbRef,(snapshot)=>{

      const data=snapshot.val();

      if(!data)return;

      const getKeys =Object.keys(data);

      const listComment:Comment[]=[];
      getKeys.forEach((key)=>{      
      const value ={...data[key],id:key}
      listComment.push(value);
      })

      setComment(listComment);
    })
}
  return (
    <>
    <View style={styles.rootHome}>
      <View style={styles.header}>
      <Avatar.Text size={55} label='MI'/> 
      <View>
        <Text variant='bodySmall'>Bienvenido </Text>
        <Text variant='labelLarge'>{userAuth?.displayName} </Text>
        </View>
        <View style={styles.iconEnd}>
          <IconButton
            icon="account-edit"
            size={30}
            mode='contained'
            onPress={()=>setShowModalProfile(true)}
            />
        </View>
      </View>
      <View>
      <FlatList
        data={comment}
        renderItem={({item}) => <CommentCardComponent comment={item}/>}
        keyExtractor={item => item.comment}
      />
      </View>
    </View>
    <Portal>
      <Modal visible={showModalProfile} contentContainerStyle={styles.modal}>
      <View style={styles.header}>
        <Text variant='headlineMedium'>Mi Perfil</Text>
        <View style={styles.iconEnd}>
        <IconButton icon='close-circle-outline' 
        size={20} 
        onPress={()=>setShowModalProfile(false)} ></IconButton>
        </View>
        </View>
        
        <Divider/>
          <TextInput
            mode='outlined'
            label='Nombre'
            value={formUser.name} 
            onChangeText={(value)=>handlerSetValues('name',value)}/>
        <TextInput
            mode='outlined'
            label='correo' 
            value= {userAuth?.email!}
            disabled />
        <Button mode='contained' onPress={handlerUpdateUser}>Actualizar</Button>
    </Modal>
  </Portal>
  <FAB
    icon="chat-plus"
    style={styles.fabMessage}
    onPress={() => setShowModalComment(true)}
  />
  <NewCommentComponent showModalComment={showModalComment} setShowModalComment={setShowModalComment} />
  </>
  )
}
