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
                
        
            default:
                return state
        }
    }

    const joinConclave=(conclaveId)=>{
        socket.current.emit("join-conclave",{
            conclaveId:conclaveId,
            userId:userId
        })
    }

    useEffect(()=>{
        socket.current.on("room-joined",({ok,messages})=>{
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

    useEffect(()=>{
        socket.current.on("user-joined-to-conclave",({name})=>{
            console.log(name,"has joined the conclave")
        })
    },[socket])

    const [state,dispatch]=useReducer(messageManipulation,{

    })

    return(
        <MessageContext.Provider value={{
            joinConclave:joinConclave,
            messages:state.messages
        }}>
            {children}
        </MessageContext.Provider>
    )
}