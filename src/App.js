import './App.css';
import {NavBar} from './Components'
import {Switch,Route,Redirect} from 'react-router-dom'
import SignUp from './Pages/SignUp/SignUp'
import Chat from './Pages/Chat/Chat'
import Home from './Pages/Home/Home'
import {ToastContainer} from 'react-toastify'
import {useAuth} from './Store/AuthContext'
import Spinner from './UI/Spinner/Spinner'

const PrivateLink=({...props})=>{
  const {token}=useAuth()
  return(
      token?<Route {...props}/>:<Redirect to="/sign-up"/>
  )
}

const LockLogin=({...props})=>{
  const {token}=useAuth()
  return(
      token?<Redirect to="/"/>:<Route {...props}/>
  )
}

function App() {
  const {authLoading}=useAuth()
  return (
    <div className="App">
      <header>
        <NavBar/>
      </header>
      <main className="main-container">
        <Switch>
          <LockLogin path="/sign-up" component={SignUp}/>
          <PrivateLink path="/chat" component={Chat}/>
          <Route path="/" component={Home}/>
        </Switch>
      </main>
      <ToastContainer/>
      {(authLoading)&&<Spinner/>}
    </div>
  );
}

export default App;
