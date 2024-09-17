import axios from 'axios';

// Create Axios instance
const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,  // Your backend API URL
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to attach the JWT token to every request
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('jwtToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle authorization errors globally (optional)
apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            // Handle unauthorized access, for example, redirect to login page
            alert('Session expired, please log in again.');
            // Optionally, you can clear the token and redirect:
            localStorage.removeItem('jwtToken');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default apiClient;
