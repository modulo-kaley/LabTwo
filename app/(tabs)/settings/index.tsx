import React, { useState, useEffect } from "react";
import { View, Text, Switch, StyleSheet } from "react-native";
import { storage, STORAGE_KEYS } from "../../../lib/storage";
import { useTheme } from "../../../context/ThemeContext";

function AppCard({
  title,
  subtitle,
  right,
  darkMode,
}: {
  title: string;
  subtitle: string;
  right: React.ReactNode;
  darkMode: boolean;
}) {
  return (
    <View style={[styles.card, darkMode && styles.cardDark]}>
      <View style={styles.cardText}>
        <Text style={[styles.cardTitle, darkMode && styles.textDark]}>{title}</Text>
        <Text style={[styles.cardSubtitle, darkMode && styles.subtitleDark]}>{subtitle}</Text>
      </View>
      {right}
    </View>
  );
}

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(false);
  const { darkMode, setDarkMode } = useTheme();

  useEffect(() => {
    const load = async () => {
      const savedNotifications = await storage.get(STORAGE_KEYS.NOTIFICATIONS);
      if (savedNotifications !== null) {
        setNotifications(savedNotifications === "true");
      }
    };
    load();
  }, []);

  const handleToggle = async (newValue: boolean) => {
    try {
      await storage.set(STORAGE_KEYS.NOTIFICATIONS, newValue.toString());
      setNotifications(newValue);
    } catch (e) {
      console.error("Failed to save notifications setting", e);
    }
  };

  return (
    <View style={[styles.container, darkMode && styles.containerDark]}>
      <AppCard
        title="Notifications"
        subtitle="Enable push notifications"
        darkMode={darkMode}
        right={
          <Switch value={notifications} onValueChange={handleToggle} />
        }
      />
      <AppCard
        title="Dark Mode"
        subtitle="Use dark theme"
        darkMode={darkMode}
        right={
          <Switch value={darkMode} onValueChange={setDarkMode} />
        }
      />
      <Text style={styles.stored}>Stored: {darkMode.toString()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  containerDark: {
    backgroundColor: "#121212",
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
  cardDark: {
    borderColor: "#444",
  },
  cardText: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  textDark: {
    color: "#fff",
  },
  cardSubtitle: {
    fontSize: 13,
    color: "#666",
    marginTop: 2,
  },
  subtitleDark: {
    color: "#aaa",
  },
  stored: {
    marginTop: 8,
    fontSize: 13,
    color: "#444",
  },
});
