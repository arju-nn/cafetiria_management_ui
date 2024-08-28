// src/services/AuthService.js
import axios from 'axios';

class AuthService {
    static adminLogin(data) {
        return axios.post('/api/admin/login', data);
    }
}

export default AuthService;
