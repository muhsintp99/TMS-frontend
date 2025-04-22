import { createSlice } from '@reduxjs/toolkit';

const taskSlice = createSlice({
    name: 'tasks',
    initialState: {
        tasks: [],
        loading: false,
        error: null,
        taskByIdData: {},
        taskByStatusData: {},
        taskByPriorityData: {}
    },
    reducers: {
        // Fetch all tasks
        fetchTask: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchTaskSuccess: (state, action) => {
            state.loading = false;
            state.tasks = action.payload;
        },
        fetchTaskFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        // Add a task
        addTask: (state) => {
            state.loading = true;
            state.error = null;
        },
        addTaskSuccess: (state, action) => {
            state.loading = false;
            state.tasks = [...state.tasks, action.payload];
        },
        addTaskFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        // Update a task
        updateTask: (state) => {
            state.loading = true;
            state.error = null;
        },
        updateTaskSuccess: (state, action) => {
            state.loading = false;
            const index = state.tasks.findIndex(task => task._id === action.payload._id);
            if (index !== -1) {
                state.tasks[index] = action.payload;
            }
        },
        updateTaskFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        // Delete a task
        deleteTask: (state) => {
            state.loading = true;
            state.error = null;
        },
        deleteTaskSuccess: (state, action) => {
            state.loading = false;
            state.tasks = state.tasks.filter(task => task._id !== action.payload);
        },
        deleteTaskFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        // Get task by ID
        getTaskById: (state) => {
            state.loading = true;
            state.error = null;
        },
        getTaskByIdSuccess: (state, action) => {
            state.loading = false;
            state.taskByIdData = action.payload;
        },
        getTaskByIdFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        // Get tasks by status
        getTasksByStatus: (state) => {
            state.loading = true;
            state.error = null;
        },
        getTasksByStatusSuccess: (state, action) => {
            state.loading = false;
            state.taskByStatusData = action.payload;
        },
        getTasksByStatusFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        // Get tasks by priority
        getTasksByPriority: (state) => {
            state.loading = true;
            state.error = null;
        },
        getTasksByPrioritySuccess: (state, action) => {
            state.loading = false;
            state.taskByPriorityData = action.payload;
        },
        getTasksByPriorityFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export const {
    fetchTask, fetchTaskSuccess, fetchTaskFailure,
    addTask, addTaskSuccess, addTaskFailure,
    updateTask, updateTaskSuccess, updateTaskFailure,
    deleteTask, deleteTaskSuccess, deleteTaskFailure,
    getTaskById, getTaskByIdSuccess, getTaskByIdFailure,
    getTasksByStatus, getTasksByStatusSuccess, getTasksByStatusFailure,
    getTasksByPriority, getTasksByPrioritySuccess, getTasksByPriorityFailure
} = taskSlice.actions;

export default taskSlice.reducer;