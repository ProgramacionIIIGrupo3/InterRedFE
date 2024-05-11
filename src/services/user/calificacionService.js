import axioss from '../../utils/admin/axios';

export async function InsertCalificacion(data) {
    try {
        const response = await axioss.post('/user/Calificacion', data);
        if (response.status === 201) {
            return response.data;
        }
    } catch (error) {
        console.error('Error al crear calificacion', error.response || error);
        return { error: true, message: error.message || 'Error al crear calificacion' };
    }
}