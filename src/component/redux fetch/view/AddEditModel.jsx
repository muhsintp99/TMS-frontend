import React, { useEffect } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  FormControl, 
  InputLabel, 
  MenuItem, 
  Select, 
  FormHelperText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, updateTask, fetchTask } from '../container/taskSlice';

const TaskSchema = Yup.object().shape({
  title: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
  status: Yup.string().required('Required'),
  priority: Yup.string().required('Required'),
  dueDate: Yup.date().required('Required'),
});

const AddEditModel = ({ open, onClose, editTask }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.task);
  
  const initialValues = editTask ? {
    title: editTask.title || '',
    description: editTask.description || '',
    status: editTask.status || '',
    priority: editTask.priority || '',
    dueDate: editTask.dueDate ? editTask.dueDate.split('T')[0] : '',
  } : {
    title: '',
    description: '',
    status: '',
    priority: '',
    dueDate: '',
  };

  // Watch for changes in loading state to determine when action completes
  useEffect(() => {
    // Only react when loading transitions from true to false (action completed)
    if (!loading && open) {
      if (error) {
        toast.error(editTask ? 'Failed to update task' : 'Failed to create task');
      }
    }
  }, [loading, error, open, editTask]);

  const handleSubmit = (values, { resetForm }) => {
    if (editTask) {
      dispatch(updateTask({ id: editTask._id, data: values }));
      
      // For immediate feedback, assume success (saga will handle errors)
      toast.success('Task Updated Successfully');
      resetForm();
      onClose();
      
      // Refresh tasks list
      dispatch(fetchTask());
    } else {
      dispatch(addTask(values));
      
      // For immediate feedback, assume success (saga will handle errors)
      toast.success('Task Created Successfully');
      resetForm();
      onClose();
      
      // Refresh tasks list
      dispatch(fetchTask());
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{editTask ? 'Edit Task' : 'Create New Task'}</DialogTitle>
      <DialogContent>
        <Box sx={{ padding: '20px' }}>
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
                  width: '100%',
                }}
              >
                <Field
                  as={TextField}
                  name="title"
                  label="Task Name"
                  fullWidth
                  error={!!errors.title && touched.title}
                  helperText={touched.title && errors.title}
                />
                <Field
                  as={TextField}
                  name="description"
                  label="Description"
                  multiline
                  rows={3}
                  fullWidth
                  error={!!errors.description && touched.description}
                  helperText={touched.description && errors.description}
                />
                <FormControl fullWidth error={!!errors.status && touched.status}>
                  <InputLabel>Status</InputLabel>
                  <Field name="status" as={Select} label="Status">
                    <MenuItem value="Todo">Todo</MenuItem>
                    <MenuItem value="InProgress">In Progress</MenuItem>
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
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  error={!!errors.dueDate && touched.dueDate}
                  helperText={touched.dueDate && errors.dueDate}
                />

                <DialogActions sx={{ p: 0, mt: 2 }}>
                  <Button variant="outlined" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button variant="contained" type="submit" disabled={loading}>
                    {editTask ? 'Update Task' : 'Add Task'}
                  </Button>
                </DialogActions>
              </Form>
            )}
          </Formik>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default AddEditModel;