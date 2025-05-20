import {defineStore} from 'pinia';
import axiosInstance from "../services/auth.api";

export const useAuthStore= defineStore('auth', {
    state: () => ({
        user: null,
        token: localStorage.getItem('token') || null,
        error: null
    }),
    actions:{
        async register(credentials) {
            try {
                const response = await axiosInstance.post('/register', credentials);
                this.token = response.data.token;
                this.user = response.data.user;
                localStorage.setItem('token', this.token);
                axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
                return { success: true, user: this.user };
            } catch (error) {
                this.error = error.response?.data || { message: 'Registration failed' };
                console.error('Registration failed:', error);
                return { success: false, error: this.error };
            }
        },
        async login(credentials) {
            try {
                const response = await axiosInstance.post('/login', credentials);
                this.token = response.data.token;
                this.user = response.data.user;
                localStorage.setItem('token', this.token);
                axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
                return { success: true, user: this.user };
            } catch (error) {
                this.error = error.response?.data || { message: 'Login failed' };
                return { success: false, error: this.error };
            }
        },
        async logout() {
            try {
                await axiosInstance.post('/logout');
                this.token = null;
                this.user = null;
                localStorage.removeItem('token');
                delete axiosInstance.defaults.headers.common['Authorization'];
                return {success: true};
            } catch (error) {
                this.error = error.response?.data || { message: 'Logout failed' };
                console.error('Logout failed:', error);
                return {success: false, error: this.error};
            }
        },
    },
     // Set Axios auth header globally
    setAuthHeader() {
      if (this.token) {
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
      }
    },
    getters: {
        isAuthenticated: (state) => !!state.token,
        getUser: (state) => state.user,
    },
    
});