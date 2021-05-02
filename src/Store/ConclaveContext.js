import {createContext,useContext,useEffect, useReducer,useState} from 'react'
import {useAuth} from './AuthContext'
import axios from 'axios'
import {successToast, warningToast} from '../UI/Toast/Toast'
import {useHistory} from 'react-router-dom'

export const ConclaveContext=createContext();

export const useConclave=()=>useContext(ConclaveContext);

export const ConclaveContextProvider=({children})=>{
    const [loading,setLoading]=useState(false)
    const {token,userId}=useAuth();
    const {push}=useHistory()

    const config = {
        headers: {
            Authorization: "Bearer " + token
        }
    }

    const conclaveManipulation=(state,action)=>{
        switch (action.type) {
            case "LOAD_CONCLAVE_LIST":
                return({
                    ...state,
                    conclaves:[...action.payload]
                })
            case "LOAD_USERCREATED_CONCLAVES":
                return({
                    ...state,
                    userCreatedConclaves:[...action.payload]
                })
            case "LOAD_BOOKMARKED_CONCLAVES":
                return({
                    ...state,
                    bookmarkedConclaves:[...action.payload]
                })
            default:
                return state;
        }
    }

    const loadUserCreatedConclaves=async ()=>{
        setLoading(true)
        try{
            if(token){
                const {data:{data,ok}}=await axios.get(`/api/conclaves/${userId}`,config);
                if(ok)
                    dispatch ({
                        type:"LOAD_USERCREATED_CONCLAVES",
                        payload:[...data]
                    })
            }
            setLoading(false)   
        }catch(error){
            console.log(error)
            warningToast("Failed to load Conclaves")
            setLoading(false)
        }
    }

    const loadBookmarkedConclaves=async ()=>{
        try{
            if(token){
                const {data:{data,ok}}=await axios.get(`/api/conclaves/${userId}/bookmarks`,config);
                if(ok)
                    dispatch ({
                        type:"LOAD_BOOKMARKED_CONCLAVES",
                        payload:[...data]
                    }) 
            }
        }catch(error){
            console.log(error)
            warningToast("Failed to load Conclaves")
        }
    }

    const createConclave=async (body)=>{
        setLoading(true)
        try{
            if(token){
                const {data:{data,currentConclave,ok}}=await axios.post(`/api/conclaves/${userId}`,body,config);
                if(ok){
                    dispatch ({
                        type:"LOAD_CONCLAVE_LIST",
                        payload:[...state.conclaves,data]
                    })
                    push({pathname:"/chat",search:currentConclave._id,state:currentConclave})
                }
            }
            setLoading(false)
            successToast("Conclave created successfully")
        }catch(error){
            console.log(error)
            warningToast("Failed to create Conclave")
            setLoading(false)
        }
    }

    const getActiveConclaves=(conclaves)=>conclaves.filter(({active})=>active)

    const getPopularConclaves=(conclaves)=>conclaves.filter(({active,visibility})=>!active&&visibility==="PUBLIC")

    useEffect(()=>{
        (async()=>{
            try{
                if(token){
                    const {data:{data,ok}}=await axios.get("/api/conclaves",config);
                    if(ok)
                        dispatch ({
                            type:"LOAD_CONCLAVE_LIST",
                            payload:[...data]
                        })
                }
            }catch(error){
                console.log(error)
                warningToast("Failed to load Conclaves")
            }
        })()
    },[token])

    const [state,dispatch]=useReducer(conclaveManipulation,{
        conclaves:[],
        userCreatedConclaves:[],
        bookmarkedConclaves:[]
    })
    return(
        <ConclaveContext.Provider
            value={{
                conclaves:state.conclaves,
                conclaveLoading:loading,
                activeConclaves:getActiveConclaves(state.conclaves),
                popularConclaves:getPopularConclaves(state.conclaves),
                userCreatedConclaves:state.userCreatedConclaves,
                loadUserCreatedConclaves:loadUserCreatedConclaves,
                createConclave:createConclave,
                bookmarkedConclaves:state.bookmarkedConclaves,
                loadBookmarkedConclaves:loadBookmarkedConclaves,
                dispatch:dispatch,
                setConclaveLoading:setLoading
            }}
        >
            {children}
        </ConclaveContext.Provider>
    )
}