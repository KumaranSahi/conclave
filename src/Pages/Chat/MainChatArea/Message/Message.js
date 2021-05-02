import classes from './Message.module.css'
import Default from '../../../../Assets/default.png'
import {format} from 'timeago.js'
import {useState} from 'react'
import {Menu,MenuItem} from '@material-ui/core'
import {useMessage} from  '../../../../Store/MessageContext'
import {useAuth} from '../../../../Store/AuthContext'

const Message=({id,userId:messageUserId,own,name,content,createdAt,image})=>{
    const [anchorEl, setAnchorEl] = useState(null);

    const {dispatch,currentConclave,muteClicked}=useMessage()
    const {userId}=useAuth()

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const replyClicked=()=>{
        dispatch({
            type:"ADD_REPLY_MESSAGE",
            payload:id
        })
        handleClose()
    }

    const handleClose = () => {
        setAnchorEl(null);
    };
    return(
        <>
            <div className={own?`${classes["message"]} ${classes["own-message"]}`:classes["message"]} onClick={handleClick}>
                {!own&&<img
                    src={image?image:Default}
                    alt="profile"
                    className={classes["profile-picture"]}
                />}
                <div className={classes["message-container"]}>
                    <div>
                    <span className={classes["sender-name"]}>{name}</span>
                    <span className={classes["sent-time"]}>{format(createdAt)}</span> 
                    </div>
                    <p className={classes["message-text"]}>
                        {content}
                    </p>
                </div>
            </div>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={replyClicked}>Reply</MenuItem>
                {userId===currentConclave?.admin&&
                !own&&<MenuItem onClick={()=>{muteClicked(messageUserId)
                handleClose()}}>
                    Mute
                </MenuItem>}
            </Menu>
        </>
    )
}

export default Message;