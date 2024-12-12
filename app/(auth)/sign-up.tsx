import { View, Text, ScrollView, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import FormField from '@/components/FormField'
import CustomButton from '@/components/CustomButton'
import { Link } from 'expo-router'



const SignUp = () => {

  const [form,setForm] = useState({
    name: '',
    email: '',
    password: ''
  });

  const submit = () => {

  }

  const [isSubmitting,setIsSubmitting] = useState(false);

  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView>
        <View className='w-full px-4 min-h-[80vh] my-6 justify-center'>
          <Image source={images.logo} resizeMode='contain' className='w-[115px] h-[35px]' />
          <Text className='text-2xl text-white text-semibold mt-10 font-psemibold'>Sign up to Aura</Text>
          <FormField 
            title="Email"
            placeholder="Enter your email"
            value={form.name}
            handleChangeText={(e) => setForm({...form,name : e })}
            otherStyles="mt-10"
          />
          <FormField 
            title="Email"
            placeholder="Enter your email"
            value={form.email}
            handleChangeText={(e) => setForm({...form,email : e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
           <FormField 
            title="Password"
            placeholder="Enter your password"
            value={form.password}
            handleChangeText={(e) => setForm({...form,password : e })}
            otherStyles="mt-7"
          />

          <CustomButton 
            title="Sign in" 
            handlePress={submit} 
            containerStyles="mt-7" 
            isLoading={isSubmitting}
            textStyles=""
          />
          <View
            className='justify-center pt-5 flex-row gap-2'
          >
            <Text className='text-lg text-gray-100 font-pregular'>
              Already have an account?
            </Text>
            <Link href="/sign-in" className='text-lg text-secondary font-psemibold'>Sign In</Link>
          </View>
        </View>
      </ScrollView>

    </SafeAreaView>
  )
}

export default SignUp