import classes from './MainChatArea.module.css'
import Message from './Message/Message'
import MessageInputArea from './MessageInputArea/MessageInputArea'
import Reply from './Reply/Reply'
import {useMessage} from '../../../Store/MessageContext'
import {useAuth} from '../../../Store/AuthContext'

const MainChatArea=()=>{
    const {messages}=useMessage()
    const {userId}=useAuth()
    return(
        <div className={classes["chat-area"]}>
            <div className={classes["message-area"]}>
                {
                    messages?.map(({_id,by:{_id:id,name},content,createdAt,responseOf})=>responseOf?
                    (
                        <Reply
                            key={_id}
                            id={_id}
                            primaryMessageUserName={name}
                            own={id==userId}
                            primaryMessagecontent={content}
                            primaryMessageCreatedAt={createdAt}
                            secondaryMessageContent={responseOf.content}
                            secondaryMessageCreatedAt={responseOf.createdAt}
                            secondaryMessageUserName={responseOf.by.name}
                        />
                    )     
                    :(
                        <Message
                            key={_id}
                            id={_id}
                            name={name}
                            own={id==userId}
                            content={content}
                            createdAt={createdAt}
                        />
                    ))
                }
            </div>
            <div className={classes["textbox"]}>
                <MessageInputArea/>
            </div>
        </div>
    )
}

export default MainChatArea;