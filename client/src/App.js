import React ,{Component} from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import './App.css';
import Navbar from './component/layout/Navbar';
import Landing from './component/layout/Landing';
import Footer from './component/layout/Footer';
import register from './component/auth/register';
import login from './component/auth/login';

class App extends Component {
  render(){
  return (
    <Router>
    <div className="App"> 
    <Navbar />
      <Route exact path="/" component={Landing} />
      <div className="container">
      <Route exact path="/register" component={register}/>
      <Route exact path="/login" component={login}/>
      </div>
      <Footer />
    </div>
    </Router>
  );
 }
}

export default App;
