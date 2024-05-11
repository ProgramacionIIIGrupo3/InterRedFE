import axioss from '../../utils/admin/axios';

export async function InsertVisita(data) {
    try {
        const response = await axioss.post('/user/Visita', data);
        if (response.status === 201) {
            return response.data;
        }
    } catch (error) {
        console.error('Error al crear visita', error.response || error);
        return { error: true, message: error.message || 'Error al crear visita' };
    }
}
