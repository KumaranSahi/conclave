import classes from './Reply.module.css'
import janeDoe from '../../../../Assets/Jane Doe.jpg'
import {format} from 'timeago.js'

const Reply=({id,primaryMessageUserName,own,primaryMessagecontent,primaryMessageCreatedAt,secondaryMessageContent,secondaryMessageCreatedAt,secondaryMessageUserName})=>{
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
                        src={janeDoe}
                        alt="profile"
                        className={classes["profile-picture"]}
                    />}
                    <div className={classes["message-container"]}>
                        <div>
                            <span className={classes["sender-name"]}>{primaryMessageUserName}</span>
                            <span className={classes["sent-time"]}>{format(primaryMessageCreatedAt)}</span> 
                        </div>
                        <p className={classes["message-text"]}>
                            {primaryMessagecontent}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Reply;