import classes from './Avatar.module.css';
import {useState} from 'react'
import {useAuth} from '../../../Store/AuthContext'
import profileImage from '../../../Assets/Jane Doe.jpg'
import {Link,useLocation} from 'react-router-dom'
import {Menu,MenuItem} from '@material-ui/core'

const Avatar=()=>{
    const {userName,signOutUser}=useAuth()

    const [openDropdown,setOpenDropdown]=useState(null)

    const handleClick = (event) => {
        setOpenDropdown(event.currentTarget);
    };

    const handleClose = () => {
        setOpenDropdown(null);
    };
    
    const handleLogout=()=>{
        signOutUser();
        handleClose()
    }

    let avatar=null
    let {pathname}=useLocation();
    if(userName){
        avatar=(
            <div className={classes["name-avatar-container"]}>
                <p onClick={handleClick}>Hello, {userName}</p>
                <div className={classes["avatar-container"]}>
                    <img src={profileImage} className={classes["avatar"]}  alt="Active avatar" onClick={handleClick}/>
                    <div className={`${classes["avatar-bubble"]} ${classes["bubble-active"]}`}></div>
                    <Menu
                        id="simple-menu"
                        anchorEl={openDropdown}
                        keepMounted
                        open={Boolean(openDropdown)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                        <MenuItem onClick={handleClose}>My account</MenuItem>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                </div>
            </div>
        )
    }else{
        avatar=pathname!=="/login"&&(
            <div className={classes["name-avatar-container"]}>
                <Link to="/sign-up">
                    Login          
                </Link>
            </div>
        )
    }

    return(
        <div>
            {avatar}            
        </div>
    )
}

export default Avatar;