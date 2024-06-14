import React, { useState } from 'react'
import { Button, Divider, IconButton, Modal, Portal, Text, TextInput } from 'react-native-paper'
import { styles } from '../../../theme/styles';
import { View } from 'react-native';
import { push, ref, set } from 'firebase/database';
import { dbRealTime } from '../../../configs/firebaseConfig';


interface Props{
  showModalComment: boolean;
  setShowModalComment: Function;
}

interface ForComment{
  comment:string;
}
export const NewCommentComponent = ({showModalComment,setShowModalComment}:Props) => {
  const [formComment, setFormComment] = useState<ForComment>({
    comment:'',
  });


  const handlerSetValues=(key:string,value:string)=>{
    setFormComment({...formComment,[key]:value})
  }


  const handlerSaveComment=async()=>{
    if( !formComment.comment){
      return;
    }

    const dbRef =ref(dbRealTime,'comment');
    const saveComment=push(dbRef);
    try {
      await set (saveComment,formComment);
      setFormComment({
        comment:''
      })
    } catch (ex) {
      console.log(ex);
      
    }
    setShowModalComment(false);
  }
  return (
    <Portal>
        <Modal visible={showModalComment} contentContainerStyle={styles.modal}>
            <View style={styles.header}>
              <Text variant='headlineMedium'>Déjanos tu Comentario</Text>
                <View style={styles.iconEnd}>
                  <IconButton icon='close-circle-outline'
                  size={30}
                  onPress={()=>setShowModalComment(false)}/>
                </View>
              </View>
              <Divider/>
                <TextInput
                label='nuevo comentario'
                mode='outlined'
                multiline={true}
                numberOfLines={7}
                onChangeText={(value)=>handlerSetValues('comment',value)}
                />
                <Button mode='contained' onPress={handlerSaveComment}>Enviar</Button>
        </Modal>
    </Portal>
  )
}
