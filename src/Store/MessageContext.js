import {useContext,createContext,useRef,useEffect} from 'react';
import {io} from 'socket.io-client'
import { warningToast } from '../UI/Toast/Toast';
import {useAuth} from './AuthContext'
import {useConclave} from './ConclaveContext'
import {useHistory} from 'react-router-dom'
import { useReducer } from 'react';

export const MessageContext=createContext()

export const useMessage=()=>useContext(MessageContext)

export const MessageContextProvider=({children})=>{
    const {userId}=useAuth()
    const {conclaves}=useConclave()
    const {push}=useHistory()

    const socket=useRef(io("ws://localhost:8080",{
        transports:[ "websocket","polling"],
    }))

    const messageManipulation=(state,action)=>{
        switch (action.type) {
            case "ADD_MESSAGES_ACTION":
                return({
                    ...state,
                    messages:[...action.payload.messages],
                    users:[...action.payload.users]
                })
            case "REMOVE_USER":
                return({
                    ...state,
                    users:[...action.payload]
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
        const conclave=conclaves.filter(({_id})=>_id==conclaveId)[0]
        dispatch({
            type:"UPDATE_CURRENT_CONCLAVE",
            payload:conclave
        })
        socket.current.emit("join-conclave",{
            conclaveId:conclaveId,
            userId:userId
        })
    }

    const sendMessage=(content)=>{
        socket.current.emit("send-message",{
            conclaveId:state.currentConclave._id,
            content:content,
            userId:userId
        })
    }

    const sendReply=(content)=>{
        socket.current.emit("send-reply",{
            conclaveId:state.currentConclave._id,
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
        socket.current.on("room-joined",({ok,messages,users})=>{
            if(!ok){
                warningToast("Failed to join room")
                push("/")
            }else{
                dispatch({
                    type:"ADD_MESSAGES_ACTION",
                    payload:{messages:[...messages],users:[...users]}
                })
            }
        })
    },[socket])

    useEffect(()=>{
        socket.current.on("user-left",({ok,users})=>{
            if(ok){
                dispatch({
                    type:"REMOVE_USER",
                    payload:[...users]
                })
            }
        })
    },[socket])

    const [state,dispatch]=useReducer(messageManipulation,{
        messages:[],
        users:[],
        currentConclave:null,
        replyMessage:null
    })

    return(
        <MessageContext.Provider value={{
            joinConclave:joinConclave,
            messages:state.messages,
            users:state.users,
            sendMessage:sendMessage,
            dispatch:dispatch,
            replyMessage:state.replyMessage,
            sendReply:sendReply,
            currentConclave:state.currentConclave,
            leaveConclave:leaveConclave
        }}>
            {children}
        </MessageContext.Provider>
    )
}