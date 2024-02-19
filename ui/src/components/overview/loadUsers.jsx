import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux"
import { setProfiledata } from '../../reducers/loginReducer';


export default function AccordionUsage({propData, index}) {
  const label = { inputProps: { 'aria-label': 'Switch demo' } };
  const [data, setData] = React.useState({})
  const access = useSelector((state) => state.main.loginCredentials.access)
  const dispatch = useDispatch()

  // console.log(' data: ', data)
  React.useEffect(() => {
    setData(propData)
  }, [])

  const handleChangeInValue= (e, type, index) => {
    console.log(e.target.value, type, index)
    let value = e.target.value
    let tmpdata =structuredClone(data);
    if(type === "dbp-bp"){
      tmpdata.distance_base_price[index].price = value
    }else if(type === "dbp-wd"){
      tmpdata.distance_base_price[index].week_days = value
    }else if(type === "dbp-km"){
      tmpdata.distance_base_price[index].up_to = value
    }else if(type === "dap"){
      tmpdata.distance_additional_price = value
    }else if(type === "tmf"){
      tmpdata.multiple_factor_time = value
    }else if(type === "wc"){
      tmpdata.waiting_price = value
    }else if(type === "sw"){
      console.log('e.', e.target.checked)
      tmpdata.default = e.target.checked
    }
    setData(tmpdata)
  }

  const handleAddBase = () => {
    let tmpdata =structuredClone(data);
    tmpdata.distance_base_price.push({
      price: 0,
      week_days: [],
      up_to: 0,
    },)
    setData(tmpdata)
  }

  const update = () => {
    axios
      .get("api/prices/", {
        params: { param: "current" },
        headers: {
          Authorization: `Bearer ${access}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          console.log("got user data is: ", res);
          dispatch(setProfiledata(res.data))
        }
      })
      .catch((e) => {
        console.log("errror: ", e);
      });
  }

  const handleSave = () => {
    console.log('save for code: ', data)
    let meth = "post"
    if(data.id == ""){
      meth = "post"
    }else{
      meth = "put"
    }
    axios({
      method: meth,
      url: "api/prices/",
      headers: { Authorization: `Bearer ${access}` },
      data: data,
      params:{id: data.id}
    })
      .then((res) => {
        if (res.status === 200) {
          console.log("success");
          update()
        }
      })
      .catch((e) => {
        console.log("error:", e);
      });
  }

  return (
    <div style={{ width: "100%" }}>
      <Accordion sx={{ width: "100%" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <h3>Price config {index} </h3>
        </AccordionSummary>
        <AccordionDetails>
          <Box>
            <h4>
              Distance Base Price{" "}
              <Button
                onClick={() => {
                  handleAddBase();
                }}
              >
                Add one more Base Value
              </Button>
            </h4>
            {data.distance_base_price && data.distance_base_price.length > 0
              ? data.distance_base_price.map((d, i) => (
                  <Box sx={{ marginBottom: "10px" }}>
                    <TextField
                      onChange={(e) => {
                        handleChangeInValue(e, "dbp-bp", i);
                      }}
                      required
                      id="filled-required"
                      label="Base price"
                      value={d.price}
                    />
                    <TextField
                      required
                      id="filled-required"
                      label="Week Days from 1 to 7"
                      value={d.week_days}
                      onChange={(e) => {
                        handleChangeInValue(e, "dbp-wd", i);
                      }}
                    />
                    <TextField
                      required
                      id="filled-required"
                      label="Up To km"
                      value={d.up_to}
                      onChange={(e) => {
                        handleChangeInValue(e, "dbp-km", i);
                      }}
                    />
                  </Box>
                ))
              : null}
          </Box>
          <Box>
            <h4>Distance Additional Price</h4>
            <TextField
              required
              id="filled-required"
              label="Price"
              value={
                data.distance_additional_price
                  ? data.distance_additional_price
                  : 0
              }
              onChange={(e) => {
                handleChangeInValue(e, "dap");
              }}
            />
          </Box>
          <Box>
            <h4>Time Multiplier Factor</h4>
            <TextField
              required
              id="filled-required"
              value={
                data.multiple_factor_time ? data.multiple_factor_time : "1x"
              }
              label="Price"
              onChange={(e) => {
                handleChangeInValue(e, "tmf");
              }}
            />
          </Box>
          <Box>
            <h4>Waiting Charges after 3 min</h4>
            <TextField
              required
              id="filled-required"
              label="Price"
              value={data.waiting_price ? data.waiting_price : 0}
              onChange={(e) => {
                handleChangeInValue(e, "wc");
              }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h4>Use this Config</h4>
            <Switch
              {...label}
              onChange={(e) => {
                handleChangeInValue(e, "sw");
              }}
              checked={data.default}
            />
          </Box>
        </AccordionDetails>
        <AccordionActions>
          <Button>Cancel</Button>
          <Button onClick={() => handleSave()} >Save</Button>
        </AccordionActions>
      </Accordion>
    </div>
  );
}