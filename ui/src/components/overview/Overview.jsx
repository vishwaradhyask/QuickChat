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

import './overview.css'
import axios from 'axios';

const chats = []

const Overview = () => {
  const states = useSelector((state) => state)
  const [currentChat, setCurrentChat] = React.useState({})
  const [openAdduser, setOpenAddUser] = React.useState(false)
  const[newChat, setNewChat] = React.useState(null)
  const access = useSelector((state) => state.main.loginCredentials.access)
  const dispatch = useDispatch()

  React.useEffect(() => {
    handlegetCurrentUserDetails()
    if(chats.length > 0) setCurrentChat(chats[0])
  }, [])

  const handlegetCurrentUserDetails = () => {
    axios
      .get("api/users/", {
        params: { param: "current" },
        headers: {
          Authorization: `Bearer ${access}`,
        },
      })
      .then((res) => {
        if (res.status === 200 && res.data.message === "Alive") {
          console.log("got user data is: ", res.data.body);
          dispatch(setProfiledata(res.data.body))
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

  return (
    <div className="overview-body">
      <Dailogeresponsive
        title="Add New User"
        handleClose={() => {
          setOpenAddUser(false);
        }}
        open={openAdduser}
        body={
          <div>
            <div style={{ margin: "10px" }}>
              <LoadUsers 
                getSelectedUserForChat={(user) => {setNewChat(user)}}
              />
            </div>
          </div>
        }
        showCancelBtn={true}
        handleOkClick={() => {
          setOpenAddUser(false);
        }}
        okText={"Ok"}
        cancelText={"Cancel"}
      />
      <div className="left-panel">
        <div className="left-side">
          {/* headr */}
          <div>
            <h3 style={{ margin: "unset" }}>Chats</h3>
          </div>
          <div>
            <Button onClick={handleClickadd} variant="text">
              {" "}
              <AddCircleOutlineIcon />
            </Button>
          </div>
        </div>
        {/* body */}
        <div>
          <Stack direction="column" spacing={1}>
            {chats.map((c) => {
              return (
                <Tooltip
                  sx={{ display: "flex" }}
                  title={`${c.name} [${c.email}]`}
                >
                  <Button
                    onClick={() => {
                      setCurrentChat(c);
                    }}
                    style={{ justifyContent: "start" }}
                  >
                    <Avatar
                      sx={{ width: "32px", height: "32px", marginRight: "5px" }}
                      alt={c.name}
                      src="/static/images/avatar/1.jpg"
                    />
                    <Typography
                      style={{
                        fontSize: "12px",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                      }}
                      variant="h6"
                    >
                      {c.name} [{c.email}]
                    </Typography>
                  </Button>
                </Tooltip>
              );
            })}
          </Stack>
        </div>
      </div>
      <div className="chat-body">
        <div className="chat-haed">
          <Avatar
            sx={{ width: "32px", height: "32px", marginRight: "5px" }}
            alt={currentChat.name}
            src="/static/images/avatar/1.jpg"
          />
          <Typography variant="h6">{currentChat.name}</Typography>
        </div>
        <div className="chat-content"></div>
        <div className="chat-bottom">
          <Editore style={{ width: "95%" }} />
          <SendIcon style={{ margin: "10px" }} />
        </div>
      </div>
    </div>
  );
}

export default Overview