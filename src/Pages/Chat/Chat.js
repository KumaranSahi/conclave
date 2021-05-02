import classes from './Chat.module.css'
import MainChatArea from './MainChatArea/MainChatArea'
import {ChatStats} from '../../Components'
import {useLocation} from 'react-router-dom'
import { useEffect } from 'react'
import {useMessage} from '../../Store/MessageContext'
import {useConclave} from '../../Store/ConclaveContext'

const Chat=()=>{
    const {search}=useLocation()
    const {conclaves}=useConclave()
    const {joinConclave,leaveConclave}=useMessage()                                     

    const conclave=conclaves?.filter(({_id})=>_id.toString()===search.substring(1))[0]

    useEffect(()=>{ 
        search && joinConclave(conclave)
    },[search,conclaves])

    useEffect(()=>{
        return ()=>leaveConclave()
    },[])

    return(
            <div className={classes["chat-section"]}>
                <div className={classes["main-chat-area"]}>
                    <MainChatArea active={conclave.active}/>
                </div>
                <div className={classes["chat-stats"]}>
                    <ChatStats/>
                </div>
            </div>
    )
}

export default Chat;