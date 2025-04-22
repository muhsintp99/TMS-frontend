import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask, fetchTask } from '../container/taskSlice';
import DataTable from 'react-data-table-component';
import DateAndTime from '../../../utils/DateAndTime';
import { getPriorityStyle, getStatusStyle } from '../../../utils/commen';
import AddEditModel from './AddEditModel';
import ViewModal from './ViewModal';
import DeleteModel from '../../../utils/DeleteModel';
import { IconButton, Button, CircularProgress, Box } from '@mui/material';
import { Delete, Edit, Visibility, Add } from '@mui/icons-material';
import TaskFilters from './TaskFilters';

const TaskIndex = () => {
  const dispatch = useDispatch();
  // const { tasks } = useSelector((state) => state.task);
  const { tasks, loading } = useSelector((state) => state.task);

  const [openAddEditModal, setOpenAddEditModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const [dataLoaded, setDataLoaded] = useState(false);

  const [filters, setFilters] = useState({ status: 'all', priority: 'all' });

const applyLocalFilter = () => {
  let filtered = [...tasks];

  if (filters.status !== 'all') {
    filtered = filtered.filter(task => task.status === filters.status);
  }

  if (filters.priority !== 'all') {
    filtered = filtered.filter(task => task.priority === filters.priority);
  }

  return filtered.reverse();
};

  useEffect(() => {
    dispatch(fetchTask());
  }, [dispatch]);

  useEffect(() => {
    if (tasks.length > 0 && !dataLoaded) {
      setDataLoaded(true);
    }
  }, [tasks, dataLoaded]);

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

  const handleOpenViewModal = (task) => {
    setSelectedTask(task);
    setOpenViewModal(true);
  };

  const handleCloseViewModal = () => {
    setOpenViewModal(false);
    setSelectedTask(null);
  };

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

  const columns = [
    {
      name: 'Task ID',
      selector: (row) => row._id,
      sortable: true,
    },
    {
      name: 'Task Name',
      selector: (row) => row.title,
      sortable: true,
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
      sortable: true,
      width: '120px',
    },
    {
      name: 'Task Priority',
      selector: (row) => (
        <span style={getPriorityStyle(row.priority)}>{row.priority}</span>
      ),
      sortable: true,
      width: '120px',
    },
    {
      name: 'Due Date',
      selector: (row) => <DateAndTime dateString={row.dueDate} />,
      sortable: true,
      width: '180px',
    },
    {
      name: 'Created Date',
      selector: (row) => <DateAndTime dateString={row.createdDate} />,
      sortable: true,
      width: '180px',
    },
    {
      name: 'ACTION',
      cell: (row) => (
        <div>
          <IconButton onClick={() => handleOpenViewModal(row)}>
            <Visibility color="primary" />
          </IconButton>
          <IconButton onClick={() => handleOpenAddEditModal(row)}>
            <Edit color="secondary" />
          </IconButton>
          <IconButton onClick={() => handleDeleteModal(row)}>
            <Delete color="error" />
          </IconButton>
        </div>
      )
    }
  ];

  return (
    <div>
      <TaskFilters onFilterChange={setFilters} />
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={() => handleOpenAddEditModal()}
        >
          Add New Task
        </Button>
      </div>

      {/* <DataTable
        columns={columns}
        data={tasks}
        pagination
        paginationPerPage={4}
        paginationRowsPerPageOptions={[4, 10, 20]}
      /> */}

      {loading && !dataLoaded ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <DataTable
          columns={columns}
          data={applyLocalFilter()}
          pagination
          paginationPerPage={4}
          paginationRowsPerPageOptions={[4, 10, 20]}
          progressPending={loading && dataLoaded}
          persistTableHead
          noDataComponent={
            <Box sx={{ p: 4, textAlign: 'center' }}>
              No tasks found. Create a new task to get started.
            </Box>
          }
        />
      )}

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
    </div>
  );
};

export default TaskIndex;