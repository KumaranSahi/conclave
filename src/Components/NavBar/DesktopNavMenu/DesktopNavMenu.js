import classes from './DesktopNavMenu.module.css'
import {NavLink} from 'react-router-dom'

const DesktopNavMenu=()=>{
    return(
        <div className={classes["navigation-items-desktop"]}>
                <p className={classes["nav-button"]}>
                    <NavLink to="/" exact activeClassName={classes["active-desktop"]}>
                        Home
                    </NavLink>
                </p>
                <p className={classes["nav-button"]} >
                    <NavLink to="/my-conclaves" exact activeClassName={classes["active-desktop"]}>
                        My conclaves
                    </NavLink>
                </p>
                <p className={classes["nav-button"]}>
                    <NavLink to="/bookmarked-conclavess" activeClassName={classes["active-desktop"]}>
                        Bookmarked Conclaves
                    </NavLink>
                </p>
            </div>
    )
}

export default DesktopNavMenu