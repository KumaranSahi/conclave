import classes from './Message.module.css'
import janeDoe from '../../../../Assets/Jane Doe.jpg'
import {format} from 'timeago.js'

const Message=({own,name,content,createdAt})=>{
    return(
        <div className={own?`${classes["message"]} ${classes["own-message"]}`:classes["message"]}>
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
    )
}

export default Message;