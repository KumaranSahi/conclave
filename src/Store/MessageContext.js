import {useContext,createContext,useRef,useEffect} from 'react';
import {io} from 'socket.io-client'
import { warningToast } from '../UI/Toast/Toast';
import {useAuth} from './AuthContext'
import {useHistory} from 'react-router-dom'
import { useReducer } from 'react';

export const MessageContext=createContext()

export const useMessage=()=>useContext(MessageContext)

export const MessageContextProvider=({children})=>{
    const {userId}=useAuth()
    const {push}=useHistory()

    const socket=useRef(io("ws://localhost:8080",{
        transports:[ "websocket","polling"],
    }))

    const messageManipulation=(state,action)=>{
        switch (action.type) {
            case "ADD_MESSAGES_ACTION":
                return({
                    ...state,
                    messages:[...action.payload]
                })
            case "UPDATE_CURRENT_CONCLAVE":
                return({
                    ...state,
                    currentConclave:action.payload
                })
            case "REMOVE_CURRENT_CONCLAVE":
                return({
                    ...state,
                    currentConclave:null
                })
            case "ADD_REPLY_MESSAGE":
                return({
                    ...state,
                    replyMessage:action.payload
                })
            case "REMOVE_REPLY_MESSAGE":
                return({
                    ...state,
                    replyMessage:null
                })    
            
            default:
                return state
        }
    }

    const joinConclave=(conclaveId)=>{
        dispatch({
            type:"UPDATE_CURRENT_CONCLAVE",
            payload:conclaveId
        })
        socket.current.emit("join-conclave",{
            conclaveId:conclaveId,
            userId:userId
        })
    }

    const sendMessage=(content)=>{
        socket.current.emit("send-message",{
            conclaveId:state.currentConclave,
            content:content,
            userId:userId
        })
    }

    const sendReply=(content)=>{
        socket.current.emit("send-reply",{
            conclaveId:state.currentConclave,
            content:content,
            replyId:state.replyMessage,
            userId:userId
        })
        dispatch({
            type:"REMOVE_REPLY_MESSAGE"
        })
    }

    const leaveConclave=()=>{
        socket.current.emit("leave-conclave",{
            userId:userId
        })
        dispatch({
            type:"REMOVE_CURRENT_CONCLAVE"
        })
    }

    useEffect(()=>{
        socket.current.on("room-joined",({ok,messages})=>{
            console.log(messages)
            if(!ok){
                warningToast("Failed to join room")
                push("/")
            }else{
                dispatch({
                    type:"ADD_MESSAGES_ACTION",
                    payload:[...messages]
                })
            }
        })
    },[socket])

    const [state,dispatch]=useReducer(messageManipulation,{
        messages:[],
        currentConclave:null,
        replyMessage:null
    })

    return(
        <MessageContext.Provider value={{
            joinConclave:joinConclave,
            messages:state.messages,
            sendMessage:sendMessage,
            dispatch:dispatch,
            replyMessage:state.replyMessage,
            sendReply:sendReply,
            leaveConclave:leaveConclave
        }}>
            {children}
        </MessageContext.Provider>
    )
}