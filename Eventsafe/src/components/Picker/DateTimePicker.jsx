import * as React from 'react';
import { TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';

export default function DateTimePickerComponent() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div style={{ color: 'black', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ fontSize: '14px', marginRight: '5px' }}>Start:</p>
        <DateTimePicker
          slotProps={{
            openPickerButton: { sx: { color: 'black' } },
            textField: () => ({
              size: 'small',
              color: 'success',
              InputProps: { style: { color: 'black' } },
              sx: { width: '100%', margin: 'auto' }
            }),
          }}
          viewRenderers={{
            hours: renderTimeViewClock,
            minutes: renderTimeViewClock,
            seconds: renderTimeViewClock,
          }}
        />
      </div>

      <div style={{ color: 'black', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '2px' }}>
        <p style={{ fontSize: '14px', marginRight: '12px' }} >End: </p>
        <DateTimePicker
          slotProps={{
            openPickerButton: { sx: { color: 'black' } },
            textField: () => ({
              size: 'small',
              color: 'success',
              InputProps: { style: { color: 'black' } },
            }),
          }}
          viewRenderers={{
            hours: renderTimeViewClock,
            minutes: renderTimeViewClock,
            seconds: renderTimeViewClock,
          }}
        />
      </div>
    </LocalizationProvider>
  );
}
