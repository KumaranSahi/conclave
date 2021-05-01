import classes from './NavBar.module.css'
import Logo from './Logo/Logo'
import Hamburger from './Hamburger/Hamburger'
import DesktopNavMenu from './DesktopNavMenu/DesktopNavMenu'
import Avatar from './Avatar/Avatar'
import {useAuth} from '../../Store/AuthContext'
import {useLocation} from 'react-router-dom'

export const  NavBar=()=>{
    const {token}=useAuth()
    const {pathname}=useLocation()
    return(
        <nav className={classes["navbar"]}>
            <Logo/>
            {token?
            (<>
                <DesktopNavMenu/>
                {pathname==="/chat"?<Hamburger/>:<Avatar/>}
            </>):<div></div>}
        </nav>
    )
}
