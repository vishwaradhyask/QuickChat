import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export default function ResponsiveDialog({title, open, handleClose, body, handleOkClick, okText, cancelText, showCancelBtn}) {
//   const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleCloseLcal = () => {
    handleClose()
  };

  return (
    <React.Fragment>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleCloseLcal}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {title ? title : "Dialog"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{body ? body : ""}</DialogContentText>
        </DialogContent>
        <DialogActions>
          {showCancelBtn ? (
            <Button onClick={() => handleOkClick()} autoFocus>
              {okText ? okText : "Ok"}
            </Button>
          ) : null}
          <Button autoFocus onClick={handleCloseLcal}>
            {cancelText ? cancelText : "Cancel"}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}