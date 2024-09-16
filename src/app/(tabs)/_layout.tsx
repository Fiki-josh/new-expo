import { Tabs } from "expo-router";
import { useTheme } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
// import { store } from "@/src/redux/store";
// import { Provider } from "react-redux";

export default function StoriesLayout() {
  const { colors } = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: { backgroundColor: colors.shadow, paddingBottom: 10 },
        tabBarLabelStyle: { color: colors.onPrimary },
        tabBarActiveTintColor: colors.onSecondary,
      }}
    >
      <Tabs.Screen
        name="topStories"
        options={{
          title: "Top Stories",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="star" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="newStories"
        options={{
          title: "New Stories",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="new-box" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: "About Me",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
