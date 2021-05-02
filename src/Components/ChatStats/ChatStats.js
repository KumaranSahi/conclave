import classes from './ChatStats.module.css'
import {LongMenu} from '../'
import User from './User/User'
import UserRaisedHand from './UserRaisedHand/UserRaisedHand'
import {useMessage} from '../../Store/MessageContext'
import {useAuth} from '../../Store/AuthContext'

export const ChatStats=()=>{
    const {users,currentConclave}=useMessage()
    const {userId}=useAuth()
    return(
        <div className={classes["chat-stats"]}>
            <div className={classes["options-div"]}>
                <h2>
                    {currentConclave?.name}
                </h2>
                {userId!=currentConclave?.admin&&<LongMenu options={["bookmark"]}/>}
            </div>
            {userId!=currentConclave?.admin?<div className={classes["options-div"]}>
                <button className={`${classes["button-solid"]} ${classes["button-success"]}`}>
                    Raise Hand
                </button>
            </div>:
            <div className={classes["options-div"]}>
                <button className={`${classes["button-solid"]} ${classes["button-failure"]}`}>
                    Close Conclave
                </button>
                <LongMenu options={["Make Public"]}/>
            </div>}
            {userId==currentConclave?.admin&&(<>
                <hr/>
                <h3>
                    Accept Users
                </h3>
                <ul className={classes["users-in-conclave"]}>
                    <li>
                        <UserRaisedHand/>
                        <UserRaisedHand/>
                        <UserRaisedHand/>
                        <UserRaisedHand/>
                        <UserRaisedHand/>
                    </li>
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
    )
}