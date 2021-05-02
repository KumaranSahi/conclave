import classes from './ChatStats.module.css'
import {LongMenu} from '../'
import User from './User/User'
import UserRaisedHand from './UserRaisedHand/UserRaisedHand'
import {useMessage} from '../../Store/MessageContext'
import {useAuth} from '../../Store/AuthContext'

export const ChatStats=()=>{
    const {users,currentConclave,raiseHand,raisedHandUsers,allowTalking,lowerHand,closeConclave,changeVisibility}=useMessage()
    const {userId}=useAuth()

    const visiblityClicked=()=>{
        currentConclave.visibility==="PUBLIC"?changeVisibility("PRIVATE"):changeVisibility("PUBLIC")
    }

    return currentConclave?.active?(
        <div className={classes["chat-stats"]}>
            <div className={classes["options-div"]}>
                <h2>
                    {currentConclave?.name}
                </h2>
                {userId!==currentConclave?.admin&&<LongMenu options={["bookmark"]}/>}
            </div>
            {userId!==currentConclave?.admin?<div className={classes["options-div"]}>
                {allowTalking?
                (<button className={`${classes["button-solid"]} ${classes["button-failure"]}`} onClick={()=>lowerHand()}>
                    Lower Hand
                </button>)
                :(<button className={`${classes["button-solid"]} ${classes["button-success"]}`} onClick={()=>raiseHand()}>
                    Raise Hand
                </button>)}
                </div>:
                <div className={classes["options-div"]}>
                    <button className={`${classes["button-solid"]} ${classes["button-failure"]}`} onClick={()=>closeConclave()}>
                        Close Conclave
                    </button>
                    <LongMenu options={currentConclave.visibility==="PUBLIC"?["Make Private"]:["Make Public"]} changed={visiblityClicked}/>
                </div>
            }
            {userId===currentConclave?.admin&&(<>
                <hr/>
                <h3>
                    Accept Users
                </h3>
                <ul className={classes["users-in-conclave"]}>
                    {
                        raisedHandUsers.map(({name,_id})=>(
                            <li key={_id}>
                                <UserRaisedHand
                                    name={name}
                                    id={_id}
                                />
                            </li>
                        ))
                    }
                </ul>
            </>)}
            <hr/>
            <h3>
                Users On Conclave
            </h3>
            <ul className={classes["users-in-conclave"]}>
                {users?.map(({name,_id})=>(
                <li key={_id}>
                    <User
                        name={name}
                    />
                </li>))
                }
            </ul>
        </div>
    ):(
        <div className={classes["chat-stats"]}>
            <div className={classes["options-div"]}>
                <h2>
                    {currentConclave?.name}
                </h2>
                {userId!==currentConclave?.admin&&<LongMenu options={["bookmark"]}/>}
            </div>
        </div>
    )
}