import { Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
export default function Index() {
  return (
    <View
      className="bg-gray-100 flex-1 items-center justify-center"
    >
      <Text className="text-3xl font-semibold text-primary font-pblack">Aura</Text>
      <StatusBar style="auto"></StatusBar>
    </View>
  );
}
