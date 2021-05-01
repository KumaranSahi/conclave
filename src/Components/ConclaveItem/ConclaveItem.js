import classes from './ConclaveItem.module.css'
import janeDoe from '../../Assets/Jane Doe.jpg'

export const ConclaveItem=()=>{
    return(
        <div className={classes["conclave-item"]}>
            <div className={classes["conclave-details"]}>
                <img
                    src={janeDoe}
                    alt="Profile"
                    className={classes["conclave-image"]}
                />
                <p className={classes["conclave-name"]}>
                    Conclave Name
                </p>
            </div>
            <p className={classes["conclave-description"]}>
                opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
            </p>
            <button className={`${classes["button-solid"]} ${classes["button-primary"]}`}>
                Join Conclave
            </button>
        </div>
    )
}