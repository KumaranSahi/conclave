import {NavBar} from './Components'

import {Switch,Route,Redirect,useLocation} from 'react-router-dom'

import SignUp from './Pages/SignUp/SignUp'
import Chat from './Pages/Chat/Chat'
import Home from './Pages/Home/Home'
import CreateConcalve from './Pages/CreateConclave/CreateConclave'
import BookmarkedConclaves from './Pages/BookmarkedConclaves/BookmarkedConclaves'
import MyConclaves from './Pages/MyConclaves/MyConclaves'

import Spinner from './UI/Spinner/Spinner'
import {ToastContainer} from 'react-toastify'

import {useAuth} from './Store/AuthContext'
import {useConclave} from './Store/ConclaveContext'
import {useEffect} from 'react'
import {useMessage} from './Store/MessageContext'

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
  const {authLoading,token}=useAuth()
  const {conclaveLoading}=useConclave()
  const { pathname } = useLocation();
  const {messageLoading}=useMessage()

  useEffect(() => {
      window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="App">
      <header>
        <NavBar/>
      </header>
      <main className="main-container">
        <Switch>
          <LockLogin path="/sign-up" component={SignUp}/>
          <PrivateLink path="/chat" component={Chat}/>
          <PrivateLink path="/create-conclave" component={CreateConcalve}/>
          <PrivateLink path="/bookmarked-conclaves" component={BookmarkedConclaves}/>
          <PrivateLink path="/my-conclaves" component={MyConclaves}/>
          {token?<PrivateLink path="/" component={Home}/>:<Route path="/" component={SignUp}/>}
        </Switch>
      </main>
      <ToastContainer/>
      {(authLoading||conclaveLoading||messageLoading)&&<Spinner/>}
    </div>
  );
}

export default App;
