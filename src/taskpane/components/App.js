import * as React from "react";
import Progress from "./Progress";
import LoginForm from "./Auth/LoginForm";
import LogOut from "./Auth/LogOut";
import Event from "./Event/index";
import { Spinner, SpinnerType } from "office-ui-fabric-react";

export default class App extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      loading: true,
      userToken: localStorage.getItem('userToken') || null,
      error: ''
    };
  }

  setError = (err) => {
    this.setState({
      error: err
    })
  } 

  clearError = () =>{
    this.setError('');  
  }

  startLoader = () => {
    this.setState({
      loading: true
    })
  }

  stopLoader = () => {
    this.setState({
      loading: false
    })
  }

  changeUserLoginState = (val) => {
    this.setState({
      userToken: val,
      loading: false
    });
  }

  componentDidMount(){
    this.stopLoader();
  }

  render() {
    const { title, isOfficeInitialized } = this.props;

    if (!isOfficeInitialized) {
      return (
        <Progress title={title} logo="assets/logo-filled.png" message="Please sideload your addin to see app body." />
      );
    }

    const { userToken, loading, error } = this.state;
    if(loading) {
      return <Spinner type={SpinnerType.large} label="Please Wait..." />
    }

    const commonProps = {
      error: error,
      startLoader: () => this.startLoader(),
      stopLoader: () => this.stopLoader(),
      setError: (err) => this.setError(err),
      clearError: () => this.clearError()
    };

    if(userToken){
      return (
        <>
          <Event {...commonProps} />
          <div className="footer"><LogOut {...commonProps} changeUserLoginState={this.changeUserLoginState} /></div>
        </>
      )
    } else {
      return <LoginForm {...commonProps} changeUserLoginState={this.changeUserLoginState} />
    }
  }
}
