import classes from './Drawer.module.css'
import {List,ListItem,Divider,ListItemText,SwipeableDrawer} from '@material-ui/core';

const list = () => (
    <div
      role="presentation"
    >
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

const Dropdown=({open,closeDrawer})=>{
    return(
        <div>
            <SwipeableDrawer
            anchor="right"
            open={open}
            onClose={()=>closeDrawer()}
            >
                {list(closeDrawer)}
            </SwipeableDrawer>
        </div>
    )
}

export default Dropdown