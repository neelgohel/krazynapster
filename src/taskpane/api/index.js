export const ROOT_URL = 'https://0f4b1e6d.ngrok.io'
export const MEETING_ROOT_URL = 'https://kzynpstr.io'

const HEADERS = {
  'Content-Type': 'application/json',
  'Accept': "application/json",
}

function requestOptions(method, payload, authRequired = false) {
  let headers = HEADERS;
  if (authRequired){
    headers['Authorization'] = localStorage.getItem('userToken');
  }
  return {
    method: method,
    headers: headers, 
    body: JSON.stringify(payload)
  }
}

export function loginUser(email, password){
  const options = requestOptions('POST', { user: { login: email, password: password } });
  return fetch(`${ROOT_URL}/users/sign_in`, options)
}

export function createEventOnkzynpstr(data){
  const options = requestOptions('POST', data, true);
  return fetch(`${ROOT_URL}/calendars/${localStorage.getItem('calendarUUID')}/appointment_from_google`, options);
}

export function updateEventOnkzynpstr(data){
  const options = requestOptions('PUT', data, true);
  return fetch(`${ROOT_URL}/update_from_gcal_save_button`, options);
}

export function deleteEventOnkzynpstr(data){
  const options = requestOptions('PUT', data, true);
  return fetch(`${ROOT_URL}/delete_from_gcal_delete_button`, options);
}
