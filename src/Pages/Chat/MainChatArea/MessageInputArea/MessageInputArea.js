import classes from './MessageInputArea.module.css'
import {useMessage} from '../../../../Store/MessageContext';
import {useState} from 'react'

const MessageInputArea=()=>{
    const {sendMessage}=useMessage()
    const [content,setContent]=useState("")

    const sendClicked=()=>{
        if(content.length>0)
            sendMessage(content)
    }

    return(
        <div className={classes["message-input-area"]}>
            <textarea
                className={classes['textarea']}
                placeholder="Type text here"
                value={content}
                onChange={event=>setContent(event.target.value)}
            ></textarea>
            <button type="submit" className={`${classes["button-solid"]} ${classes["button-primary"]}`} onClick={sendClicked}>
                Send
            </button>
        </div>
    )
}

export default MessageInputArea;