import * as React from "react";
import { Button } from "office-ui-fabric-react";

const LogOut = (props) => {
  const { startLoader, stopLoader, changeUserLoginState, clearError } = props;

  const logOutUser = () => {
    startLoader();
    localStorage.removeItem('userToken');
    localStorage.removeItem('calendarUUID');
    changeUserLoginState(null);
    clearError();
    stopLoader();
  }
  
  return (
    <>
      <div className="logOutDiv">
        <Button className="kzynpstrBtn" onClick={logOutUser}>Log Out</Button>
      </div>
    </>
  );
}

export default LogOut;