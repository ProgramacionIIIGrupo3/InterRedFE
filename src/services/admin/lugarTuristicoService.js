import axios from "../../utils/admin/axios"; // Cambia 'axioss' a 'axios' si fue un error tipográfico

export async function GetLugaresTuristicos() {
    try {
        const response = await axios.get('/admin/LugarTuristico');
        if (response.status === 200) {
            return {
                error: false,
                data: response.data.data.$values // Asegúrate de que el acceso a la propiedad es correcto
            };
        }
    } catch (error) {
        console.error('Error al obtener lugares turisticos', error.response || error);
        return { error: true, message: error.message || 'Error al obtener lugares turisticos' };
    }
}

//funcion para crear en multipart/form-data
export async function CreateLugarTuristico(data) {
    try {
        const response = await axios.post('/admin/LugarTuristico', data);
        if (response.status === 201) {
            return response.data;
        }
    } catch (error) {
        console.error('Error al crear lugar turistico', error.response || error);
        return { error: true, message: error.message || 'Error al crear lugar turistico' };
    }
}

export async function UpdateLugarTuristico(data) {
    try {
        const response = await axios.put(`/admin/LugarTuristico/${data.id}`, data);
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.error('Error al actualizar lugar turistico', error.response || error);
        return { error: true, message: error.message || 'Error al actualizar lugar turistico' };
    }
}