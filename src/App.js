import React, { Component } from 'react';
import './App.css';
import DataFound from './DataFound';
import NoData from './NoData';
import * as jwt from 'atlassian-jwt'
import moment from 'moment';
class App extends Component {
  SetActiveState = (event) => {
    event.preventDefault();
  }
  

  componentDidMount(){
    fetch('https://www.reddit.com/r/reactjs.json')
    .then((result) => {
      return result.json();
    }).then((jsonResult) => {
      // Do something with the result
      alert('Data call from api '+JSON.stringify(jsonResult.data.children[0]));
    })
    const now = moment().utc();
    const req: jwt.Request = jwt.fromMethodAndUrl('GET', '/rest/resource/you/want');
    const tokenData = {
      "iss": 'issuer-val',
      "iat": now.unix(),                    // The time the token is generated
      "exp": now.add(3, 'minutes').unix(),  // Token expiry time (recommend 3 minutes after issuing)
      "qsh": jwt.createQueryStringHash(req) // [Query String Hash](https://developer.atlassian.com/cloud/jira/platform/understanding-jwt/#a-name-qsh-a-creating-a-query-string-hash)
    };
    const secret = 'Baskar@2705';
    const token = jwt.encode(tokenData, secret);
    console.log(token);



    // decode
    console.log(jwt.decode(token, secret, 'HS512'));

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
              <div className="col-sm-6 Header Active" id="Condition" onClick={this.SetActiveState}>ConditionTest </div>
              <div className="col-sm-6 Header " id="Description" onClick={this.SetActiveState}>Description</div>
            </div>
            <DataFound />
          </div>
          <div className="col-sm-3">
            <form className="aui">
                <div className="field-group">
                    <label for="required-input">Field<span className="aui-icon icon-required">required</span></label>
                    <input id="required-input" type="text" className="text" />
                </div>
            </form>
          </div>
        </div>
      </div> 
    );
  }
}
export default App;