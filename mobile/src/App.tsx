import { BaiJamjuree_700Bold as BaiJamjuree700 } from '@expo-google-fonts/bai-jamjuree'
import {
  Roboto_400Regular as Roboto400,
  Roboto_700Bold as Roboto700,
} from '@expo-google-fonts/roboto'
import { useFonts } from 'expo-font'
import { StatusBar } from 'expo-status-bar'
import { Text, View } from 'react-native'

export default function App() {
  const [areFontsLoaded] = useFonts({ BaiJamjuree700, Roboto400, Roboto700 })

  if (!areFontsLoaded) {
    return null
  }

  return (
    <View className="flex-1 items-center justify-center bg-gray-950">
      <Text className="text-4xl font-normal text-zinc-50">🚀RocketSeat</Text>

      <StatusBar style="light" />
    </View>
  )
}
