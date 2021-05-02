import classes from './BookmarkedConclaves.module.css'
import {ConclaveItem} from '../../Components'
import {useEffect} from 'react'
import {useConclave} from '../../Store/ConclaveContext'

const Bookmarked=()=>{
    const {bookmarkedConclaves,loadBookmarkedConclaves}=useConclave();

    useEffect(()=>{
        loadBookmarkedConclaves && loadBookmarkedConclaves()
        console.log("works")
    },[])
    
    return(
        <div className={classes["bookmarked-container"]}>
            <h1>
                Bookmarked Conclaves
            </h1>
            <ul className={classes["conclave-list"]}>
                {
                    bookmarkedConclaves?.map(({_id,name,description,visibility,active,image})=>
                    (<li key={_id}>
                        <ConclaveItem
                            name={name}
                            description={description}
                            id={_id}
                            visibility={visibility}
                            bookmarked={true}
                            active={active}
                            image={image}
                        />
                    </li>))
                }
                {
                    bookmarkedConclaves.length===0&&(<h1 style={{textAlign:"center"}}>No Bookmarked Conclaves</h1>)
                }
            </ul>
        </div>
    )
}

export default Bookmarked;