import axios from 'axios';

const axioss = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

axioss.interceptors.request.use(function (config) {
    var splittedUrl = config.url.split('/');
    var found=splittedUrl.find(item=>item.includes('admin'));

    if (found) {
        config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

axioss.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    var splittedUrl = error.config.url.split('/');
    var found=splittedUrl.find(item=>item.includes('admin'));

    if (found) {
        if (error.response.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
    }
    return Promise.reject(error);
}
);

export default axioss;