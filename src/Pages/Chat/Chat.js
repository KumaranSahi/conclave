import classes from './Chat.module.css'
import MainChatArea from './MainChatArea/MainChatArea'
import {ChatStats} from '../../Components'

const Chat=()=>{
    return(
        <div className={classes["chat-section"]}>
            <div className={classes["main-chat-area"]}>
                <MainChatArea/>
            </div>
            <div className={classes["chat-stats"]}>
                <ChatStats/>
            </div>
        </div>
    )
}

export default Chat;