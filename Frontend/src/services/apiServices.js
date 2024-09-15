import apiClient from "./apiClient";

class ApiServices {
    constructor(client = apiClient) {
        this.client = client;
    }

    // Add a method to set the JWT token
    setAuthToken(token) {
        if (token) {
            localStorage.setItem('jwtToken', token);
            this.client.defaults.headers['Authorization'] = `Bearer ${token}`;
        } else {
            localStorage.removeItem('jwtToken');
            delete this.client.defaults.headers['Authorization'];
        }
    }

    // Add a method to get the JWT token
    getAuthToken() {
        return localStorage.getItem('jwtToken');
    }

    get(url, params = {}) {
        return this.client.get(url, { params });
    }

    post(url, data) {
        return this.client.post(url, data);
    }

    put(url, data) {
        return this.client.put(url, data);
    }

    delete(url, data) {
        return this.client.delete(url, data);
    }
}

export default new ApiServices();
