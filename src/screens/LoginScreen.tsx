import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Snackbar, Text, TextInput } from 'react-native-paper';
import { styles } from '../theme/styles';
import {signInWithEmailAndPassword} from 'firebase/auth';
import { auth } from '../configs/firebaseConfig';
import { CommonActions, useNavigation } from '@react-navigation/native';



interface FormLogin{
    email:string;
    password:string;
}
interface MessageSnackBar{
    visible:boolean;
    message:string;
    color:string;
}
export const LoginScreen = () => {

    const [formLogin, setformLogin]=useState({
        email:'',
        password:'',
    })
    const [showMessage,setShowMessage]=useState<MessageSnackBar>({
        visible:false,
        message:'',
        color:'#fff'
        });

    const [hiddenPassword, setHiddenPassword] = useState <boolean>(true);

    const navigation =useNavigation();

    const handlerSetValues=(key:string, value:string)=>{
        setformLogin({...formLogin,[key]:value})
    }


    const handlerFormLogin=async()=>{
        if(!formLogin.email || !formLogin.password){
            setShowMessage({
                visible:true,
                message:'Completa todos los campos !',
                color:'#8f0e1a'
            })
            return;
        }
        try {
            const response =await signInWithEmailAndPassword(
                auth,
                formLogin.email,
                formLogin.password
            );
        } catch (ex) {
            console.log(ex);
            setShowMessage({
                visible:true,
                message:'Usuario y/o contraseña incorrecta!',
                color:'#8f0e1a'
            })
        }
    }
    return (
        <View style={styles.root}>
            <Text style={styles.text}>Iniciar Sesión</Text>
            <TextInput
                mode='outlined'
                label="Correo"
                placeholder='Escribe tu correo'
                style={styles.inputs}
                onChangeText={(value)=>handlerSetValues('email',value)}
                />
            <TextInput
                mode='outlined'
                label="Contraseña"
                placeholder='Escribe tu contraseña'
                secureTextEntry={hiddenPassword}
                right={<TextInput.Icon icon="eye" onPress={()=> setHiddenPassword(!hiddenPassword)}/>}
                style={styles.inputs}
                onChangeText={(value)=>handlerSetValues('password',value)}
            
    />
    <Button style={styles.button} mode="contained" onPress={handlerFormLogin}>Iniciar</Button> 
    <Text 
    style={styles.textRedirect}
    onPress={()=>navigation.dispatch(CommonActions.navigate({name:'Register'}))}>
        
        No tienes una cuenta? Registrate ahora!
        </Text>
    <Snackbar
        visible={showMessage.visible}
        onDismiss={()=>setShowMessage({...showMessage,visible:false})}
        style={{backgroundColor:showMessage.color}}>
        {showMessage.message}
    </Snackbar>
</View>
  )
}
