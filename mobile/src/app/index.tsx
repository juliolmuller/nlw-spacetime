import { makeRedirectUri, useAuthRequest } from 'expo-auth-session'
import { useRouter } from 'expo-router'
import { setItemAsync as setStorage } from 'expo-secure-store'
import { useEffect } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import SpacetimeLogo from '../assets/nlw-spacetime-h-logo.svg'
import { api } from '../lib/api'

export default function HomeScreen() {
  const router = useRouter()
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

  return (
    <View className="flex-1 items-center justify-center">
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
          className="items-center rounded-full bg-green-500 px-5 py-2"
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
    </View>
  )
}
