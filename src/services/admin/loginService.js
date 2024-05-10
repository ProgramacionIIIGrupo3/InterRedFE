import axioss from '../../utils/admin/axios';

export async function logIn(data) {
    try {
        const response = await axioss.post('/admin/Usuario/login', data);
        if (response.status === 200) {
            localStorage.setItem('token', response.data.token);
            window.location.href = '/admin';
        }
        return response.data;
        }catch (error) {
            consolo.error('Error al iniciar sesion', error.response || error);
            return {error: true, message: error.message || 'Error al iniciar sesion'};
        }
}