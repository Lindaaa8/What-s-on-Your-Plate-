import React, { Component } from 'react';
import Upload from './components/Upload';
import Highlight from './components/Highlight';
import Header from './components/Header';
import Card from './components/Card';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';



class App extends Component {
  constructor() {
    super();
    this.state={
        show: false
    }
}

showModal = e => {
    this.setState({
      show: !this.state.show
    });
  };

onClick = (e) => {
    this.showModal();
  }

onClose = e => {
this.props.onClose && this.props.onClose(e);
};

  render() {
    return (
      <>
        <Router>
          <div className="App">
            <Header/>
            <Switch>
              <Route path="/myplate/:id" component={Card}/>
              <Route path='/home' component={Highlight}/>
              <Route path='/myplate' component={Upload} />
              <Route path='/inspiration'/>
              <Route exact path='/' render={()=>(<Redirect to='/home' /> )} />
            </Switch>
          </div>
        </Router>
      </>
    );
  }
}

export default App;
