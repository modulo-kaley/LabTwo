import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import ToDoForm from "./ToDoForm";
import ToDoList from "./ToDoList";

// Each task has an id, text, and completed boolean 
export default function Index() {
  const [tasks, setTasks ] = useState ([
    { id: 1, text: 'Do laundry' , incomplete: true },
    { id: 2, text: 'Go to gym' , incomplete: true },
    { id: 3, text: 'Walk dog' , incomplete: true },
  ]);

  // Tracks what the user is typing in the input field
  const [input, setInput] = useState('');

  function handleAddTask() {
    // If the input is empty, do nothing
    if (input.trim() === '') return;

    /*
    * Spread the tasks in a new array 
    * Append the new task 
    * Date.now() = unique id
     */
    setTasks([...tasks, { id: Date.now(), text: input, incomplete: true}]);
    
    // clear the input field after adding 
    setInput('');
  }

  /* Toggles the completed boolean 
  * finds task by id 
  */
  function handleToggleTask(id: number) {
    setTasks(tasks.map((task) =>
    task.id === id ? {...task, incomplete: !task.incomplete } : task
    ))
  }
  return (
    <SafeAreaView style={styles.container}>
      <ToDoList tasks={tasks} onToggle={handleToggleTask} />

      <ToDoForm input={input} onChangeText={setInput} onAdd={handleAddTask} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
