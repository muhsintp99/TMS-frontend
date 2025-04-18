import axios from 'axios'

const APIFetch = axios.create({
    // baseURL: `${import.meta.env.API_URL}`,
    baseURL: 'http://localhost:8000/api/tasks',
})

export const getTasks = () => APIFetch.get('/');
export const getTaskById = (id) => APIFetch.get(`/${id}`);

export const createTask = (taskdata) => APIFetch.post('/',taskdata);
export const updateTask =(id, taskdata) =>APIFetch.put(`/${id}`,taskdata);

export const deleteTask = (id)=> APIFetch.delete(`/${id}`);

export const filterByStatus = (status) => APIFetch.get(`/status/${status}`);
export const filterByPriority = (priority) => APIFetch.get(`/priority/${priority}`);