import classes from './ChatStats.module.css'
import {LongMenu} from '../'
import User from './User/User'
import UserRaisedHand from './UserRaisedHand/UserRaisedHand'

export const ChatStats=()=>{
    return(
        <div className={classes["chat-stats"]}>
            <div className={classes["options-div"]}>
                <h2>
                    Conclave
                </h2>
                <LongMenu options={["bookmark"]}/>
            </div>
            <div className={classes["options-div"]}>
                <button className={`${classes["button-solid"]} ${classes["button-success"]}`}>
                    Raise Hand
                </button>
            </div>
            <div className={classes["options-div"]}>
                <button className={`${classes["button-solid"]} ${classes["button-failure"]}`}>
                    Close Conclave
                </button>
                <LongMenu options={["Make Public"]}/>
            </div>
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
            <hr/>
            <h3>
                Users On Conclave
            </h3>
            <ul className={classes["users-in-conclave"]}>
                <li>
                    <User/>
                    <User/>
                    <User/>
                    <User/>
                    <User/>
                </li>
            </ul>
        </div>
    )
}