import { View, Text } from 'react-native'
import React from 'react'
import { Link, Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

const Home = () => {
  return (
    <View
      className="bg-gray-100 flex-1 items-center justify-center"
    >

      <Text className="text-3xl font-semibold text-primary font-pblack">Aura</Text>
      <StatusBar backgroundColor="#161622" />
      <Link href="/">Index</Link>
    </View>
  )
}

export default Home