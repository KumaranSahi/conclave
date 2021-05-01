import classes from './MainChatArea.module.css'
import Message from './Message/Message'
import MessageInputArea from './MessageInputArea/MessageInputArea'
import Reply from './Reply/Reply'

const MainChatArea=()=>{
    return(
        <div className={classes["chat-area"]}>
            <div className={classes["message-area"]}>
                <Message/>
                <Message/>
                <Reply/>
                <Message/>
                <Message/>
                <Message/>
                <Reply own/>
                <Message/>
                <Message/>
            </div>
            <div className={classes["textbox"]}>
                <MessageInputArea/>
            </div>
        </div>
    )
}

export default MainChatArea;