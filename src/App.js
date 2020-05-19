import React, { Component } from 'react';
import './App.css';
import DataFound from './DataFound';

class App extends Component {
  
  SetActiveState = (event) => {
    event.preventDefault();
  }

  render() {
    return (
      <div className="container" >
        <div className="row ">
          <div className="col-sm-3"></div>
          <div className="col-sm-6 Center">
              <h3>If Node space test <i className="fa fa-close TextAlign" aria-hidden="true" ></i></h3>
             <span className="transform"> 
              {/* <span className="Ifclass">if</span> */}
              <span> If Node </span> 
            </span>
            <div className="row FullClass">
              <div className="col-sm-6 Header Active" id="Condition" onClick={this.SetActiveState}>Condition </div>
              <div className="col-sm-6 Header " id="Description" onClick={this.SetActiveState}>Description</div>
            </div>
            <DataFound />
          </div>
          <div className="col-sm-3"></div>
        </div>
      </div>
    );
  }
}
export default App;