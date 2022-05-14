import * as React from "react";
import { Button } from "office-ui-fabric-react";
import { createEventOnkzynpstr } from "../../api/index"
import _ from 'lodash';

const CreateEvent = (props) => {
  const createEvent = () => {
    const { getMeetingData, startLoader, stopLoader, clearError } = props; 
    startLoader();
    getMeetingData();
    createEventOnkzynpstr(props).then( response => {
      if(response.status == 201){
        return response.json()
      } else {
        console.log('Error in', response);
      }
    }).then( data => {
      const meetingLink = data.meeting_link;
      Office.context.mailbox.item.body.setAsync(meetingLink);
      Office.context.mailbox.item.location.setAsync(meetingLink);
      props.updateMeetingUrl(meetingLink);
      clearError();
      stopLoader();
    }).catch( err => {
      console.log('Error in', err);
      stopLoader();
    });
  }
  

  return(
    <Button className="updateEvent kzynpstrBtn" onClick={createEvent}>Create Event</Button>
  )
}

export default CreateEvent;