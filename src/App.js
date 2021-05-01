import './App.css';
import {NavBar} from './Components'
import {Switch,Route} from 'react-router-dom'
import SignUp from './Pages/SignUp/SignUp'
import Chat from './Pages/Chat/Chat'
import Home from './Pages/Home/Home'
import {ToastContainer} from 'react-toastify'

function App() {
  return (
    <div className="App">
      <header>
        <NavBar/>
      </header>
      <main className="main-container">
        <Switch>
          <Route path="/sign-up" component={SignUp}/>
          <Route path="/chat" component={Chat}/>
          <Route path="/" component={Home}/>
        </Switch>
      </main>
      <ToastContainer/>
    </div>
  );
}

export default App;
