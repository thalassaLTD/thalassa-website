import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { DatePicker } from '@mui/lab';
// import DatePicker from '@mui/x-date-pickers';

const events = [
  { date: new Date('2022-12-25'), title: 'Christmas Day' },
  { date: new Date('2023-01-01'), title: 'New Year\'s Day' },
  { date: new Date('2023-02-14'), title: 'Valentine\'s Day' },
  { date: new Date('2023-03-17'), title: 'St. Patrick\'s Day' },
];

const CalendarWithEvents = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const renderEventList = () => {
    const filteredEvents = events.filter(event => event.date.toDateString() === selectedDate.toDateString());
    return (
      <Box mt={1}>
        {filteredEvents.length > 0 ?
          filteredEvents.map((event, index) => (
            <Typography key={index}>{event.title}</Typography>
          ))
          :
          <Typography>No events on this day.</Typography>
        }
      </Box>
    );
  };

  return (
    <Box>
      <DatePicker
        variant="inline"
        label="Calendar"
        value={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        inputVariant="outlined"
        InputProps={{
          endAdornment: (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CalendarTodayIcon sx={{ color: 'text.secondary' }} />
            </Box>
          ),
        }}
      />
      {selectedDate && renderEventList()}
    </Box>
  );
};

export default CalendarWithEvents;
