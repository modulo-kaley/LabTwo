import AsyncStorage from "@react-native-async-storage/async-storage";

export const STORAGE_KEYS = {
  NOTIFICATIONS: "notifications",
  THEME: "theme",
};

export const storage = {
  get: async (key: string): Promise<string | null> => {
    return AsyncStorage.getItem(key);
  },
  set: async (key: string, value: string): Promise<void> => {
    await AsyncStorage.setItem(key, value);
  },
};
