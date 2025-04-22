import React, { useState } from 'react';
import { Box, Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const TaskFilters = ({ onFilterChange }) => {
    const [statusFilter, setStatusFilter] = useState('all');
    const [priorityFilter, setPriorityFilter] = useState('all');
  
    const handleFilterChange = (newStatus, newPriority) => {
      onFilterChange({ status: newStatus, priority: newPriority });
    };
  
    const handleStatusChange = (event) => {
      const status = event.target.value;
      setStatusFilter(status);
      handleFilterChange(status, priorityFilter);
    };
  
    const handlePriorityChange = (event) => {
      const priority = event.target.value;
      setPriorityFilter(priority);
      handleFilterChange(statusFilter, priority);
    };
  
    const resetTaskFilter = () => {
      setStatusFilter('all');
      setPriorityFilter('all');
      handleFilterChange('all', 'all');
    };

  return (
    <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
      <FormControl sx={{ minWidth: 200 }}>
        <InputLabel>Filter by Status</InputLabel>
        <Select
          label="Filter by Status"
          value={statusFilter}
          onChange={handleStatusChange}
        >
          <MenuItem value="all">All Statuses</MenuItem>
          <MenuItem value="Todo">Todo</MenuItem>
          <MenuItem value="InProgress">In Progress</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
        </Select>
      </FormControl>
      
      <FormControl sx={{ minWidth: 200 }}>
        <InputLabel>Filter by Priority</InputLabel>
        <Select
          label="Filter by Priority"
          value={priorityFilter}
          onChange={handlePriorityChange}
        >
          <MenuItem value="all">All Priorities</MenuItem>
          <MenuItem value="Low">Low</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="High">High</MenuItem>
        </Select>
      </FormControl>

      <Button variant="contained" onClick={resetTaskFilter}>Reset</Button>
    </Box>
  );
};

export default TaskFilters;