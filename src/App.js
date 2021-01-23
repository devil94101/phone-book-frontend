
import './App.css';
import Contacts from './Components/Contacts'
import {BrowserRouter as Router ,Switch,Route} from 'react-router-dom'
import Login from './Components/auth';
function App() {
  return (
    <div >
      <Router>

        <Switch>
          <Route path="/" exact ><Contacts></Contacts></Route>
          <Route path="/login" exact><Login></Login></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
