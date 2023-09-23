import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { v4 as uuidV4 } from 'uuid';

const base_url = 'http://localhost:8000/api';

export const getTodosAsync = createAsyncThunk(
    'todos/getTodosAsync',
    async () => {
        const resp = await fetch(`${base_url}/todos/list`);
        if (resp.ok) {
            const todos = await resp.json();
            return { todos };
        }
    },
);

export const addTodoAsync = createAsyncThunk(
    'todos/addTodoAsync',
    async (payload) => {
        const resp = await fetch(`${base_url}/todos/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title: payload.title }),
        });

        console.log('resp: ', resp);
        if (resp.ok) {
            const todo = await resp.json();
            return { todo };
        }
    },
);

export const toggleCompleteAsync = createAsyncThunk(
    'todos/completeTodoAsync',
    async (payload) => {
        const resp = await fetch(`${base_url}/todos/${payload.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ completed: payload.completed }),
        });

        if (resp.ok) {
            const todo = await resp.json();
            return { todo };
        }
    },
);

export const deleteTodoAsync = createAsyncThunk(
    'todos/deleteTodoAsync',
    async (payload) => {
        const resp = await fetch(`${base_url}/todos/${payload.id}`, {
            method: 'DELETE',
        });

        if (resp.ok) {
            return { id: payload.id };
        }
    },
);

export const todoSlice = createSlice({
    name: 'todos',

    initialState: [],

    reducers: {
        addTodo: (state = [], action) => {
            console.log('state: ', state);
            const todo = {
                id: uuidV4(),
                title: action.payload.title,
                completed: false,
            };
            state.push(todo);
        },

        toggleComplete: (state = [], action) => {
            const index = state.findIndex(
                (todo) => todo.id === action.payload.id,
            );
            state[index].completed = action.payload.completed;
        },

        deleteTodo: (state = [], action) => {
            console.log('state: ', state);
            return state.filter((todo) => todo.id !== action.payload.id);
        },
    },

    extraReducers: {
        [getTodosAsync.fulfilled]: (state, action) => {
            console.log('get todo', state, action);
            return action.payload?.todos?.data || [];
        },

        [addTodoAsync.fulfilled]: (state, action) => {
            console.log('state: ', state);
            state.push(action.payload.todo);
        },

        [toggleCompleteAsync.fulfilled]: (state, action) => {
            const index = state.findIndex(
                (todo) => todo.id === action.payload.todo.id,
            );
            state[index].completed = action.payload.todo.completed;
        },

        [deleteTodoAsync.fulfilled]: (state, action) => {
            return state.filter((todo) => todo.id !== action.payload.id);
        },
    },
});

export const { addTodo, toggleComplete, deleteTodo } = todoSlice.actions;

export default todoSlice.reducer;
