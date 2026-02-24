import React from 'react';
import { ScrollView, View, Text, Pressable, StyleSheet } from 'react-native';


type Task = { id: number; text: string; completed: boolean };

export default function ToDoList({ tasks, onToggle }: { tasks: Task[]; onToggle: (id: number) => void }) {
    return(
        <ScrollView>
            {tasks.map((task) => (
                <Pressable key={task.id} onPress={() => onToggle(task.id)}>
                    <View style={[styles.task, task.completed && styles.completed]}>
                        <Text style={styles.taskText}>{task.text}</Text>
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
        borderColor: '#ccc',
    },
    completed: {
        backgroundColor: '#e0e0e0',
    },
    taskText: {
        fontSize: 16,
    },
});