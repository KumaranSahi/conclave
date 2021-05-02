import classes from './UserRaisedHand.module.css'
import Default from '../../../Assets/default.png'
import {useMessage} from '../../../Store/MessageContext'

const UserRaisedHand=({name,id,image})=>{
    const {raisedHandResponse}=useMessage()
    return(
        <div className={classes["user-container"]}>
            <div className={classes["user"]}>
                <img
                    src={image?image:Default}
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