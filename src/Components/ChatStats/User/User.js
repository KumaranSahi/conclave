import classes from './User.module.css'
import JaneDoe from '../../../Assets/Jane Doe.jpg'
import {LongMenu} from '../../'

const Users=()=>{
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
            <LongMenu options={["Kickout"]}/>
        </div>
    )
}

export default Users;