import Axios from 'axios';

// Check auth and retrieve account information
export default function getAccount(pin) {
  return Axios.post('https://frontend-challenge.screencloud-michael.now.sh/api/pin/', { pin });
}
