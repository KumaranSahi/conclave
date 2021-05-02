import classes from './User.module.css'
import JaneDoe from '../../../Assets/Jane Doe.jpg'

const Users=({name})=>{
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
        </div>
    )
}

export default Users;