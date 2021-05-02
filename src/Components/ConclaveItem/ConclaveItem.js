import classes from './ConclaveItem.module.css'
import Default from '../../Assets/default.png'
import {useHistory} from 'react-router-dom'

export const ConclaveItem=({name,description,id,visibility,bookmarked,active,isAdmin,image})=>{
    const {push}=useHistory();
    return(
        <div className={classes["conclave-item"]}>
            <div className={classes["conclave-details"]}>
                <img
                    src={image?image:Default}
                    alt="Profile"
                    className={classes["conclave-image"]}
                />
                <p className={classes["conclave-name"]}>
                    {name}
                </p>
            </div>
            <p className={classes["conclave-description"]}>
                {description}
            </p>
            {bookmarked && visibility!=="PUBLIC" && !active && !isAdmin?
            <button className={`${classes["button-solid"]} ${classes["button-failure"]}`}>
                Private conclave
            </button>:
            <button className={`${classes["button-solid"]} ${classes["button-primary"]}`} onClick={()=>push({pathname:"/chat",search:id})}>
                Join Conclave
            </button>}
        </div>
    )
}