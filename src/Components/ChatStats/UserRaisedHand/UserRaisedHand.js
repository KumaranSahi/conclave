import classes from './UserRaisedHand.module.css'
import JaneDoe from '../../../Assets/Jane Doe.jpg'

const UserRaisedHand=()=>{
    return(
        <div className={classes["user-container"]}>
            <div className={classes["user"]}>
                <img
                    src={JaneDoe}
                    alt="profile"
                    className={classes["profile-image"]}
                />
                <p className={classes["user-name"]}>
                    Jane Doe
                </p>
            </div>
            <div className={classes["user-action"]}>
                <button className={`${classes["button-solid"]} ${classes["button-success"]}`}>
                    Accept
                </button>
                <button className={`${classes["button-solid"]} ${classes["button-failure"]}`}>
                    Reject
                </button>
            </div>
        </div>
    )
}

export default UserRaisedHand;