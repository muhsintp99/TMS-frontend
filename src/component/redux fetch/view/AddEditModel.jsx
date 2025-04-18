import React from 'react'
import { Box, TextField, Button, FormControl, InputLabel, MenuItem, Select, FormHelperText } from '@mui/material';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';

const TaskSchema = Yup.object().shape({
    title: Yup.string().required('Required'),
    description: Yup.string().required('Required'),
    status: Yup.string().required('Required'),
    priority: Yup.string().required('Required'),
    dueDate: Yup.date().required('Required'),
});

const AddEditModel = () => {

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

    return (
        <>
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
        </>
    )
}

export default AddEditModel