import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/material';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux"


export default function ResponsiveDialog() {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const access = useSelector((state) => state.main.loginCredentials.access)
  const[km, setkm] = React.useState(0)
  const[wt, setwt] = React.useState(0)
  const [totalPrice, setTotalPrice] = React.useState(0)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleGetBill = () => {
    axios({
      method: "post",
      url: "api/bill/",
      headers: { Authorization: `Bearer ${access}` },
      data: { wt: parseInt(wt), km: parseInt(km) },
      // params:{id: data.id}
    })
      .then((res) => {
        if (res.status === 200) {
          console.log("success", res);
          setTotalPrice(res.data.Total_price)
        }
      })
      .catch((e) => {
        console.log("error:", e);
      });
  }

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Get Bill
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Billing"}</DialogTitle>
        <DialogContent>
          <DialogContentText style={{margin: '10px'}}>
            <TextField
              required
              id="filled-required"
              label="Km"
              value={km}
              onChange={(e) => {
                if(parseInt(e.target.value))setkm(e.target.value)
              }}
            />
            <TextField
              required
              id="filled-required"
              label="waiting time"
              value={wt}
              onChange={(e) => {
                if(parseInt(e.target.value))setwt(e.target.value)
              }}
            />
            {totalPrice ? (
                <Box>
                    <h5>Toatal Price is $: {totalPrice}</h5>
                </Box>
            ):null}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Disagree
          </Button>
          <Button onClick={handleGetBill} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}