import { BaiJamjuree_700Bold as BaiJamjuree700 } from '@expo-google-fonts/bai-jamjuree'
import {
  Roboto_400Regular as Roboto400,
  Roboto_700Bold as Roboto700,
} from '@expo-google-fonts/roboto'
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session'
import { useFonts } from 'expo-font'
import { useRouter } from 'expo-router'
import { setItemAsync as setStorage } from 'expo-secure-store'
import { StatusBar } from 'expo-status-bar'
import { styled } from 'nativewind'
import { useEffect } from 'react'
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native'
import bgBlur from '../assets/bg-blur.png'
import Stripes from '../assets/bg-stripes.svg'
import SpacetimeLogo from '../assets/nlw-spacetime-h-logo.svg'
import { api } from '../lib/api'

const StyledStripes = styled(Stripes)

export default function HomeScreen() {
  const router = useRouter()
  const [areFontsLoaded] = useFonts({ BaiJamjuree700, Roboto400, Roboto700 })
  const [, response, signInWithGitHub] = useAuthRequest(
    {
      clientId: '4b5c87ab3d1f46570e3a',
      scopes: ['identity'],
      redirectUri: makeRedirectUri({
        scheme: 'nlw-spacetime',
      }),
    },
    {
      authorizationEndpoint: 'https://github.com/login/oauth/authorize',
      tokenEndpoint: 'https://github.com/login/oauth/access_token',
      revocationEndpoint:
        'https://github.com/settings/connections/applications/4b5c87ab3d1f46570e3a',
    },
  )

  useEffect(() => {
    async function handleGitHubAuthentication() {
      if (response?.type === 'success') {
        try {
          const { code } = response.params
          const { data } = await api.post('/auth', { code })
          setStorage('token', data.token)
          router.push('/memories')
        } catch (error) {
          console.log(error)
        }
      }
    }

    handleGitHubAuthentication()
  }, [response, router])

  if (!areFontsLoaded) {
    return null
  }

  return (
    <ImageBackground
      className="relative flex-1 items-center justify-center bg-gray-900"
      source={bgBlur}
    >
      <StyledStripes className="absolute left-2" />

      <View className="items-center gap-6">
        <SpacetimeLogo />

        <View className="items-center gap-2">
          <Text className="router-bold text-center text-2xl leading-tight text-gray-50">
            Sua cápsula do tempo
          </Text>
          <Text className="text-normal text-center font-bold leading-relaxed text-gray-100">
            Colecione momentos marcantes da sua jornada e compartilhe (se
            quiser) com o mundo!
          </Text>
        </View>

        <TouchableOpacity
          className="rounded-full bg-green-500 px-5 py-2"
          activeOpacity={0.7}
          onPress={() => signInWithGitHub()}
        >
          <Text className="font-alt text-sm uppercase text-black">
            Começar a Cadastrar
          </Text>
        </TouchableOpacity>
      </View>

      <Text className="absolute bottom-10 text-center text-sm font-normal leading-relaxed text-gray-200 underline">
        Feito com 💜 no NLW da Rocketseat
      </Text>

      <StatusBar style="light" />
    </ImageBackground>
  )
}
