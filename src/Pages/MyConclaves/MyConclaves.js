import classes from './MyConclaves.module.css'
import {ConclaveItem} from '../../Components'
import {useEffect} from 'react'
import {useConclave} from '../../Store/ConclaveContext'

const MyConclaves=()=>{
    const {userCreatedConclaves,loadUserCreatedConclaves}=useConclave();

    useEffect(()=>{
        loadUserCreatedConclaves && loadUserCreatedConclaves()
    },[])
    
    return(
        <div className={classes["myconclaves-container"]}>
            <h1>
                My Conclaves
            </h1>
            <ul className={classes["conclave-list"]}>
                {
                    userCreatedConclaves?.map(({_id,name,description,visibility,active})=>
                    (<li key={_id}>
                        <ConclaveItem
                            name={name}
                            description={description}
                            id={_id}
                            isAdmin={true}
                        />
                    </li>))
                }
                {
                    userCreatedConclaves.length===0&&(<h1 style={{textAlign:"center"}}>You Haven't created any conclaves yet</h1>)
                }
            </ul>
        </div>
    )
}

export default MyConclaves;