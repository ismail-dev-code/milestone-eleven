import axios from 'axios';
import React from 'react';
import useAuth from './useAuth';
import Swal from 'sweetalert2';

const axiosInstance = axios.create({
    baseURL: 'https://career-linker-server-hub.vercel.app'
});

const useAxiosSecure = () => {
    const { user, signOutUser } = useAuth();

    // Request interceptor
    axiosInstance.interceptors.request.use(config => {
        if (user?.accessToken) {
            config.headers.authorization = `Bearer ${user.accessToken}`;
        }
        return config;
    });

    // Response interceptor
    axiosInstance.interceptors.response.use(response => {
        return response;
    }, error => {
        const status = error.response?.status;

        if (status === 401 || status === 403) {
            // Show SweetAlert2 popup
            Swal.fire({
                icon: 'error',
                title: 'Unauthorized',
                text: 'Your session has expired or access is denied. You will be logged out.',
                confirmButtonText: 'OK'
            }).then(() => {
                // Sign out the user
                signOutUser()
                    .then(() => {
                        console.log('Signed out due to 401 or 403 error');
                    })
                    .catch(err => {
                        console.error(err);
                    });
            });
        }

        return Promise.reject(error);
    });

    return axiosInstance;
};

export default useAxiosSecure;
