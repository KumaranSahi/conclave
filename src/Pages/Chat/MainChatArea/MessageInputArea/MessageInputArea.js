import classes from './MessageInputArea.module.css'
import {useMessage} from '../../../../Store/MessageContext';
import {useState} from 'react'

const MessageInputArea=()=>{
    const {sendMessage,replyMessage,dispatch,sendReply}=useMessage()
    const [content,setContent]=useState("")

    const sendClicked=()=>{
        if(content.length>0)
            sendMessage(content)
    }

    const replyClicked=()=>{
        if(content.length>0)
            sendReply(content)
    }

    return(
        <div className={classes["message-input-area"]}>
            <textarea
                className={classes['textarea']}
                placeholder="Type text here"
                value={content}
                onChange={event=>setContent(event.target.value)}
            ></textarea>
            {replyMessage?
            <>
                <button className={`${classes["button-solid"]} ${classes["button-primary"]}`} onClick={replyClicked}>
                    Reply
                </button>
                <button className={`${classes["button-solid"]} ${classes["button-warning"]}`} onClick={()=>dispatch({type:"REMOVE_REPLY_MESSAGE"})}>
                    cancel
                </button>
            </>
            :<button className={`${classes["button-solid"]} ${classes["button-primary"]}`} onClick={sendClicked}>
                Send
            </button>}
        </div>
    )
}

export default MessageInputArea;