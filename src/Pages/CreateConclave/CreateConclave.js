import classes from './CreateConclave.module.css'
import {useState} from 'react'
import {useConclave} from '../../Store/ConclaveContext'
// import axios from 'axios'
import axios from '../../useAxioss'
import {warningToast} from '../../UI/Toast/Toast'

const CreateConclave=()=>{
    const [name,setName]=useState("")
    const [description, setDescription]=useState("")
    const {createConclave,setConclaveLoading}=useConclave()
    const [file,setFile]=useState(null)
    const [fileUploadInfo,setFileUploadInfo]=useState("")

    const fileUpload=(file)=>{
        const allowedExtensions=new RegExp("^.*(\.jpg|\.jpeg|\.png)")
        if(allowedExtensions.test(file[0].name.toLowerCase())&&file[0].size<=4000000){
            setFile(file[0]);
            setFileUploadInfo(file[0].name+" selected")
        }else{
            setFileUploadInfo("Please upload a .jpg or .png file under 4mb")
        }
    }

    const submitHandler=async (event)=>{
        event.preventDefault();
        if(file){
            const data=new FormData()
            data.append("file",file)
            data.append("upload_preset","conclave")
            data.append("cloud_name","conclave")
            try{
                setConclaveLoading(true)
                const {data:imageData}=await axios.post("https://api.cloudinary.com/v1_1/conclave/image/upload",data)
                if(name.length>0 && imageData){
                    createConclave({
                        name:name,
                        description:description,
                        image:imageData.url
                    })
                    setConclaveLoading(false)
                    return;
                }
            }catch(error){
                setConclaveLoading(false)
                console.log(error)
                warningToast("unable to upload file")
            }
        }
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
                <div className={classes["button-wrap"]}>
                    <label className={classes["new-button"]}> Upload Display Picture <i>(optional)</i>
                        <input 
                            type="file"
                            onChange={event=>fileUpload(event.target.files)}
                        />
                    </label>
                </div>
                {fileUploadInfo&&<p className={classes["file-upload-info"]}>{fileUploadInfo}</p>}
                <button type="submit" className={`${classes["button-solid"]} ${classes["button-primary"]}`}>
                    Create
                </button>
            </form>
        </div>
    )
}

export default CreateConclave;