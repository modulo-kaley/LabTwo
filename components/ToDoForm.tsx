import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Button } from 'react-native';

export default function ToDoForm({ input, onChangeText, onAdd }: { input: string; onChangeText: (text: string) => void; onAdd: () => void }) {
  const { darkMode } = useTheme();

  return (
    // Row container that holds the input field and button side by side
    <View style={styles.form}>

      <TextInput
        style={[styles.input, darkMode && styles.inputDark]}
        placeholder="Add a new task..."
        placeholderTextColor={darkMode ? "#888" : "#aaa"}
        value={input}
        onChangeText={onChangeText}
      />

      {/* onPress calls handleAddTask in index.tsx when the button is pressed */}
      <Button title="Add" onPress={onAdd} />

    </View>
  );
}

const styles = StyleSheet.create({

  form: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 20,
  },

  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
    color: '#000',
  },

  inputDark: {
    borderColor: '#555',
    color: '#fff',
  },
});
