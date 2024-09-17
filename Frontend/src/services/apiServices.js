import apiClient from "./apiClient";

class ApiServices {
    constructor(client = apiClient) {
        this.client = client;

        // Check if token exists in localStorage and set the Authorization header
        const token = this.getAuthToken();
        if (token) {
            this.setAuthToken(token);  // This will ensure the token is in localStorage and accessible
        }
    }

    // Set the JWT token (stores it in localStorage)
    setAuthToken(token) {
        if (token) {
            localStorage.setItem('jwtToken', token);
        } else {
            localStorage.removeItem('jwtToken');
        }
    }

    // Retrieve the JWT token from localStorage
    getAuthToken() {
        return localStorage.getItem('jwtToken');
    }

    // Method for making a GET request
    get(url, params = {}) {
        return this.client.get(url, { params });
    }

    // Method for making a POST request
    post(url, data) {
        return this.client.post(url, data);
    }

    // Method for making a PUT request
    put(url, data) {
        return this.client.put(url, data);
    }

    // Method for making a DELETE request
    delete(url, data) {
        return this.client.delete(url, { data });
    }
}

export default new ApiServices();
