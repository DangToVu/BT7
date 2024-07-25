import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { removeTodo, editTodo } from '../store/todoSlice';

const TodoItem = ({ todo }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newText, setNewText] = useState(todo.text);
    const dispatch = useDispatch();

    const handleEdit = () => {
        dispatch(editTodo({
            id: todo.id,
            text: newText
        }));
        setIsEditing(false);
    };

    return (
        <View style={styles.todoItem}>
            {isEditing ? (
                <>
                    <TextInput 
                        style={styles.input} 
                        value={newText} 
                        onChangeText={setNewText} 
                    />
                    <Button title="Save" onPress={handleEdit} />
                </>
            ) : (
                <>
                    <Text>{todo.text}</Text>
                    <View style={styles.buttons}>
                        <Button title="Edit" onPress={() => setIsEditing(true)} />
                        <View style={styles.deleteButton}>
                            <Button title="Delete" onPress={() => dispatch(removeTodo(todo.id))} />
                        </View>
                    </View>
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    todoItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc'
    },
    buttons: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    deleteButton: {
        marginLeft: 10 // Tăng khoảng cách giữa các nút
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 5,
        flex: 1
    }
});

export default TodoItem;
