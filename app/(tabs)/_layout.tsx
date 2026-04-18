import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useTheme } from "../../context/ThemeContext";

export default function TabsLayout() {
  const { darkMode } = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: darkMode ? "#fff" : "#007AFF",
        tabBarInactiveTintColor: darkMode ? "#888" : "#555",
        tabBarStyle: {
          backgroundColor: darkMode ? "#121212" : "#fff",
          borderTopColor: darkMode ? "#333" : "#ccc",
        },
        headerStyle: {
          backgroundColor: darkMode ? "#121212" : "#fff",
        },
        headerTintColor: darkMode ? "#fff" : "#000",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="options-outline" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
