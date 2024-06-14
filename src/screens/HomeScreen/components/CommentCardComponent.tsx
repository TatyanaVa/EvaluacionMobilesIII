import React, {} from 'react';
import { View } from 'react-native';
import { IconButton, Text } from 'react-native-paper';
import { styles } from '../../../theme/styles';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { Comment} from '../HomeScreen';



interface Props{
  comment:Comment;
}
interface FormLogin{
  user:FormLogin;
}
export const CommentCardComponent = ({comment}:Props) => {
  const navigation=useNavigation();
  
  return (
    <View style={styles.rootMessage}>
        <View>
        <Text variant='labelLarge' >{}: {comment.comment} </Text>
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
