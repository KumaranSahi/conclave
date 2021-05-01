import classes from './Reply.module.css'
import janeDoe from '../../../../Assets/Jane Doe.jpg'

const Reply=({own,secondaryMessage,primaryMessage,replierName,senderName})=>{
    return(
        <div className={own?`${classes["reply-message"]} ${classes["own-reply-message"]}`:classes["reply-message"]}>
            <div className={classes["reply-container"]}>
                <div className={own?`${classes["secondary-message"]} ${classes["own-reply"]}`:classes["secondary-message"]}>
                    <div>
                    <span className={classes["sender-name"]}>{replierName}</span>
                    <span className={classes["sent-time"]}>(1 hour ago)</span> 
                    </div>
                    <p className={classes["message-text"]}>
                        {secondaryMessage}
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
                            <span className={classes["sender-name"]}>{senderName}</span>
                            <span className={classes["sent-time"]}>(1 hour ago)</span> 
                        </div>
                        <p className={classes["message-text"]}>
                            {primaryMessage}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Reply;