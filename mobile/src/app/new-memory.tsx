import Icon from '@expo/vector-icons/Feather'
import { useRouter } from 'expo-router'
import { Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import SpacetimeLogo from '../assets/nlw-spacetime-h-logo.svg'

export default function NewMemoryScreen() {
  const { bottom, top } = useSafeAreaInsets()
  const router = useRouter()

  return (
    <View className="flex-1" style={{ paddingBottom: bottom, paddingTop: top }}>
      <View className="mt-6 w-full flex-row items-center justify-between px-8">
        <SpacetimeLogo />

        <TouchableOpacity
          className="h-10 w-10 items-center justify-center rounded-full bg-purple-500"
          onPress={() => router.back()}
        >
          <Icon name="arrow-left" color="#eaeaea" size={16} />
        </TouchableOpacity>
      </View>

      <View className="flex-1 items-center justify-center">
        <Text>👋 Hello, there!</Text>
      </View>
    </View>
  )
}
