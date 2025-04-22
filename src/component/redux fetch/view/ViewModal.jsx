import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Grid,
  Paper,
  Box,
  Chip
} from '@mui/material';
import DateAndTime from '../../../utils/DateAndTime';
import { getPriorityStyle, getStatusStyle } from '../../../utils/commen';

const ViewModal = ({ open, onClose, item }) => {
  if (!item) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Task Details</DialogTitle>
      <DialogContent>
        <Paper elevation={1} sx={{ p: 3 }}>
          <Grid container spacing={2} columns={{ xs: 12, sm: 12, md: 12 }}>
            <Grid>
              <Typography variant="h5" gutterBottom>
                {item.title}
              </Typography>
            </Grid>

            <Grid>
              <Typography variant="body1" >
                {item.description}
              </Typography>
            </Grid>

            <Grid>
              <Typography variant="subtitle2" color="textSecondary">
                Status
              </Typography>
              <Box mt={1}>
                <Chip
                  label={item.status}
                  style={{
                    ...getStatusStyle(item.status),
                    fontWeight: 'bold'
                  }}
                />
              </Box>
            </Grid>

            <Grid>
              <Typography variant="subtitle2" color="textSecondary">
                Priority
              </Typography>
              <Box mt={1}>
                <Chip
                  label={item.priority}
                  style={{
                    ...getPriorityStyle(item.priority),
                    fontWeight: 'bold'
                  }}
                />
              </Box>
            </Grid>

            <Grid>
              <Typography variant="subtitle2" color="textSecondary">
                Task ID
              </Typography>
              <Typography variant="body2">
                {item._id}
              </Typography>
            </Grid>

            <Grid>
              <Typography variant="subtitle2" color="textSecondary">
                Due Date
              </Typography>
              <Typography variant="body2">
                <DateAndTime dateString={item.dueDate} />
              </Typography>
            </Grid>

            <Grid>
              <Typography variant="subtitle2" color="textSecondary">
                Created Date
              </Typography>
              <Typography variant="body2">
                <DateAndTime dateString={item.createdDate} />
              </Typography>
            </Grid>
          </Grid>

        </Paper>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewModal;