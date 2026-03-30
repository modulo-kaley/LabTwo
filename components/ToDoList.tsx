import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../context/ThemeContext";

type Task = { id: number; text: string; incomplete: boolean };

export default function ToDoList({
  tasks,
  onToggle,
}: {
  tasks: Task[];
  onToggle: (id: number) => void;
}) {
  const { darkMode } = useTheme();

  return (
    <ScrollView>
      {tasks.map((task) => (
        <Pressable key={task.id} onPress={() => onToggle(task.id)}>
          <View style={[styles.task, task.incomplete && (darkMode ? styles.incompleteDark : styles.incomplete)]}>
            <Text style={[styles.taskText, darkMode && styles.taskTextDark]}>{task.text}</Text>
          </View>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  task: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  incomplete: {
    backgroundColor: "#e0e0e0",
  },
  incompleteDark: {
    backgroundColor: "#2a2a2a",
  },
  taskText: {
    fontSize: 16,
    color: "#000",
  },
  taskTextDark: {
    color: "#fff",
  },
});
