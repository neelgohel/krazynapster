import * as React from "react";
import CreateEvent from './CreateEvent'
import UpdateEvent from './UpdateEvent'
import DeleteEvent from './DeleteEvent'
import { MEETING_ROOT_URL } from '../../api/index';

class Event extends React.Component {
  state = {
    title: '',
    end_time: '',
    start_time: '',
    emails: [],
    meetingUrl: ''
  }
  
  componentDidMount(){
    Office.context.mailbox.item.location.getAsync(this.getMeetingUrl);
  }

  getMeetingData = (_callback) => {
    Office.context.mailbox.item.subject.getAsync(this.getTitle);
    Office.context.mailbox.item.start.getAsync(this.getStartTime);
    Office.context.mailbox.item.end.getAsync(this.getEndTime);
    Office.context.mailbox.item.requiredAttendees.getAsync(this.getEmails);
    Office.context.mailbox.item.optionalAttendees.getAsync(this.getEmails);
    Office.context.mailbox.item.location.getAsync(this.getMeetingUrl);

    setTimeout(()=>{
      _callback(this.state)
    }, 2000);
  }
  
  updateMeetingUrl = (link) =>{
    this.setState({
      meetingUrl: link
    })
  }
  
  formatTime = time => {
    let arr = time.format().split(' ');
    return `${arr[1]} ${arr[2]}, ${arr[3]} ${arr[4]}`;
  }
  
  
  getTitle = (asyncResult) => {
    this.setState({
      title: asyncResult.value
    })
  }

  getStartTime = (asyncResult) => {
    this.setState({
      start_time: this.formatTime(asyncResult.value)
    })
  }

  getEndTime = (asyncResult) => {
    this.setState({
      end_time: this.formatTime(asyncResult.value)
    })
  }

  getEmails = (asyncResult) => {
    let list = this.state.emails;
    list = list.concat(asyncResult.value.map( a => a.emailAddress ));
    this.setState({
      emails: [...new Set(list)]
    })
  }

  
  getMeetingUrl = (asyncResult) =>{
    this.setState({
      meetingUrl: asyncResult.value
    })
  }

  render(){
    const { title, start_time, end_time, emails, meetingUrl } = this.state;
    const { error } = this.props;
    const commonProps = {
      ...this.state, ...this.props,
      getMeetingData: (_callback) => this.getMeetingData(_callback),
      updateMeetingUrl: (link) => this.updateMeetingUrl(link)
    }
    return(
      <>
        <div className="header ms-events">
          {meetingUrl.indexOf(MEETING_ROOT_URL) >= 0 ?
            (
              <>
                <UpdateEvent {...commonProps} />
                <DeleteEvent {...commonProps} />
              </>
            ) :
            <CreateEvent {...commonProps} />}
        </div>
        <div className="eventData">
          <br/>
          { error !== '' && <label className="error">{error}</label> }
          <br/>
          { title !== '' && <label>Title: {title}</label> }
          <br/>
          { start_time !== '' && <label>Start Time: {start_time}</label> }
          <br/>
          { end_time !== '' && <label>End Time: {end_time}</label> }
          <br/>
          { emails.length > 0 && <label>E-Mails: {emails.join(', ')}</label> }
        </div>
      </>
    )

  }
}

export default Event;