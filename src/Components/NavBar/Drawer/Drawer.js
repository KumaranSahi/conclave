import {SwipeableDrawer} from '@material-ui/core';
import {ChatStats} from '../../../Components'

const list = () => (
    <div
      role="presentation"
    >
      <ChatStats/>
    </div>
  );

const Dropdown=({open,closeDrawer})=>{
    return(
        <div>
            <SwipeableDrawer
              anchor="right"
              open={open}
              onClose={()=>closeDrawer()}
              onOpen={()=>{}}  
            >
                {list(closeDrawer)}
            </SwipeableDrawer>
        </div>
    )
}

export default Dropdown