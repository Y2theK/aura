import { View, Text, Image } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { icons } from '../../constants'

const TabIcon = ({ icon, color, name, focused  }) => {
  return (
    <View className='flex-1 items-center justify-center gap-2'>
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-4 h-4"
      />
      <Text className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`} style={{ color: color, fontSize: 9 }}>
        {name}
      </Text>
    </View>
  )
}

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{        
          tabBarShowLabel : false,
          tabBarActiveTintColor: "#FFA001",
          tabBarInactiveTintColor: "#CDCDE0",
          tabBarStyle: {
            backgroundColor: '#161622',
            borderTopWidth: 12,
            borderTopColor: '#161622',
            height: 80
          }
      }}
      >
        <Tabs.Screen
          name='home'
          options={{ 
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({color, focused}) => (
              <TabIcon icon={icons.home} color={color} name="Home" focused={focused}  />
            )
           }} 
        />
        <Tabs.Screen
          name='create'
          options={{ 
            title: 'Create',
            headerShown: false,
            tabBarIcon: ({color, focused}) => (
              <TabIcon icon={icons.plus} color={color} name="Add" focused={focused}  />
            )
           }} 
        />
         <Tabs.Screen
          name='bookmark'
          options={{ 
            title: 'Bookmark',
            headerShown: false,
            tabBarIcon: ({color, focused}) => (
              <TabIcon icon={icons.bookmark} color={color} name="Saved" focused={focused}  />
            )
           }} 
        />
         
         <Tabs.Screen
          name='profile'
          options={{ 
            title: 'Profile',
            headerShown: false,
            tabBarIcon: ({color, focused}) => (
              <TabIcon icon={icons.profile} color={color} name="Profile" focused={focused}  />
            )
           }} 
        />
      </Tabs>
    </>
  )
}

export default TabsLayout