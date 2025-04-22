import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask, fetchTask } from '../container/taskSlice';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { getPriorityStyle, getStatusStyle } from '../../../utils/commen';
import { Add, Delete, Edit, Visibility } from '@mui/icons-material';
import ViewModal from './ViewModal';
import DeleteModel from '../../../utils/DeleteModel';
import AddEditModel from './AddEditModel';
import DateAndTime from '../../../utils/DateAndTime';

const Kanban = () => {
  const dispatch = useDispatch();
  const { tasks, loading } = useSelector((state) => state.task);

  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const [openAddEditModal, setOpenAddEditModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);


  useEffect(() => {
    dispatch(fetchTask());
  }, [dispatch]);

  // // Placeholder functions for future implementation
  // const handleOpenViewModal = (task) => {
  //   console.log("View:", task);
  // };

  const handleOpenViewModal = (task) => {
    setSelectedTask(task);
    setOpenViewModal(true);
  };

  const handleCloseViewModal = () => {
    setOpenViewModal(false);
    setSelectedTask(null);
  };

  // const handleOpenAddEditModal = (task) => {
  //   console.log("Edit:", task);
  // };.

  const handleOpenAddEditModal = (task = null) => {
    if (task) {
      setSelectedTask(task);
      setIsEditing(true);
    } else {
      setSelectedTask(null);
      setIsEditing(false);
    }
    setOpenAddEditModal(true);
  };

  const handleCloseAddEditModal = () => {
    setOpenAddEditModal(false);
    setSelectedTask(null);
    setIsEditing(false);
  };

  // const handleDeleteModal = (task) => {
  //   console.log("Delete:", task);
  // };

  const handleDeleteModal = (task) => {
    setSelectedTask(task);
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
    setSelectedTask(null);
  };

  const handleConfirmDelete = () => {
    dispatch(deleteTask(selectedTask._id));
    console.log(`Deleting task: ${selectedTask._id}`);
    handleCloseDeleteModal();
    dispatch(fetchTask());
  };


  const handleResetFilters = () => {
    setStatusFilter('all');
    setPriorityFilter('all');
    setSearchTerm('');
  };

  // Filtering logic
  const filteredTasks = tasks?.filter((task) => {
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) || task.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesPriority && matchesSearch;
  });

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', m: 5 }}>
        <h1>Kanban Board</h1>
        <TextField
          placeholder='Search here...'
          size='small'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Box sx={{ display: 'flex', gap: 2 }}>
          <FormControl sx={{ minWidth: 200 }} size="small">
            <InputLabel>Filter by Status</InputLabel>
            <Select
              label="Filter by Status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <MenuItem value="all">All Statuses</MenuItem>
              <MenuItem value="Todo">Todo</MenuItem>
              <MenuItem value="InProgress">In Progress</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 200 }} size="small">
            <InputLabel>Filter by Priority</InputLabel>
            <Select
              label="Filter by Priority"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
            >
              <MenuItem value="all">All Priorities</MenuItem>
              <MenuItem value="Low">Low</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="High">High</MenuItem>
            </Select>
          </FormControl>

          <Button variant="contained" size='small' onClick={handleResetFilters}>Reset</Button>
        </Box>
        <Box>
          <Button variant="contained" onClick={() => handleOpenAddEditModal(null)}>
            <Add /> Add New Task
          </Button>
        </Box>
      </Box>

      <Box gap={5} display="flex" flexWrap="wrap" flexDirection="row" alignItems="center" justifyContent="center">
        {loading ? (
          <h1>Loading...</h1>
        ) : filteredTasks.length === 0 ? (
          <Typography>No tasks found.</Typography>
        ) : (
          filteredTasks.map((task) => (
            <Card
              key={task._id}
              variant="outlined"
              sx={{ minWidth: 275, borderRadius: '12px', background: '#aac8e1c2', boxShadow: 3 }}
            >
              <CardContent>
                <Typography variant="h6">{task.title}</Typography>
                <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>{task.description}</Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Typography>
                    <span style={getStatusStyle(task.status)}>{task.status.toUpperCase()}</span>
                  </Typography>
                  <Typography>
                    <span style={getPriorityStyle(task.priority)}>{task.priority.toUpperCase()}</span>
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{mt:2}}>
                  Due Date: <DateAndTime dateString={task.dueDate} />
                </Typography>
                 
                <Typography variant="body2" color="text.secondary">
                Created Date: <DateAndTime dateString={task.createdDate} />
                </Typography>
              </CardContent>
              <CardActions>
                <Box sx={{ mt: 1 }}>
                  <Tooltip title="View Task" arrow>
                    <IconButton onClick={() => handleOpenViewModal(task)}>
                      <Visibility />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit Task" arrow>
                    <IconButton onClick={() => handleOpenAddEditModal(task)}>
                      <Edit />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete Task" arrow>
                    <IconButton onClick={() => handleDeleteModal(task)}>
                      <Delete />
                    </IconButton>
                  </Tooltip>
                </Box>
              </CardActions>
            </Card>
          ))
        )}
      </Box>

      {openAddEditModal && (
        <AddEditModel
          open={openAddEditModal}
          onClose={handleCloseAddEditModal}
          editTask={isEditing ? selectedTask : null}
        />
      )}

      {openViewModal && (
        <ViewModal
          open={openViewModal}
          onClose={handleCloseViewModal}
          item={selectedTask}
        />
      )}

      <DeleteModel
        open={openDeleteModal}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
      />

    </>
  );
};

export default Kanban;
