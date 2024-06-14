import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../screens/LoginScreen';
import { RegisterScreen } from '../screens/RegisterScreen';
import { HomeScreen } from '../screens/HomeScreen/HomeScreen';
import { useEffect, useState } from 'react';
import { auth } from '../configs/firebaseConfig';
import { onAuthStateChanged } from '@firebase/auth';
import { ActivityIndicator } from 'react-native-paper';
import { View } from 'react-native';
import { DetailCommentScreen } from '../screens/HomeScreen/DetailCommentScreen';



const Stack = createStackNavigator();


interface Routes{
  name:string;
  screen:()=> JSX.Element;
  headerShow?:boolean;
}

const routesNoAuth:Routes[]=[
  {name: 'Login',screen: LoginScreen},
  {name: 'Register',screen:RegisterScreen}  
];


const routesAuth:Routes[]=[
  {name: 'Home',screen:HomeScreen},
  {name:"Detail",screen : DetailCommentScreen,headerShow:true}
];

export const StackNavigator=()=> {

  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    onAuthStateChanged(auth,(user)=>{
      if(user){
        setIsAuth(true);
      }
      setIsLoading(false);
    });
  }, []);
  
  return (
    <>
      {isLoading?(
        <View>
          <ActivityIndicator  size={35} />
        </View>
        ) :(
          <Stack.Navigator>
            {
              !isAuth?
                routesNoAuth.map((item,index)=>(
                <Stack.Screen 
                key={index} 
                name={item.name} 
                options={{headerShown:false}} 
                component={item.screen} />
                ))
                :
                routesAuth.map((item,index)=>(
                <Stack.Screen 
                key={index} 
                name={item.name} 
                options={{headerShown:item.headerShow ?? false}} 
                component={item.screen} />
                ))
            }
          </Stack.Navigator>
        )}
  </>
  );
}