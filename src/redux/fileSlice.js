import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const base_url = 'http://localhost:8000/api';

export const getFileAsync = createAsyncThunk(
    'file/getFileAsync',
    async () => {
        const response = await fetch(`${base_url}/file/list`);
        if (response.ok) {
            const files = response.json();
            return { files }
        }
    }
)

export const addFileAsync = createAsyncThunk(
    'file/addFileAsync',
    async (payload) => {
        const response = await fetch(`${base_url}/file/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title: payload.title }),
        });

        if (response.ok) {
            const file = await response.json();
            return { file };
        }
    },
);

export const viewFileAsync = createAsyncThunk(
    'file/viewFileAsync',
    async (payload) => {
        const resp = await fetch(`${base_url}/file/${payload.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ completed: payload.completed }),
        });

        if (resp.ok) {
            const file = await resp.json();
            return { file };
        }
    },
);

export const deleteFileAsync = createAsyncThunk(
    'file/deleteFileAsync',
    async (payload) => {
        const resp = await fetch(`${base_url}/file/${payload.id}`, {
            method: 'DELETE',
        });

        if (resp.ok) {
            return { id: payload.id };
        }
    },
);

export const fileSlice = createSlice({
    name: 'file',

    initialState: [],

    reducers: {
        addFile: (state = [], action) => {
            console.log('state: ', state);
            const formData = new FormData();
            formData.append('file')
            const todo = {
                id: uuidV4(),
                title: action.payload.title,
                completed: false,
            };
            state.push(todo);
        },

        viewFile: (state = [], action) => {
            const index = state.findIndex(
                (todo) => todo.id === action.payload.id,
            );
            state[index].completed = action.payload.completed;
        },

        deleteFile: (state = [], action) => {
            console.log('state: ', state);
            return state.filter((todo) => todo.id !== action.payload.id);
        },
    },

    extraReducers: {
        [getFileAsync.fulfilled] : (state, action) => {
            return action.payload?.file?.data ?? []
        },

        [addFileAsync.fulfilled]: (state, action) => {
            console.log('state: ', state);
            state.push(action.payload.file);
        },

        [viewFileAsync.fulfilled]: (state, action) => {
            const index = state.findIndex(
                (data) => data.id === action.payload.file.id,
            );
            state[index].completed = action.payload.file.completed;
        },

        [deleteFileAsync.fulfilled]: (state, action) => {
            return state.filter((data) => data.id !== action.payload.id);
        },
    }
})

export const { addFile, viewFile, deleteFile } = fileSlice.actions;

export default fileSlice.reducer;