import {Link} from 'react-router-dom'
import classes from './Logo.module.css';
import Logo from '../../../Assets/conclave transparent.png'

const logo=()=>{
    return(
        <Link to="/">
            <div className={classes['conclave-title']}>
                <img src={Logo} className={classes["logo"]} alt="logo"/>
                <h1>Conclave</h1>
            </div>
        </Link>
    )
}

export default logo;