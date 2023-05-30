import Icon from '@expo/vector-icons/Feather'
import dayjs from 'dayjs'
import ptBR from 'dayjs/locale/pt-br'
import { getItemAsync } from 'expo-secure-store'
import { Link } from 'expo-router'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import SpacetimeLogo from '../assets/nlw-spacetime-h-logo.svg'
import { api } from '../lib/api'
import { useEffect, useState } from 'react'

type Memory = {
  id: string
  coverUrl: string
  excerpt: string
  createdAt: string
}

dayjs.locale(ptBR)

export default function MemoriesScreen() {
  const { bottom, top } = useSafeAreaInsets()
  const [, setLoading] = useState(false)
  const [memories, setMemories] = useState<Memory[]>([])

  async function fetchMemories() {
    try {
      setLoading(true)
      const token = await getItemAsync('token')
      const response = await api.get('/memories', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      setMemories(response.data)
    } catch {
      // do nothing
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMemories()
  }, [])

  return (
    <View className="flex-1" style={{ paddingBottom: bottom, paddingTop: top }}>
      <View className="mt-6 w-full flex-row items-center justify-between px-8">
        <SpacetimeLogo />

        <Link asChild href="/new-memory">
          <TouchableOpacity className="h-10 w-10 items-center justify-center rounded-full bg-green-500">
            <Icon name="plus" color="#09090a" size={16} />
          </TouchableOpacity>
        </Link>
      </View>

      <ScrollView
        className="mt-6 flex-1 space-y-10"
        contentContainerStyle={{ paddingBottom: 60 }}
      >
        {memories.map(({ coverUrl, createdAt, excerpt, id }) => (
          <View key={`memory-${id}`}>
            <View className="space-y-4">
              <View className="flex-row items-center gap-2">
                <View className="h-px w-5 bg-gray-50" />
                <Text className="text-sm font-normal text-gray-50">
                  {dayjs(createdAt).format('D[ de ]MMMM[, ]YYYY')}
                </Text>
              </View>

              <View className="space-y-4 px-8">
                <Image
                  className="aspect-video w-full rounded-lg"
                  source={{ uri: coverUrl }}
                  alt=""
                />

                <Text className="text-base font-normal leading-relaxed text-gray-100">
                  {excerpt}
                </Text>

                <Link href={`/memories/${id}`} asChild>
                  <TouchableOpacity className="flex-row items-center gap-2">
                    <Text className="text-sm font-normal text-gray-200">
                      Ler Mais
                    </Text>
                    <Icon name="arrow-right" color="#9e9ea0" size={16} />
                  </TouchableOpacity>
                </Link>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  )
}
