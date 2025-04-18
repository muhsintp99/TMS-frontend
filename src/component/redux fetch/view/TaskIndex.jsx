import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTask } from '../container/taskSlice';
import DataTable from 'react-data-table-component';
import DateAndTime from '../../../utils/DateAndTime';
import { getPriorityStyle, getStatusStyle } from '../../../utils/commen';
import AddEditModel from './AddEditModel';
import ViewModal from './ViewModal';

const TaskIndex = () => {
  const dispatch = useDispatch();
  const { tasks} = useSelector((state) => state.task);
  console.log(tasks);

  const [openModel, setOpenModel] = useState(false);

  useEffect(() => {
    dispatch(fetchTask());
  }, [dispatch]);

  const handleOpenModel = (whichOpen, item) =>{
    setOpenModel(true);
    let ComponentToReader;
    switch(whichOpen) {
      case 'add':
        ComponentToReader = <AddEditModel/>;
        break;
      case 'edit':
        ComponentToReader = <AddEditModel item={item}/>;
        break;
      case 'view':
        ComponentToReader = <ViewModal item={item}/>;
        break;
      default:
        ComponentToReader = null;
    }

  }

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
      name: 'ACTION',
      cell: (row) => (
        <div>
          <IconButton onClick={() => handleOpenModel('viewform', row)}>
            <Visibility className="actn-icon1" />
          </IconButton>
          <IconButton onClick={() => handleOpenModel('editform', row)}>
            <EditNoteIcon className="actn-icon2" />
          </IconButton>
          <IconButton onClick={() => handleDeleteModal(row)}>
            <Delete className="actn-icon3" />
          </IconButton>
        </div>
      )
    }
  ];




  return (
    <div>
      

      <DataTable
        columns={columns}
        data={tasks}
        pagination
        paginationPerPage={4}
        paginationRowsPerPageOptions={[4, 10, 20]}
      />
    </div>
  );
};

export default TaskIndex;
