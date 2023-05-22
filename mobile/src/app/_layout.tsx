import { BaiJamjuree_700Bold as BaiJamjuree700 } from '@expo-google-fonts/bai-jamjuree'
import {
  Roboto_400Regular as Roboto400,
  Roboto_700Bold as Roboto700,
} from '@expo-google-fonts/roboto'
import { useFonts } from 'expo-font'
import { SplashScreen, Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { styled } from 'nativewind'
import { ImageBackground } from 'react-native'
import { getItemAsync as getStorage } from 'expo-secure-store'
import bgBlur from '../assets/bg-blur.png'
import Stripes from '../assets/bg-stripes.svg'
import { useEffect, useState } from 'react'

const StyledStripes = styled(Stripes)

export default function RootLayout() {
  const [areFontsLoaded] = useFonts({ BaiJamjuree700, Roboto400, Roboto700 })
  const [isAuthenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    async function recoverToken() {
      const token = await getStorage('token')
      setAuthenticated(Boolean(token))
    }

    recoverToken()
  }, [])

  if (!areFontsLoaded) {
    return <SplashScreen />
  }

  return (
    <ImageBackground className="relative flex-1 bg-gray-900" source={bgBlur}>
      <StyledStripes className="absolute left-2" />
      <StatusBar style="light" />

      <Stack
        screenOptions={{
          contentStyle: { backgroundColor: 'transparent' },
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" redirect={isAuthenticated} />
        <Stack.Screen name="memories" />
      </Stack>
    </ImageBackground>
  )
}
