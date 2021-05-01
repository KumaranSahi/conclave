import classes from './NavBar.module.css'
import Logo from './Logo/Logo'
import Hamburger from './Hamburger/Hamburger'
import DesktopNavMenu from './DesktopNavMenu/DesktopNavMenu'

export const  NavBar=()=>{
    return(
        <nav className={classes["navbar"]}>
            <Logo/>
            <DesktopNavMenu/>
            <Hamburger/>
        </nav>
    )
}
