import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { IconButton, Text } from 'react-native-paper';
import { styles } from '../../../theme/styles';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { Comment, formUser} from '../HomeScreen';
import firebase from '@firebase/auth';
import { auth } from '../../../configs/firebaseConfig';



interface Props{
  comment:Comment;
}
interface FormLogin{
  user:FormLogin;
}
export const CommentCardComponent = ({comment}:Props) => {
  
  const navigation=useNavigation();
  const [formUser, setFormUser] = useState<formUser>({
    name:''
  });

  useEffect(()=>{
    setUserAuth(auth.currentUser);
    setFormUser({name:auth.currentUser?.displayName??""})
  
},[]);
  const [userAuth, setUserAuth] = useState<firebase.User | null>(null);
  
  return (
    <View style={styles.rootMessage}>
        <View>
        <Text variant='labelLarge' >{userAuth?.email} :{comment.comment} </Text>
        </View>
        <View style={styles.iconEnd}>
        <IconButton 
            icon="chat-processing-outline"
            size={25}
            onPress={() => navigation.dispatch(CommonActions.navigate({name:'Comment',params:{comment}}))}
  />
        </View>
    </View>
  )
}
