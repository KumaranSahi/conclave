import {useContext,createContext,useRef,useEffect,useState} from 'react';
import {io} from 'socket.io-client'
import { infoToast, successToast, warningToast } from '../UI/Toast/Toast';
import {useAuth} from './AuthContext'
import {useConclave} from './ConclaveContext'
import {useHistory} from 'react-router-dom'
import { useReducer } from 'react';
// import axios from 'axios'
import axios from '../useAxioss'

export const MessageContext=createContext()

export const useMessage=()=>useContext(MessageContext)

export const MessageContextProvider=({children})=>{
    const [loading,setLoading]=useState(false)
    const {userId,token}=useAuth()
    const {push}=useHistory()
    const {dispatch:conclaveDispatch}=useConclave()

    const config = {
        headers: {
            Authorization: "Bearer " + token
        }
    }
    const socket=useRef(io("wss://conclave-socket.herokuapp.com/",{
        transports:[ "websocket","polling"],
    }))
    // const socket=useRef(io("ws://localhost:8080",{
    //         transports:[ "websocket","polling"],
    //     }))

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
            case "ADD_TO_USERHANDRAISED":
                return({
                    ...state,
                    raisedHandUsers:[...action.payload]
                })
            case "SET_ALLOW_TALKING":
                return({
                    ...state,
                    allowTalking:action.payload
                })
            default:
                return state
        }
    }

    const joinConclave=async(conclave)=>{
        if(conclave?.active){
            dispatch({
                type:"UPDATE_CURRENT_CONCLAVE",
                payload:conclave
            })
            socket.current.emit("join-conclave",{
                conclaveId:conclave._id,
                userId:userId
            })
        }else{
            setLoading(true)
            try{
                const {data}=await axios.get(`/api/messages/${conclave._id}`,config);
                dispatch({
                    type:"UPDATE_CURRENT_CONCLAVE",
                    payload:conclave
                })
                dispatch({
                    type:"ADD_MESSAGES_ACTION",
                    payload:{messages:[...data.data],users:[]}
                })
                setLoading(false)
            }catch(error){
                console.log(error)
                warningToast("Unable to fetch messages")
                setLoading(false)
            }
        }
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
        dispatch({
            type:"SET_ALLOW_TALKING",
            payload:false
        })
    }

    const raiseHand=()=>{
        socket.current.emit("raise-hand",{
            userId:userId,
            conclaveAdminId:state.currentConclave.admin
        })
    }

    const raisedHandResponse=(userId,response)=>{
        if(response==="ACCEPT"){
            socket.current.emit("accept-raised-hand",{
                userId:userId
            })
        }else{
            socket.current.emit("reject-raised-hand",{
                userId:userId
            })
        }
        dispatch({
            type:"ADD_TO_USERHANDRAISED",
            payload:state.raisedHandUsers.filter(({_id})=>_id!==userId)
        })
    }

    const lowerHand=()=>{
        dispatch({
            type:"SET_ALLOW_TALKING",
            payload:false
        })
    }

    const closeConclave=()=>{
        socket.current.emit("close-conclave",{
            conclaveId:state.currentConclave._id
        })
    }
    
    const changeVisibility=async (visibility)=>{
        setLoading(true)
        try{
            const {data}=await axios.put(`/api/conclaves/${state.currentConclave._id}/visibility`,{
                visibility:visibility
            },config)
            dispatch({
                type:"UPDATE_CURRENT_CONCLAVE",
                payload:data.data
            })
            successToast('Visibility updated')
            setLoading(false)
        }catch(error){
            console.log(error)
            warningToast("Unable to change visibility")
            setLoading(false)
        }
    }

    const addBookmark=async ()=>{
        setLoading(true)
        try{
            await axios.put(`/api/conclaves/${state.currentConclave._id}/users/${userId}`,null,config)
            setLoading(false)
            successToast("Conclave Bookmarked")
        }catch(error){
            console.log(error)
            warningToast("Unable to add bookmark")
            setLoading(false)
        }
    }

    const muteClicked=async (userId)=>{
        socket.current.emit("mute-user",{
            userId:userId
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

    useEffect(()=>{
        socket.current.on("user-raised-hand",({ok,user})=>{
            if(ok){
                dispatch({
                    type:"ADD_TO_USERHANDRAISED",
                    payload:[user]
                })
            }
        })
    },[socket])

    useEffect(()=>{
        socket.current.on("admin-unavailable",()=>{
            infoToast("Seems like the admin is unavailable")
        })
    },[socket])

    useEffect(()=>{
        socket.current.on("raised-hand-accepted",()=>{
            successToast("You can talk now")
            dispatch({
                type:"SET_ALLOW_TALKING",
                payload:true
            })
        })
    },[socket])

    useEffect(()=>{
        socket.current.on("raised-hand-rejected",()=>{
            warningToast("Admin has rejected your request")
            dispatch({
                type:"SET_ALLOW_TALKING",
                payload:false
            })
        })
    },[socket])

    useEffect(()=>{
        socket.current.on("conclave-closed",({conclaves})=>{
            warningToast("Admin has Closed the conclave")
            dispatch({
                type:"SET_ALLOW_TALKING",
                payload:false
            })
            conclaveDispatch({
                type:"LOAD_CONCLAVE_LIST",
                payload:[...conclaves]
            })
            push("/")
        })
    },[socket])

    useEffect(()=>{
        socket.current.on("admin-muted-you",()=>{
            warningToast("The Admin has muted you") 
            dispatch({
                type:"SET_ALLOW_TALKING",
                payload:false
            })
        })
    },[socket])

    const [state,dispatch]=useReducer(messageManipulation,{
        messages:[],
        users:[],
        raisedHandUsers:[],
        currentConclave:null,
        replyMessage:null,
        allowTalking:false
    })

    useEffect(()=>{
        if(state.currentConclave?.admin===userId){
            dispatch({
                type:"SET_ALLOW_TALKING",
                payload:true
            })
        }
    },[state.currentConclave,userId])

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
            leaveConclave:leaveConclave,
            raiseHand:raiseHand,
            raisedHandUsers:state.raisedHandUsers,
            raisedHandResponse:raisedHandResponse,
            allowTalking:state.allowTalking,
            lowerHand:lowerHand,
            closeConclave:closeConclave,
            changeVisibility:changeVisibility,
            messageLoading:loading,
            addBookmark:addBookmark,
            muteClicked:muteClicked
        }}>
            {children}
        </MessageContext.Provider>
    )
}