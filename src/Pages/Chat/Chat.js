import classes from './Chat.module.css'
import MainChatArea from './MainChatArea/MainChatArea'
import {ChatStats} from '../../Components'
import {useLocation} from 'react-router-dom'
import { useEffect } from 'react'
import {useMessage} from '../../Store/MessageContext'

const Chat=()=>{
    const {search}=useLocation()
    const {joinConclave,leaveConclave}=useMessage()

    useEffect(()=>{
        search && joinConclave(search.substring(1))
    },[search])

    useEffect(()=>{
        return ()=>leaveConclave()
    },[])

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