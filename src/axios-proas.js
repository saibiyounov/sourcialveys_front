import axios from 'axios';
const instance = axios.create({
	//headers: {
    //    Pragma: 'no-cache'
    //},
    baseURL: process.env.REACT_APP_API_URL
    //baseURL: 'http://localhost/ws/'
    // headers: {
    //      'Authorization':  'Bearer ' + localStorage.getItem("token")
    // }
})

export default instance