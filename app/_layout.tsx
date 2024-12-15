import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { Slot,SplashScreen,Stack } from 'expo-router'
import '../assets/css/global.css'
import { useFonts } from 'expo-font'
import GlobalProvider from '@/context/GlobalProvider'
// prevent auto hiding splash screen before assets loading is completed
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {  
  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
  });

  // allows us to perform actions while the page or screen is loading
  useEffect(() => {
    if(error) throw error;
    if(fontsLoaded) SplashScreen.hideAsync(); //  hide splash screen immediately after font loaded 
  },[fontsLoaded,error]) // recall useEffect function whenever fontLoaded change or has any errors

  if(!fontsLoaded && !error) return null;

  return (
      <GlobalProvider>
        <Stack>
          <Stack.Screen 
            name='index'
            options={{ 
              headerShown: false
            }}
          />
          <Stack.Screen 
            name='(auth)'
            options={{ 
              headerShown: false
            }}
          />
          <Stack.Screen 
            name='(tabs)'
            options={{ 
              headerShown: false
            }}
          />      
           <Stack.Screen 
            name='search/[query]'
            options={{ 
              headerShown: false
            }}
          />        
        </Stack>      
      </GlobalProvider>
  )
}

export default RootLayout
