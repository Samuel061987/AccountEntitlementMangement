import axios from 'axios';
const USER_API_BASE_URL = 'http://localhost:8080/user';

class UserServices {
  
    createUser(user){
        return axios.post(USER_API_BASE_URL+'/createUser',user);  
    }
    loginUsers(loginUser){
        return axios.post(USER_API_BASE_URL+'/login',loginUser); 
    }
    fetchUsers(token) {
        return axios.get(USER_API_BASE_URL+'/getAll',{
            headers: {
              'Authorization': token
            }});
    }

    fetchUserById(userId,token) {
        return axios.get(USER_API_BASE_URL + '/getUserById/' + userId,{
            headers: {
              'Authorization': token
            }});
    }

    updateAccountNumberForUser(userAccount,userId,token) {
        return axios.put(USER_API_BASE_URL + '/updateAccountNumber/'+userId, userAccount,{
            headers: {
              'Authorization': token
            }});
    }
}

const userServices = new UserServices();
export default userServices;
