import classes from './Chat.module.css'
import MainChatArea from './MainChatArea/MainChatArea'
import {ChatStats} from '../../Components'
import {useLocation} from 'react-router-dom'

const Chat=()=>{
    const {search}=useLocation()
    console.log(search)
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