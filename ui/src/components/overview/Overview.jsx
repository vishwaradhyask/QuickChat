import * as React from 'react';
import { useSelector } from "react-redux"
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

import './overview.css'

const chats = [
  {
    "id": 1,
    "name": "Vishwaraddhya SK",
    "email": "skvishwaradhya@gmail.com",
  },
  {
    "id": 2,
    "name": "vishalu sk",
    "email": "skvishalu@gmail.com",
  }
]

const Overview = () => {
  const states = useSelector((state) => state)
  const [currentChat, setCurrentChat] = React.useState({})
  console.log('state@home:', states)

  React.useEffect(() => {
    setCurrentChat(chats[0])
  }, [])

  const handleClickuser = (user) => {
    console.log('user selected for chat is')
  }

  return (
    <div className='overview-body'>
      <div className='left-panel'>
        <div className="left-side">

          {/* headr */}
          <div>
            <h3 style={{ margin: 'unset' }} >
              Chats
            </h3>
          </div>
          <div>
            <Button variant="text"> <AddCircleOutlineIcon /></Button>
          </div>
        </div>
        {/* body */}
        <div>
          <Stack direction="column" spacing={1}>
            {chats.map((c) => {
              return (
                <Tooltip sx={{ display: 'flex' }} title={`${c.name} [${c.email}]`}>
                  <Button onClick={() => { setCurrentChat(c) }} style={{ justifyContent: 'start' }}>
                    <Avatar sx={{ width: '32px', height: '32px', marginRight: '5px' }} alt={c.name} src="/static/images/avatar/1.jpg" />
                    <Typography style={{ fontSize: '12px', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }} variant="h6">{c.name} [{c.email}]</Typography>
                  </Button>
                </Tooltip>
              )
            })}
          </Stack>
        </div>
      </div>
      <div className='chat-body'>
        <div className='chat-haed'>
          <Avatar sx={{ width: '32px', height: '32px', marginRight: '5px' }} alt={currentChat.name} src="/static/images/avatar/1.jpg" />
          <Typography variant="h6">{currentChat.name}</Typography>
        </div>
        <div className='chat-content'>

        </div>
        <div className='chat-bottom'>
          <Editore style={{ width: '95%' }} />
          <SendIcon style={{ margin: '10px' }} />
        </div>
      </div>
    </div>
  )
}

export default Overview