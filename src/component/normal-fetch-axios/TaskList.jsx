import React, { useEffect, useState } from 'react';
import { createTask, deleteTask, filterByPriority, filterByStatus, getTasks, updateTask } from './TaskApi';
import DataTable from 'react-data-table-component';
import { Box, TextField, Button, FormControl, InputLabel, MenuItem, Select, FormHelperText } from '@mui/material';
import DateAndTime from '../../utils/DateAndTime';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { getPriorityStyle, getStatusStyle } from '../../utils/commen';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const TaskSchema = Yup.object().shape({
    title: Yup.string().required('Required'),
    description: Yup.string().required('Required'),
    status: Yup.string().required('Required'),
    priority: Yup.string().required('Required'),
    dueDate: Yup.date().required('Required'),
});

const TaskList = () => {
    const [data, setData] = useState([]);
    const [editTask, setEditTask] = useState(null);
    const [filterStatus, setFilterStatus] = useState('');
    const [filterPriority, setFilterPriority] = useState('');
    const [initialValues, setInitialValues] = useState({
        title: '',
        description: '',
        status: '',
        priority: '',
        dueDate: '',
    });

    const handleStatusFilter = (status) => {
        setFilterStatus(status);
        if (status === '') {
            fetchTasks();
        } else {
            filterByStatus(status)
                .then((res) => setData(res.data))
                .catch((err) => console.log(err));
        }
    };

    const handlePriorityFilter = (priority) => {
        setFilterPriority(priority);
        if (priority === '') {
            fetchTasks();
        } else {
            filterByPriority(priority)
                .then((res) => setData(res.data))
                .catch((err) => console.log(err));
        }
    };

    const fetchTasks = () => {
        getTasks()
            .then((res) => setData(res.data.reverse()))
            .catch((err) => console.log('err', err));
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleSubmit = (values, { resetForm }) => {
        if (editTask) {
            updateTask(editTask, values)
                .then(() => {
                    fetchTasks();
                    setEditTask(null);
                    setInitialValues({
                        title: '',
                        description: '',
                        status: '',
                        priority: '',
                        dueDate: '',
                    });
                    resetForm();
                    console.log('Task Updated Successfully');
                    toast.success('Task Updated Successfully');
                })
                .catch((err) => console.log('Update Error', err));
        } else {
            createTask(values)
                .then(() => {
                    fetchTasks();
                    resetForm();
                    console.log('Task Created Successfully');
                    toast.success('Task Created Successfully');
                })
                .catch((err) => console.log('Create Error', err));
        }
    };

    const handleDelete = (id) => {
        deleteTask(id)
            .then(() => {
                fetchTasks();
                console.log('Task Deleted Successfully');
                toast.success('Task Deleted Successfully');
            })
            .catch((err) => console.log('Delete Error', err));
    };

    const columns = [
        {
            name: 'Task ID',
            selector: (row) => row._id,
        },
        {
            name: 'Task Name',
            selector: (row) => row.title,
            width: '180px',
        },
        {
            name: 'Task Description',
            selector: (row) => row.description,
        },
        {
            name: 'Task Status',
            selector: (row) => (
                <span style={getStatusStyle(row.status)}>{row.status}</span>
            ),
            width: '120px',
        },
        {
            name: 'Task Priority',
            selector: (row) => (
                <span style={getPriorityStyle(row.priority)}>{row.priority}</span>
            ),
            width: '120px',
        },
        {
            name: 'Due Date',
            selector: (row) => <DateAndTime dateString={row.dueDate} />,
            width: '180px',
        },
        {
            name: 'Created Date',
            selector: (row) => <DateAndTime dateString={row.createdDate} />,
            width: '180px',
        },
        {
            name: 'Actions',
            selector: (row) => (
                <>
                    <Button
                        onClick={() => {
                            setEditTask(row._id);
                            setInitialValues({
                                title: row.title,
                                description: row.description,
                                status: row.status,
                                priority: row.priority,
                                dueDate: row.dueDate.split('T')[0],
                            });
                        }}
                        variant="outlined"
                        sx={{ mr: 1 }}
                    >
                        Update
                    </Button>
                    <Button
                        onClick={() => handleDelete(row._id)}
                        variant="outlined"
                        color="error"
                    >
                        Delete
                    </Button>
                </>
            ),
        },
    ];

    return (
        <>
            <Box>
                <h1 style={{ width: '100%', textAlign: 'center' }}>
                    {editTask ? 'Update Task' : 'Create Task'}
                </h1>
                <Box sx={{ padding: '30px', background: '#f0f0f0' }}>
                    <Formik
                        enableReinitialize
                        initialValues={initialValues}
                        validationSchema={TaskSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ errors, touched }) => (
                            <Form
                                style={{
                                    display: 'grid',
                                    gap: '1rem',
                                    maxWidth: 600,
                                    margin: 'auto',
                                }}
                            >
                                <Field
                                    as={TextField}
                                    name="title"
                                    label="Task Name"
                                    error={!!errors.title && touched.title}
                                    helperText={touched.title && errors.title}
                                />
                                <Field
                                    as={TextField}
                                    name="description"
                                    label="Description"
                                    error={!!errors.description && touched.description}
                                    helperText={touched.description && errors.description}
                                />
                                <FormControl fullWidth error={!!errors.status && touched.status}>
                                    <InputLabel>Status</InputLabel>
                                    <Field name="status" as={Select} label="Status">
                                        <MenuItem value="Todo">Todo</MenuItem>
                                        <MenuItem value="InProgress">InProgress</MenuItem>
                                        <MenuItem value="Completed">Completed</MenuItem>
                                    </Field>
                                    <FormHelperText>{touched.status && errors.status}</FormHelperText>
                                </FormControl>

                                <FormControl fullWidth error={!!errors.priority && touched.priority}>
                                    <InputLabel>Priority</InputLabel>
                                    <Field name="priority" as={Select} label="Priority">
                                        <MenuItem value="Low">Low</MenuItem>
                                        <MenuItem value="Medium">Medium</MenuItem>
                                        <MenuItem value="High">High</MenuItem>
                                    </Field>
                                    <FormHelperText>{touched.priority && errors.priority}</FormHelperText>
                                </FormControl>

                                <Field
                                    as={TextField}
                                    name="dueDate"
                                    type="date"
                                    label="Due Date"
                                    InputLabelProps={{ shrink: true }}
                                    error={!!errors.dueDate && touched.dueDate}
                                    helperText={touched.dueDate && errors.dueDate}
                                />

                                <Box sx={{ display: 'flex', gap: 2 }}>
                                    <Button variant="contained" type="submit">
                                        {editTask ? 'Update Task' : 'Add Task'}
                                    </Button>
                                    {editTask && (
                                        <Button
                                            variant="outlined"
                                            color="warning"
                                            onClick={() => {
                                                setEditTask(null);
                                                setInitialValues({
                                                    title: '',
                                                    description: '',
                                                    status: '',
                                                    priority: '',
                                                    dueDate: '',
                                                });
                                            }}
                                        >
                                            Cancel Edit
                                        </Button>
                                    )}
                                </Box>
                            </Form>
                        )}
                    </Formik>
                </Box>
            </Box>

            <Box sx={{ margin: '0', overflowX: 'auto' }}>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        padding: '20px',
                        justifyContent: 'space-between',
                    }}
                >
                    <Box>
                        <h2>Task List</h2>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            gap: 2,
                            background: '#f0f0f0',
                            padding: '10px',
                            borderRadius: '5px',
                        }}
                    >
                        <FormControl>
                            <InputLabel>Status</InputLabel>
                            <Select
                                value={filterStatus}
                                onChange={(e) => handleStatusFilter(e.target.value)}
                                label="Status"
                                size="small"
                                sx={{ minWidth: 150 }}
                            >
                                <MenuItem value="">All</MenuItem>
                                <MenuItem value="Todo">Todo</MenuItem>
                                <MenuItem value="InProgress">InProgress</MenuItem>
                                <MenuItem value="Completed">Completed</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl>
                            <InputLabel>Priority</InputLabel>
                            <Select
                                value={filterPriority}
                                onChange={(e) => handlePriorityFilter(e.target.value)}
                                label="Priority"
                                size="small"
                                sx={{ minWidth: 150 }}
                            >
                                <MenuItem value="">All</MenuItem>
                                <MenuItem value="Low">Low</MenuItem>
                                <MenuItem value="Medium">Medium</MenuItem>
                                <MenuItem value="High">High</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Box>

                <div style={{ minWidth: '900px' }}>
                    <DataTable
                        columns={columns}
                        data={data}
                        pagination
                        paginationPerPage={4}
                        paginationRowsPerPageOptions={[4, 10, 20]}
                    />
                </div>
            </Box>
            <ToastContainer />
        </>
    );
};

export default TaskList;
