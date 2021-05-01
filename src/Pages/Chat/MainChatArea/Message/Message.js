import classes from './Message.module.css'
import janeDoe from '../../../../Assets/Jane Doe.jpg'

const Message=({own})=>{
    return(
        <div className={own?`${classes["message"]} ${classes["own-message"]}`:classes["message"]}>
            {!own&&<img
                src={janeDoe}
                alt="profile"
                className={classes["profile-picture"]}
            />}
            <div className={classes["message-container"]}>
                <div>
                   <span className={classes["sender-name"]}>Jane Doe</span>
                   <span className={classes["sent-time"]}>(1 hour ago)</span> 
                </div>
                <p className={classes["message-text"]}>
                    Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
                </p>
            </div>
        </div>
    )
}

export default Message;