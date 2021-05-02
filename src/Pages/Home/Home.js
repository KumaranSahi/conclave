import classes from './Home.module.css'
import {ConclaveItem} from '../../Components'
import {useHistory} from 'react-router-dom'
import {useConclave} from '../../Store/ConclaveContext'

const Home=()=>{
    const {push}=useHistory();
    const {activeConclaves,popularConclaves}=useConclave();
    return(
        <div className={classes["homepage-container"]}>
            <div className={classes["create-button-container"]}>
                <button className={`${classes["button-solid"]} ${classes["button-primary"]}`} onClick={()=>push("/create-conclave")}>
                    Create new conclave
                </button>
            </div>
            <h1>
                Active Conclaves
            </h1>
            <ul className={classes["conclave-list"]}>
                {
                    activeConclaves.map(({_id,name,description,image})=>
                    (<li key={_id}>
                        <ConclaveItem
                            name={name}
                            description={description}
                            id={_id}
                            image={image}
                        />
                    </li>))
                }
                {
                    activeConclaves.length===0&&(<h1 style={{textAlign:"center"}}>No Active Conclaves at the moment</h1>)
                }
            </ul>
            {popularConclaves.length>0&&(
            <>
                <h1>
                    Popular Conclaves
                </h1>
                <ul className={classes["conclave-list"]}>
                    {
                        popularConclaves.map(({_id,name,description})=>
                        (<li key={_id}>
                            <ConclaveItem
                                name={name}
                                description={description}
                                id={_id}
                            />
                        </li>))
                    }
                </ul>
            </>
            )}
        </div>
    )
}

export default Home;