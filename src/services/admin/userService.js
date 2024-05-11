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
        
export async function GetUsers () {
    try {
        const response = await axioss.get('/admin/Usuario');
        if (response.status === 200) {
            return response.data.data.$values;
        }
    }
    catch (error) {
        console.error('Error al obtener usuarios', error.response || error);
        return { error: true, message: error.message || 'Error al obtener usuarios' };
    }
}