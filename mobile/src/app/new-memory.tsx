import Icon from '@expo/vector-icons/Feather'
import * as ImagePicker from 'expo-image-picker'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import {
  Image,
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import SpacetimeLogo from '../assets/nlw-spacetime-h-logo.svg'
import { getItemAsync } from 'expo-secure-store'
import { api } from '../lib/api'

export default function NewMemoryScreen() {
  const router = useRouter()
  const { bottom, top } = useSafeAreaInsets()
  const [isLoading, setLoading] = useState(false)
  const [isPublic, setPublic] = useState(false)
  const [coverPreview, setCoverPreview] = useState<string>()
  const [content, setContent] = useState('')

  async function handlePickImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    !result.canceled &&
      result.assets[0] &&
      setCoverPreview(result.assets[0].uri)
  }

  async function handleSubmit() {
    setLoading(true)

    try {
      const token = await getItemAsync('token')
      let coverUrl = ''

      if (coverPreview) {
        const uploadFormData = new FormData()
        uploadFormData.append('file', {
          name: 'image.png',
          type: 'image/png',
          uri: coverPreview,
        } as any)

        const response = await api.post('/files', uploadFormData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        })
        coverUrl = response.data.url
      }

      await api.post(
        '/memories',
        {
          isPublic,
          content,
          coverUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      router.replace('memories')
    } finally {
      setLoading(true)
    }
  }

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

        <TouchableOpacity
          className="bg-black/2 h-32 justify-center rounded-lg border border-dashed border-gray-500"
          onPress={handlePickImage}
        >
          {coverPreview ? (
            <Image
              className="h-full w-full rounded-lg object-cover"
              source={{ uri: coverPreview }}
              alt="preview da imagem selecionada"
            />
          ) : (
            <View className="items-center justify-center gap-2">
              <Icon name="image" color="#fff" size={24} />
              <Text className="inline-flex max-w-[80%]  text-center text-sm font-normal text-gray-200">
                Adicionar foto ou vídeo de capa sdfs dfs df
              </Text>
            </View>
          )}
        </TouchableOpacity>

        <TextInput
          className="p-0 text-lg font-normal text-gray-50"
          placeholderTextColor="#56565a"
          placeholder="Fique livre para adicionar fotos, vídeos e relatos sobre essa experiência que você quer lembrar para sempre."
          multiline
          textAlignVertical="top"
          value={content}
          onChangeText={setContent}
        />

        <TouchableOpacity
          className="items-center rounded-full bg-green-500 px-5 py-2"
          disabled={isLoading}
          activeOpacity={0.7}
          onPress={handleSubmit}
        >
          <Text className="font-alt text-sm uppercase text-black">Salvar</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}
