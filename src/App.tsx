import './App.scss';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <Router>
      <div className="wrapper">
        <Header /> 
        <Route exact path='/' component={HomePage} /> 
      </div>

    </Router>
    
    
  );
}

export default App;
