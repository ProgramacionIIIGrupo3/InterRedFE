import axioss from '../../utils/admin/axios';

export async function UpdateUser(data) {
    try {
        const response = await axioss.put(`/admin/Usuario/${data.id}`, data);
        if (response.status === 200) {
            return response.data;
        }
    }
    catch (error) {
        console.error('Error al actualizar usuario', error.response || error);
        return { error: true, message: error.message || 'Error al actualizar usuario' };
    }
}
        