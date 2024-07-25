import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, StyleSheet, ImageBackground } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo } from '../store/todoSlice';
import TodoItem from '../components/TodoItem';

const TodoScreen = () => {
    const [text, setText] = useState('');
    const todos = useSelector(state => state.todos.todos);
    const dispatch = useDispatch();

    const addNewTodo = () => {
        dispatch(addTodo({
            id: Date.now().toString(),
            text
        }));
        setText('');
    };

    return (
        <ImageBackground 
            source={require('../../assets/background.jpg')} 
            style={styles.background}
        >
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    value={text}
                    onChangeText={setText}
                    placeholder="Add new todo"
                />
                <Button title="Add Todo" onPress={addNewTodo} />
                <FlatList
                    data={todos}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <TodoItem todo={item} />}
                />
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover', 
    },
    container: {
        flex: 1,
        padding: 20,
        marginTop:30,
        backgroundColor: 'rgba(255, 255, 255, 0.8)' 
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#fff', 
    }
});

export default TodoScreen;
