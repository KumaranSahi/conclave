import classes from './MainChatArea.module.css'
import Message from './Message/Message'
import MessageInputArea from './MessageInputArea/MessageInputArea'
import Reply from './Reply/Reply'
import {useMessage} from '../../../Store/MessageContext'
import {useAuth} from '../../../Store/AuthContext'
import {createRef, useEffect} from 'react'

const MainChatArea=({active})=>{
    const {messages,allowTalking}=useMessage()
    const {userId}=useAuth()
    const scrollRef=createRef()
    useEffect(()=>{
        scrollRef?.current?.scrollIntoView({behaviour:"smooth"})
    },[messages])
    return(
        <div className={classes["chat-area"]}>
            <div className={classes["message-area"]}>
                {
                    messages?.map(({_id,by:{_id:id,name,image},content,createdAt,responseOf})=>responseOf?
                    (
                        <Reply
                            key={_id}
                            id={_id}
                            image={image}
                            primaryMessageUserName={name}
                            own={id===userId}
                            primaryMessagecontent={content}
                            primaryMessageCreatedAt={createdAt}
                            secondaryMessageContent={responseOf.content}
                            secondaryMessageCreatedAt={responseOf.createdAt}
                            secondaryMessageUserName={responseOf.by.name}
                        />
                    )     
                    :(
                        <div ref={scrollRef} key={_id}>
                            <Message
                                id={_id}
                                name={name}
                                image={image}
                                own={id===userId}
                                content={content}
                                createdAt={createdAt}
                            />
                        </div>
                    ))
                }
            </div>
            {allowTalking && active &&
            <div className={classes["textbox"]}>
                <MessageInputArea/>
            </div>}
        </div>
    )
}

export default MainChatArea;