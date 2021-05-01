import classes from './Home.module.css'
import {ConclaveItem} from '../../Components'

const Home=()=>{
    return(
        <div className={classes["homepage-container"]}>
            <h1>
                Active Conclaves
            </h1>
            <ul className={`${classes["conclave-list"]} ${classes["active-list"]}`}>
                <li>
                    <ConclaveItem/>
                </li>
                <li>
                    <ConclaveItem/>
                </li>
            </ul>
            <h1>
                Popular Conclaves
            </h1>
            <ul className={`${classes["conclave-list"]} ${classes["popular-list"]}`}>
                <li>
                    <ConclaveItem/>
                </li>
                <li>
                    <ConclaveItem/>
                </li>
                <li>
                    <ConclaveItem/>
                </li>
                <li>
                    <ConclaveItem/>
                </li>
                <li>
                    <ConclaveItem/>
                </li>
                <li>
                    <ConclaveItem/>
                </li>
            </ul>
        </div>
    )
}

export default Home;