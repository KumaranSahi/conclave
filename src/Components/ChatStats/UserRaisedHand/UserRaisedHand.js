import classes from './UserRaisedHand.module.css'
import JaneDoe from '../../../Assets/Jane Doe.jpg'
import {useMessage} from '../../../Store/MessageContext'

const UserRaisedHand=({name,id})=>{
    const {raisedHandResponse}=useMessage()
    return(
        <div className={classes["user-container"]}>
            <div className={classes["user"]}>
                <img
                    src={JaneDoe}
                    alt="profile"
                    className={classes["profile-image"]}
                />
                <p className={classes["user-name"]}>
                    {name}
                </p>
            </div>
            <div className={classes["user-action"]}>
                <button className={`${classes["button-solid"]} ${classes["button-success"]}`} onClick={()=>raisedHandResponse(id,"ACCEPT")}>
                    Accept
                </button>
                <button className={`${classes["button-solid"]} ${classes["button-failure"]}`} onClick={()=>raisedHandResponse(id,"REJECT")}>
                    Reject
                </button>
            </div>
        </div>
    )
}

export default UserRaisedHand;