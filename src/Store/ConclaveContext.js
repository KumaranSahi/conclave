import {createContext,useContext,useEffect, useReducer,useState} from 'react'
import {useAuth} from './AuthContext'
import axios from 'axios'
import {successToast, warningToast} from '../UI/Toast/Toast'

export const ConclaveContext=createContext();

export const useConclave=()=>useContext(ConclaveContext);

export const ConclaveContextProvider=({children})=>{
    const [loading,setLoading]=useState(false)
    const {token,userId}=useAuth();

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
                        type:"LOAD_CONCLAVE_LIST",
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

    const createConclave=async (body)=>{
        setLoading(true)
        try{
            if(token){
                const {data:{data,ok}}=await axios.post(`/api/conclaves/${userId}`,body,config);
                if(ok)
                    dispatch ({
                        type:"LOAD_CONCLAVE_LIST",
                        payload:[...state.conclaves,data]
                    })
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
        userCreatedConclaves:[]
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
                dispatch:dispatch
            }}
        >
            {children}
        </ConclaveContext.Provider>
    )
}