import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Button, Divider, Text, TextInput } from 'react-native-paper';
import { styles } from '../../theme/styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ref, update } from 'firebase/database';
import { dbRealTime } from '../../configs/firebaseConfig';
import { Comment} from './HomeScreen';

export const DetailCommentScreen = () => {
    const route=useRoute();
    //@ts-ignore
    const{comment}=route.params;
    const [editFormComment, setEditFormComment] = useState<Comment>({
        comment:''
    });
    useEffect(() => {
    setEditFormComment(comment);
    }, [])
    const navigation=useNavigation();
    const handlerSetValues=(key:string,value:string)=>{
        setEditFormComment({...editFormComment,[key]:value})
    }
    const handlerUpdateComment=async()=>{
        const dbRef =ref (dbRealTime,'comment/'+editFormComment.comment)

        await update(dbRef,{message:editFormComment.comment})
        navigation.goBack();
    }
    const handlerUpdateSubject=async()=>{
        const dbRef =ref (dbRealTime,'comment/'+editFormComment.comment)
        await update(dbRef,{subject:editFormComment.comment})
        navigation.goBack();
    }
    return (
        <View style={styles.rootDetail}>
            <View>
                <Text variant='headlineSmall'>Comentario {editFormComment.comment} </Text>
                <TextInput
                    value={editFormComment.comment}
                    onChangeText={(value) => handlerSetValues('comment', value)}
                />
                <Divider/>
            </View>
            <Button 
                mode='contained' 
                icon={'email-sync'} 
                onPress={handlerUpdateComment}>Actualizar Comentario</Button>
                
                <Button 
                mode='contained' 
                icon={'email-remove'} 
                onPress={()=>{}}>Eliminar</Button>
            
        </View>
    )
}
