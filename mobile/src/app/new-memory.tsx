import Icon from '@expo/vector-icons/Feather'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import {
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import SpacetimeLogo from '../assets/nlw-spacetime-h-logo.svg'

export default function NewMemoryScreen() {
  const router = useRouter()
  const { bottom, top } = useSafeAreaInsets()
  const [isPublic, setPublic] = useState(false)
  const [content, setContent] = useState('')

  return (
    <View
      className="flex-1 px-8"
      style={{ paddingBottom: bottom, paddingTop: top }}
    >
      <View className="mt-6 w-full flex-row items-center justify-between">
        <SpacetimeLogo />

        <TouchableOpacity
          className="h-10 w-10 items-center justify-center rounded-full bg-purple-500"
          onPress={() => router.back()}
        >
          <Icon name="arrow-left" color="#eaeaea" size={16} />
        </TouchableOpacity>
      </View>

      <ScrollView
        className="flex-1 space-y-6 pt-4"
        contentContainerStyle={{ paddingBottom: 60 }}
      >
        <View className="flex-row items-center gap-2">
          <Switch
            className=""
            thumbColor={isPublic ? '#9b79ea' : '#9e9ea0'}
            trackColor={{ true: '#372560', false: '#767577' }}
            value={isPublic}
            onChange={() => setPublic(!isPublic)}
          />
          <Text className="text-sm font-normal text-gray-200">
            Tornar memória pública
          </Text>
        </View>

        <TouchableOpacity className="bg-black/2 h-32 justify-center rounded-lg border border-dashed border-gray-500">
          <View className="flex-row items-center justify-center gap-2">
            <Icon name="image" color="#fff" />
            <Text className="inline-flex max-w-[80%] text-center text-sm font-normal text-gray-200">
              Adicionar foto ou vídeo de capa sdfs dfs df
            </Text>
          </View>
        </TouchableOpacity>

        <TextInput
          className="p-0 text-lg font-normal text-gray-50"
          placeholderTextColor="#56565a"
          placeholder="Fique livre para adicionar fotos, vídeos e relatos sobre essa experiência que você quer lembrar para sempre."
          multiline
          value={content}
        />

        <TouchableOpacity
          className="items-center rounded-full bg-green-500 px-5 py-2"
          activeOpacity={0.7}
        >
          <Text className="font-alt text-sm uppercase text-black">Salvar</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}
