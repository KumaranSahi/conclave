import classes from './SignUp.module.css';
import {useState} from 'react'
import { warningToast } from '../../UI/Toast/Toast';
import image from '../../Assets/NetworkBackground.jpg'
import {useAuth} from '../../Store/AuthContext'
import axios from 'axios'

const SignUp=()=>{

    const {signUpUser,signInUser,currentPage,setCurrentPage,changePassword,setAuthLoading}=useAuth()
    
    const [userName,setUserName]=useState("")
    const [userNameValid,setUserNameValid]=useState(true)

    const [email,setEmail]=useState("")
    const [emailValid,setEmailValid]=useState(true)

    const [password,setPassword]=useState("")
    const [confirmPassword,setConfirmPassword]=useState("")

    const [file,setFile]=useState(null)
    const [fileUploadInfo,setFileUploadInfo]=useState("")

    const validateUserName=()=>{
        if(userName.length===0)
            setUserNameValid(false)
        else
            setUserNameValid(true)
    }
    
    const validateEmail=()=>{
        if(email.length>0 && new RegExp("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$").test(email))
            setEmailValid(true)
        else
            setEmailValid(false)
    }

    const fileUpload=(file)=>{
        const allowedExtensions=new RegExp("^.*(\.jpg|\.jpeg|\.png)")
        if(allowedExtensions.test(file[0].name.toLowerCase())&&file[0].size<=4000000){
            setFile(file[0]);
            setFileUploadInfo(file[0].name+" selected")
        }else{
            setFileUploadInfo("Please upload a .jpg or .png file under 4mb")
        }
    }

    const signUpSubmit=async (event)=>{
        event.preventDefault();
        validateUserName();
        validateEmail();
        if(file){
            const data=new FormData()
            data.append("file",file)
            data.append("upload_preset","conclave")
            data.append("cloud_name","conclave")
            try{
                setAuthLoading(true)
                const {data:imageData}=await axios.post("https://api.cloudinary.com/v1_1/conclave/image/upload",data)
                if(userNameValid && emailValid && imageData){
                    signUpUser({
                        name:userName,
                        email:email,
                        password:password,
                        image:imageData.url
                    })
                    setAuthLoading(false)
                    return;
                }
                
            }catch(error){
                setAuthLoading(false)
                console.log(error)
                warningToast("unable to upload file")
            }
        }

        if(!file && userNameValid && emailValid){
            signUpUser({
                name:userName,
                email:email,
                password:password
            })
        }
    }

    const signInSubmit=async (event)=>{
        event.preventDefault();
        validateEmail();
        if(emailValid)
            signInUser({
                email:email,
                password:password
            })
    }

    const changePasswordSubmit=async (event)=>{
        event.preventDefault();
        validateEmail();
        if(password===confirmPassword){
            changePassword({
                email:email,
                password:password,
                confirmPassword:confirmPassword
            })
        }else{
            warningToast("Passwords do not match")
        }
    }

    const pageToRender=()=>{
        switch (currentPage) {
            case "SIGNUP_PAGE":
                return(
                    <>
                        <h1>
                            Sign Up:
                        </h1>
                        <form 
                            className={classes["signup-container"]}
                            onSubmit={signUpSubmit}
                        >
                            <div>
                                <input type="text" 
                                    className={classes["textbox"]} 
                                    placeholder="Username"
                                    required
                                    value={userName}
                                    onChange={event=>setUserName(event.target.value)}
                                />
                                {!userNameValid&&<p className={classes["error-text"]}>Please enter a valid user name</p>}
                            </div>
                            <div>
                                <input type="email" 
                                    className={classes["textbox"]}
                                    placeholder="Email"
                                    required
                                    value={email}
                                    onChange={event=>setEmail(event.target.value)}
                                />
                                {!emailValid&&<p className={classes["error-text"]}>Please enter a valid email</p>}
                            </div>
                            <input 
                                type="password" 
                                className={classes["textbox"]} 
                                placeholder="Password"
                                required
                                value={password}
                                onChange={event=>setPassword(event.target.value)}
                            />
                            <div className={classes["button-wrap"]}>
                                <label className={classes["new-button"]}> Upload Profile Picture <i>(optional)</i>
                                    <input 
                                        type="file"
                                        onChange={event=>fileUpload(event.target.files)}
                                    />
                                </label>
                            </div>
                            {fileUploadInfo&&<p className={classes["file-upload-info"]}>{fileUploadInfo}</p>}
                            <button 
                                type="submit"
                                className={`${classes["button-solid"]} ${classes["button-primary"]}`}    
                            >
                                Sign up!
                            </button>
                        </form>
                    </>
                )
            case "SIGNIN_PAGE":
                return(
                    <>
                        <h1>
                            Sign In:
                        </h1>
                        <form 
                            className={classes["signup-container"]}
                            onSubmit={signInSubmit}
                        >
                            <div>
                                <input type="email" 
                                    className={classes["textbox"]} 
                                    placeholder="Email"
                                    required
                                    value={email}
                                    onChange={event=>setEmail(event.target.value)}
                                />
                                {!emailValid&&<p className={classes["error-text"]}>Please enter a valid email</p>}
                            </div>
                            <input 
                                type="password" 
                                className={classes["textbox"]} 
                                placeholder="Password"
                                required
                                value={password}
                                onChange={event=>setPassword(event.target.value)}
                            />
                            <button 
                                type="submit"
                                className={`${classes["button-solid"]} ${classes["button-primary"]}`}    
                            >
                                Sign In
                            </button>
                        </form>
                    </>
                )
            case "CHANGE_PASSWORD":
                return(
                    <>
                        <h1>
                            Change Password:
                        </h1>
                        <form 
                            className={classes["signup-container"]}
                            onSubmit={changePasswordSubmit}
                        >
                            <input type="email" 
                                    className={classes["textbox"]} 
                                    placeholder="Email"
                                    required
                                    value={email}
                                    onChange={event=>setEmail(event.target.value)}
                                />
                            <input 
                                type="password" 
                                className={classes["textbox"]} 
                                placeholder="Password"
                                required
                                value={password}
                                onChange={event=>setPassword(event.target.value)}
                            />
                            <input 
                                type="password" 
                                className={classes["textbox"]} 
                                placeholder="Confirm Password"
                                required
                                value={confirmPassword}
                                onChange={event=>setConfirmPassword(event.target.value)}
                            />
                            <button 
                                type="submit"
                                className={`${classes["button-solid"]} ${classes["button-primary"]}`}    
                            >
                                Change Password
                            </button>
                        </form>
                    </>
                )
            default:
                return(<div>

                </div>)
        }
    }
    
    return(
        <div className={classes["login-container"]}>
            
            <div className={classes["login"]}>
                <img
                    src={image}
                    alt="login"
                    className={classes["login-image"]}
                />
                <div className={classes["signin-signup-container"]}>
                    {pageToRender()}
                    {currentPage==="SIGNIN_PAGE"&&<p className={classes["switch-page"]} onClick={()=>setCurrentPage("CHANGE_PASSWORD")}>Forgot Password</p>}
                    {currentPage==="SIGNIN_PAGE"?<p className={classes["switch-page"]} onClick={()=>setCurrentPage("SIGNUP_PAGE")}>New to Conclave? Sign up!</p>:
                        <p className={classes["switch-page"]} onClick={()=>setCurrentPage("SIGNIN_PAGE")}>Already have an Account? Sign In!</p>}
                </div>
            </div>
        </div>
    )
}

export default SignUp;