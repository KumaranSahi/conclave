import classes from './ConclaveItem.module.css'
import janeDoe from '../../Assets/Jane Doe.jpg'
import {useHistory} from 'react-router-dom'

export const ConclaveItem=({name,description,id})=>{
    const {push}=useHistory();
    return(
        <div className={classes["conclave-item"]}>
            <div className={classes["conclave-details"]}>
                <img
                    src={janeDoe}
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
            <button className={`${classes["button-solid"]} ${classes["button-primary"]}`} onClick={()=>push({pathname:"/chat",search:id})}>
                Join Conclave
            </button>
        </div>
    )
}