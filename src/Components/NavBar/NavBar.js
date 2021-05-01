import classes from './NavBar.module.css'
import Logo from './Logo/Logo'
import Hamburger from './Hamburger/Hamburger'
import DesktopNavMenu from './DesktopNavMenu/DesktopNavMenu'
import Avatar from './Avatar/Avatar'

export const  NavBar=()=>{
    return(
        <nav className={classes["navbar"]}>
            <Logo/>
            <DesktopNavMenu/>
            <Hamburger/>
            <Avatar/>
        </nav>
    )
}
