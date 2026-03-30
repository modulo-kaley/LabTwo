import React, { useState, useEffect } from "react";
import { View, Text, Switch, StyleSheet } from "react-native";
import { storage, STORAGE_KEYS } from "../../../lib/storage";

function AppCard({
  title,
  subtitle,
  right,
}: {
  title: string;
  subtitle: string;
  right: React.ReactNode;
}) {
  return (
    <View style={styles.card}>
      <View style={styles.cardText}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardSubtitle}>{subtitle}</Text>
      </View>
      {right}
    </View>
  );
}

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const load = async () => {
      const savedNotifications = await storage.get(STORAGE_KEYS.NOTIFICATIONS);
      if (savedNotifications !== null) {
        setNotifications(savedNotifications === "true");
      }

      const savedTheme = await storage.get(STORAGE_KEYS.THEME);
      if (savedTheme !== null) {
        setDarkMode(savedTheme === "true");
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

  const handleDarkModeToggle = async (newValue: boolean) => {
    try {
      await storage.set(STORAGE_KEYS.THEME, newValue.toString());
      setDarkMode(newValue);
    } catch (e) {
      console.error("Failed to save theme setting", e);
    }
  };

  return (
    <View style={styles.container}>
      <AppCard
        title="Notifications"
        subtitle="Enable push notifications"
        right={
          <Switch value={notifications} onValueChange={handleToggle} />
        }
      />
      <AppCard
        title="Dark Mode"
        subtitle="Use dark theme"
        right={
          <Switch value={darkMode} onValueChange={handleDarkModeToggle} />
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
  cardText: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  cardSubtitle: {
    fontSize: 13,
    color: "#666",
    marginTop: 2,
  },
  stored: {
    marginTop: 8,
    fontSize: 13,
    color: "#444",
  },
});
