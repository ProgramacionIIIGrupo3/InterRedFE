import axioss from "../../utils/admin/axios";

export async function GetDepartamentos () {
    try {
        const response = await axioss.get('/admin/Departamento');
        if (response.status === 200) {
            return {
                error: false,
                data: response.data.data.$values
            };
        }
    } catch (error) {
        console.error('Error al obtener departamentos', error.response || error);
        return { error: true, message: error.message || 'Error al obtener departamentos' };
    }
}

export async function GetDepartamentoById (id) {
    try {
        const response = await axioss.get(`/admin/Departamento/${id}`);
        if (response.status === 200) {
            return {
                error: false,
                data: response.data
            };
        }
    } catch (error) {
        console.error('Error al obtener departamento', error.response || error);
        return { error: true, message: error.message || 'Error al obtener departamento' };
    }
}

export async function UpdateDepartamento (data) {
    try {
        const response = await axioss.put(`/admin/Departamento/${data.id}`, data);
        conlose.log("API Response:", response);
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.error('Error al actualizar departamento', error.response || error);
        return { error: true, message: error.message || 'Error al actualizar departamento' };
    }
}