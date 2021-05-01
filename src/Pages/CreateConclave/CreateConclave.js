import classes from './CreateConclave.module.css'
import {useState} from 'react'
import {useConclave} from '../../Store/ConclaveContext'

const CreateConclave=()=>{
    const [name,setName]=useState("")
    const [description, setDescription]=useState("")
    const {createConclave}=useConclave()

    const submitHandler=(event)=>{
        event.preventDefault();
        if(name.length>0){
            createConclave({
                name:name,
                description:description
            })
        }
    }

    return(
        <div className={classes["create-conclave"]}>
            <form className={classes["create-conclave-form"]} onSubmit={submitHandler}>
                <h1>
                    Create Conclave
                </h1>
                <input type="text" 
                    className={classes["textbox"]} 
                    placeholder="Conclave Name" 
                    required
                    value={name}
                    onChange={event=>setName(event.target.value)}
                />
                <textarea
                    className={classes['textarea']}
                    placeholder="Conclave Description"
                    value={description}
                    onChange={event=>setDescription(event.target.value)}
                ></textarea>
                <button type="submit" className={`${classes["button-solid"]} ${classes["button-primary"]}`}>
                    Create
                </button>
            </form>
        </div>
    )
}

export default CreateConclave;