import Icon from '@expo/vector-icons/Feather'
import { Link } from 'expo-router'
import { Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import SpacetimeLogo from '../assets/nlw-spacetime-h-logo.svg'

export default function MemoriesScreen() {
  const { bottom, top } = useSafeAreaInsets()

  return (
    <View
      className="flex-1 px-8"
      style={{ paddingBottom: bottom, paddingTop: top }}
    >
      <View className="mt-6 w-full flex-row items-center justify-between">
        <SpacetimeLogo />

        <Link asChild href="/new-memory">
          <TouchableOpacity className="h-10 w-10 items-center justify-center rounded-full bg-green-500">
            <Icon name="plus" color="#09090a" size={16} />
          </TouchableOpacity>
        </Link>
      </View>

      <View className="flex-1 items-center justify-center">
        <Text>👋 Hello, there!</Text>
      </View>
    </View>
  )
}
