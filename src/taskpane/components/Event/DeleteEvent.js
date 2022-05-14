import * as React from "react";
import { Button } from "office-ui-fabric-react";
import { deleteEventOnkzynpstr } from "../../api/index"

const DeleteEvent = (props) => {
  const deleteEvent = () => {
    const { getMeetingData, setError, startLoader, stopLoader, clearError } = props; 
    startLoader();
    getMeetingData();
    deleteEventOnkzynpstr(props).then( response => {
      if(response.status == 200){
        return response.json();
      } else if (response.status == 404) {
        setError('Unable to find meeting on kzynpstr');
      } else {
        console.log('Error in', response);
      }
    }).then( data => {
      if (data){
        Office.context.mailbox.item.body.setAsync('');
        Office.context.mailbox.item.location.setAsync('');
        props.updateMeetingUrl('');
        clearError();
      }
      stopLoader();
    }).catch( err => {
      console.log('Error in', err);
      stopLoader();
    });
  }

  return(
    <Button className="kzynpstrBtn" onClick={deleteEvent}>Delete Event</Button>
  )
}

export default DeleteEvent;
