import classes from './Hamburger.module.css';
import React,{ useState } from 'react';
import Dropdown from '../Drawer/Drawer';

const hamburger=React.memo(()=>{
    const [openDrawer,setOpenDrawer]=useState(false);

    return(
        <div className={classes["enclosing-div"]}>
            <div className={classes["hamburger-container"]} onClick={()=>setOpenDrawer(true)}>
                <div className={classes["hamburger-line"]}></div>
                <div className={classes["hamburger-line"]}></div>
                <div className={classes["hamburger-line"]}></div>
                
            </div>
            <Dropdown open={openDrawer} closeDrawer={()=>setOpenDrawer(false)}/>
        </div>
    )
})

export default hamburger;