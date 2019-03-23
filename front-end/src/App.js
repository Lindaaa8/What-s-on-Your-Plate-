import React, { Component } from 'react';
import UploadFood from './components/UploadFood';
import Upload from './components/Upload';
import Highlight from './components/Highlight';
import Header from './components/Header';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';


class App extends Component {
  render() {
    return (
      <>
        <Router>
          <div className="App">
            <Header/>
            <Switch>
              <Route path='/home' component={Highlight}/>
              <Route path='/myplate' component={Upload} />
              <Route path='/inspiration' />
              <Route exact path='/' render={()=>(<Redirect to='home' /> )} />
            </Switch>
          </div>
        </Router>
      </>
    );
  }
}

export default App;
