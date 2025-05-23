import { defineStore } from 'pinia';
import axiosInstance from "../services/auth.api";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        token: null,
        error: null
    }),
    
    // Initialize store
    hydrate(state) {
        state.token = localStorage.getItem('token');
        if (state.token) {
            this.setAuthHeader();
        }
    },
    
    actions: {
        async authRequest(endpoint, data = {}, isLogout = false) {
            try {
                const response = isLogout 
                    ? await axiosInstance.post(endpoint) 
                    : await axiosInstance.post(endpoint, data);

                if (!isLogout) {
                    this.token = response.data.token;
                    this.user = response.data.user;
                    localStorage.setItem('token', this.token);
                    this.setAuthHeader();
                    return { success: true, user: this.user };
                } else {
                    this.clearAuth();
                    return { success: true };
                }
            } catch (error) {
                const errorMessage = this.getErrorMessage(endpoint, error);
                this.error = error.response?.data || { message: errorMessage };
                console.error(`${errorMessage}:`, error);
                return { success: false, error: this.error };
            }
        },

        /**
         * Get appropriate error message based on the endpoint
         */
        getErrorMessage(endpoint, error) {
            const messages = {
                '/register': 'Registration failed',
                '/login': 'Login failed',
                '/logout': 'Logout failed'
            };
            return messages[endpoint] || 'Request failed';
        },

        /**
         * Clear authentication state
         */
        clearAuth() {
            this.token = null;
            this.user = null;
            localStorage.removeItem('token');
            delete axiosInstance.defaults.headers.common['Authorization'];
        },

        // Public auth methods
        async register(credentials) {
            return this.authRequest('/register', credentials);
        },

        async login(credentials) {
            return this.authRequest('/login', credentials);
        },

        async logout() {
            return await this.authRequest('/logout', {}, true);
        },

        // Set Axios auth header globally
        setAuthHeader() {
            if (this.token) {
                axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
            }
        },
    },
    
    getters: {
        isAuthenticated: (state) => !!state.token,
        getUser: (state) => state.user,
    },
});