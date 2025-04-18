import { createSlice } from '@reduxjs/toolkit';


const taskSlice = createSlice({
    name: 'tasks',
    initialState: {
        tasks: [],
        loading: false,
        error: null,
    },
    reducers: {
        fetchTask: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchTaskSuccess: (state, action) =>{
            state.loading = false;
            state.tasks = action.payload;
        },
        fetchTaskFailure: (state, action) =>{
            state.loading= false;
            state.error = action.payload;
        }
    }
})

export const { fetchTask, fetchTaskSuccess, fetchTaskFailure } = taskSlice.actions;

export default taskSlice.reducer;