import './App.css';
import {NavBar} from './Components'
import {Switch,Route} from 'react-router-dom'
import SignUp from './Pages/SignUp/SignUp'
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
        </Switch>
      </main>
      <ToastContainer/>
    </div>
  );
}

export default App;
