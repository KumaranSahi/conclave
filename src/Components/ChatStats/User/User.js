import classes from './User.module.css'
import Default from '../../../Assets/default.png'

const Users=({name,image})=>{
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
        </div>
    )
}

export default Users;