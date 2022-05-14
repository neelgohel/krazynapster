import * as React from "react";
import { Button } from "office-ui-fabric-react";
import { updateEventOnkzynpstr } from "../../api/index"

const UpdateEvent = (props) => {
  const updateEvent = () => {
    const { getMeetingData } = props; 
    getMeetingData(updatekzynpstrEvent);
  }

  const updatekzynpstrEvent = (meetingData) => {
    console.log('meetingData', meetingData);
    const {  startLoader, stopLoader, setError, clearError } = props;
    startLoader();
    updateEventOnkzynpstr(meetingData).then( response => {
        if(response.status == 200){
          return response.json()
        } else if (response.status == 404) {
          setError('Unable to find meeting on kzynpstr');
        } else {
          console.log('Error in', response);
        }
      }).then( data => {
        if(data) clearError();
        stopLoader();
      }).catch( err => {
        console.log('Error in', err);
        stopLoader();
      });
  }

  return(
    <Button className="updateEvent kzynpstrBtn" onClick={updateEvent}>Update Event</Button>
  )
}

export default UpdateEvent;