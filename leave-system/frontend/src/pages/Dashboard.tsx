import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  TextField,
  MenuItem,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert,
  Snackbar
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import api from '../services/api';

const Dashboard: React.FC = () => {
  const [leaves, setLeaves] = useState<any[]>([]);
  const [newLeave, setNewLeave] = useState({
    type: 'casual',
    startDate: new Date(),
    endDate: new Date(),
    reason: '',
  });
  const [notification, setNotification] = useState({ open: false, message: '', isError: false });

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    try {
      const response = await api.get(`/leaves/user/${user._id}`);
      setLeaves(response.data);
    } catch (error) {
      console.error('Error fetching leaves:', error);
      setNotification({
        open: true,
        message: 'Error fetching leaves',
        isError: true
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post('/leaves', {
        ...newLeave,
        userId: user._id,
      });
      
      fetchLeaves();
      
      // Show success message based on leave status
      const status = response.data.status;
      const leaveType = response.data.type;
      let message = '';
      
      if (leaveType === 'sick') {
        message = 'Sick leave has been automatically approved';
      } else {
        message = status === 'approved' 
          ? 'Leave request has been approved!' 
          : 'Leave request has been rejected.';
      }
      
      setNotification({
        open: true,
        message,
        isError: status === 'rejected'
      });

      // Reset form
      setNewLeave({
        type: 'casual',
        startDate: new Date(),
        endDate: new Date(),
        reason: '',
      });
    } catch (error) {
      console.error('Error submitting leave:', error);
      setNotification({
        open: true,
        message: 'Error submitting leave request',
        isError: true
      });
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'approved' ? 'success.main' : 'error.main';
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Container>
        <Box sx={{ mt: 4 }}>
          <Typography variant="h4" gutterBottom>
            Leave Management Dashboard
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Apply for Leave
                </Typography>
                <Box component="form" onSubmit={handleSubmit}>
                  <TextField
                    select
                    fullWidth
                    label="Leave Type"
                    value={newLeave.type}
                    onChange={(e) => setNewLeave({ ...newLeave, type: e.target.value })}
                    sx={{ mb: 2 }}
                  >
                    <MenuItem value="sick">Sick Leave (Always Approved)</MenuItem>
                    <MenuItem value="casual">Casual Leave</MenuItem>
                    <MenuItem value="annual">Annual Leave</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </TextField>

                  <DatePicker
                    label="Start Date"
                    value={newLeave.startDate}
                    onChange={(date) => setNewLeave({ ...newLeave, startDate: date || new Date() })}
                    sx={{ mb: 2, width: '100%' }}
                  />

                  <DatePicker
                    label="End Date"
                    value={newLeave.endDate}
                    onChange={(date) => setNewLeave({ ...newLeave, endDate: date || new Date() })}
                    sx={{ mb: 2, width: '100%' }}
                  />

                  <TextField
                    fullWidth
                    label="Reason"
                    multiline
                    rows={4}
                    value={newLeave.reason}
                    onChange={(e) => setNewLeave({ ...newLeave, reason: e.target.value })}
                    sx={{ mb: 2 }}
                    required
                  />

                  <Button type="submit" variant="contained" fullWidth>
                    Submit Leave Request
                  </Button>
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Leave History
                </Typography>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Type</TableCell>
                        <TableCell>Start Date</TableCell>
                        <TableCell>End Date</TableCell>
                        <TableCell>Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {leaves.map((leave) => (
                        <TableRow key={leave._id}>
                          <TableCell>{leave.type}</TableCell>
                          <TableCell>
                            {new Date(leave.startDate).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            {new Date(leave.endDate).toLocaleDateString()}
                          </TableCell>
                          <TableCell sx={{ color: getStatusColor(leave.status) }}>
                            {leave.status}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Grid>
          </Grid>
        </Box>

        <Snackbar
          open={notification.open}
          autoHideDuration={6000}
          onClose={() => setNotification({ ...notification, open: false })}
        >
          <Alert 
            onClose={() => setNotification({ ...notification, open: false })}
            severity={notification.isError ? "error" : "success"}
            sx={{ width: '100%' }}
          >
            {notification.message}
          </Alert>
        </Snackbar>
      </Container>
    </LocalizationProvider>
  );
};

export default Dashboard; 