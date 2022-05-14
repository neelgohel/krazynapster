import * as React from "react";
import { Button } from "office-ui-fabric-react";
import Header from "../Header";
import { loginUser } from '../../api/index';

class LoginForm extends React.Component {
  state = {
    email: '',
    password: ''
  }

  login = () => {
    const { email, password } = this.state;
    const { changeUserLoginState, setError, startLoader, stopLoader, clearError } = this.props;
    startLoader();
    loginUser(email, password).then(
      response => {
        if (response.status === 200){
          let token = response.headers.get("Authorization");
          if(token){
            localStorage.setItem('userToken', token);
            changeUserLoginState(token);
          }
          return response.json();
        } else {
          setError('Invalid Email Or Password')
        }
      }
    ).then( data => {
      localStorage.setItem('calendarUUID', data.primary_calendar.uuid);
      clearError();
      stopLoader();
    }).catch(err => {
      console.log('Error in', err);
      stopLoader();
    });
  }

  render(){
    const { email, password } = this.state;
    const { error } = this.props;
    return(
      <div className="ms-welcome">
        {error !== '' && 
          <div className="ms-Grid">
            <div className="ms-Grid-row">
              <div className="ms-Grid-col ms-u-sm12 ms-u-md8 ms-u-lg10 error">
                {error}
              </div>
            </div>
          </div>}        
        <div className="ms-Grid">
          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-u-sm12 ms-u-md8 ms-u-lg10">
              <input type="email" className="ms-TextField-field" placeholder="E-Mail" value={email} onChange={ e => this.setState({email: e.target.value})} />
            </div>
          </div>
        </div>
        <div className="ms-Grid">
          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-u-sm12 ms-u-md8 ms-u-lg10">
              <input type="password" className="ms-TextField-field" placeholder="Password" value={password} onChange={ e => this.setState({password: e.target.value})} />
            </div>
          </div>
        </div>
        <div className="ms-Grid">
          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-u-sm12 ms-u-md8 ms-u-lg10">
              <Button className="kzynpstrBtn loginBtn" onClick={this.login} disabled={!email || !password}>Login</Button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default LoginForm;