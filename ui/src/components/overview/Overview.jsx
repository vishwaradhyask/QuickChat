import * as React from 'react';
import { useDispatch, useSelector } from "react-redux"
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import SendIcon from '@mui/icons-material/Send';

import Editore from '../common/EditerRich'
import Dailogeresponsive from '../common/Dailoge/Dailoge'
import LoadUsers from './loadUsers'
import { setProfiledata } from '../../reducers/loginReducer';
import Pop from './Pop'
import './overview.css'
import axios from 'axios';

const chats = []

const Overview = () => {
  const states = useSelector((state) => state)
  const [currentChat, setCurrentChat] = React.useState({})
  const [openAdduser, setOpenAddUser] = React.useState(false)
  const[newChat, setNewChat] = React.useState(null)
  const access = useSelector((state) => state.main.loginCredentials.access)
  const configs = useSelector((state) => state.main.profileData)
  const dispatch = useDispatch()

  React.useEffect(() => {
    handlegetCurrentUserDetails()
    if(chats.length > 0) setCurrentChat(chats[0])
  }, [])

  const handlegetCurrentUserDetails = () => {
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

  const handleClickadd = () => {
    setOpenAddUser(true)
  }

  console.log('status at overview status: ', states)
  console.log('status at overview currentChat: ', currentChat)
  console.log('status at overview openAdduser: ', openAdduser)
  console.log('status at overview newChat: ', newChat)

  const handleAddConfig = () => {
    let tmpdata = [...configs]
    tmpdata.push({
      id: "",
      distance_base_price: [
        {
          price: 0,
          week_days: [],
          up_to: 0,
        },
      ],
      distance_additional_price: 0,
      updatedOn: "2024-02-19T09:28:03.952284Z",
      waiting_price: 0,
      multiple_factor_time: "1x",
      default: false,
      changed_by_id: "",
    });
    dispatch(setProfiledata(tmpdata))
  }

  return (
    <div className="overview-body">
      <Box style={{ width: "100%" }}>
        <Box>
          <Box>
            <Button onClick={() => {handleAddConfig()}}>Add Config</Button>
            <Pop />
          </Box>
        </Box>
        <Box>
          {configs && configs.length > 0 ? (
            configs.map((c, i) => (
              <LoadUsers key={c.id} propData={c} index={i} />
            ))
            ): null}
        </Box>
      </Box>
    </div>
  );
}





export default Overview