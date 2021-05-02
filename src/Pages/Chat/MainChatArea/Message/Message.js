import classes from './Message.module.css'
import janeDoe from '../../../../Assets/Jane Doe.jpg'
import {format} from 'timeago.js'
import {useState} from 'react'
import {Menu,MenuItem} from '@material-ui/core'
import {useMessage} from  '../../../../Store/MessageContext'

const Message=({id,own,name,content,createdAt})=>{
    const [anchorEl, setAnchorEl] = useState(null);

    const {dispatch}=useMessage()

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
                    src={janeDoe}
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
            </Menu>
        </>
    )
}

export default Message;