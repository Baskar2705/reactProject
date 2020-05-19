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
            <div className="bgcolor">
              <span className="paddingLeft">If node space test <span className="TextAlign"><i className="fa fa-close"></i></span></span>
              <span className="transform">
                <div className="box">
                  <span className="Ifclass"></span>
                  <div className="text">
                    IF
                  </div>
                </div>&nbsp;
                <span className="">   If node </span>
              </span>
            </div>
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