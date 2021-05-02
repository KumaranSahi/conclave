import classes from './Reply.module.css'
import Default from '../../../../Assets/default.png'
import {format} from 'timeago.js'
import {useState} from 'react'
import {Menu,MenuItem} from '@material-ui/core'
import {useMessage} from  '../../../../Store/MessageContext'
import {useAuth} from '../../../../Store/AuthContext'

const Reply=({id,image,userId:messageUserId,primaryMessageUserName,own,primaryMessagecontent,primaryMessageCreatedAt,secondaryMessageContent,secondaryMessageCreatedAt,secondaryMessageUserName})=>{
    const [anchorEl, setAnchorEl] = useState(null);

    const {dispatch,currentConclave,muteClicked}=useMessage()
    const {userId}=useAuth()

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        dispatch({
            type:"ADD_REPLY_MESSAGE",
            payload:id
        })
        setAnchorEl(null);
    };
    
    const replyClicked=()=>{
        dispatch({
            type:"ADD_REPLY_MESSAGE",
            payload:id
        })
        handleClose()
    }

    return(
        <div className={own?`${classes["reply-message"]} ${classes["own-reply-message"]}`:classes["reply-message"]}>
            <div className={classes["reply-container"]}>
                <div className={own?`${classes["secondary-message"]} ${classes["own-reply"]}`:classes["secondary-message"]}>
                    <div>
                    <span className={classes["sender-name"]}>{secondaryMessageUserName}</span>
                    <span className={classes["sent-time"]}>{format(secondaryMessageCreatedAt)}</span> 
                    </div>
                    <p className={classes["message-text"]}>
                        {secondaryMessageContent}
                    </p>
                </div>
                <div className={classes["primary-message"]}>
                    {!own&&<img
                        src={image?image:Default}
                        alt="profile"
                        className={classes["profile-picture"]}
                    />}
                    <div className={classes["message-container"]} onClick={handleClick}>
                        <div>
                            <span className={classes["sender-name"]}>{primaryMessageUserName}</span>
                            <span className={classes["sent-time"]}>{format(primaryMessageCreatedAt)}</span> 
                        </div>
                        <p className={classes["message-text"]}>
                            {primaryMessagecontent}
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
                        handleClose()}}>Mute
                    </MenuItem>}
                </Menu>
            </div>
        </div>
    )

}

export default Reply;