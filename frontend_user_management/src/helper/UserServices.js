import axios from 'axios';

const USER_API_BASE_URL = 'http://localhost:8080/user';

class UserServices {

    createUser(user){
        return axios.post(USER_API_BASE_URL+'/createUser',user);  
    }
    loginUsers(loginUser){
        return axios.post(USER_API_BASE_URL+'/login',loginUser); 
    }
    fetchUsers() {
        return axios.get(USER_API_BASE_URL+'/getAll');
    }

    fetchUserById(userId) {
        return axios.get(USER_API_BASE_URL + '/getUserById/' + userId);
    }

    updateAccountNumberForUser(userAccount) {
        return axios.put(USER_API_BASE_URL + '/updateAccountNumber', userAccount);
    }
}

const userServices = new UserServices();
export default userServices;
