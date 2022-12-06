import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const vertical = 'top'
const horizontal = 'right'

export default function AlertMessage({ props }: any) {
  const [open, setOpen] = React.useState(true);


  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>

      <Snackbar anchorOrigin={{ vertical, horizontal }} open={open} autoHideDuration={props.time} onClose={handleClose}>
        <Alert onClose={handleClose} severity={props.aletTypes} sx={{ width: '100%' }}>
          {props.message}
        </Alert>
      </Snackbar>

    </Stack>
  );
}