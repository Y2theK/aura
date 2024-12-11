import { Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Link } from "expo-router";
export default function Index() {
  return (
    <View
      className="bg-gray-100 flex-1 items-center justify-center"
    >

      <Text className="text-3xl font-semibold text-primary font-pblack">Aura</Text>
      <StatusBar backgroundColor="#161622" style="light" />
      <Link href="/home">Home</Link>
    </View>
    
  );
}
