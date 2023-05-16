import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-gray-950">
      <Text className="text-zinc-50 text-4xl font-bold">👋 Hello, there!</Text>

      <StatusBar style="light" />
    </View>
  );
}
