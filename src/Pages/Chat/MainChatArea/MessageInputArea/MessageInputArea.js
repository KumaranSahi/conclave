import classes from './MessageInputArea.module.css'

const MessageInputArea=()=>{
    return(
        <div className={classes["message-input-area"]}>
            <textarea
                className={classes['textarea']}
                placeholder="Type text here"
            ></textarea>
            <button className={`${classes["button-solid"]} ${classes["button-primary"]}`}>
                Send
            </button>
        </div>
    )
}

export default MessageInputArea;