import axioss from '../../utils/admin/axios';

export async function GetMunicipios() {
    try {
        const response = await axioss.get('/admin/Municipio');
        if (response.status === 200) {
            return {
                error: false,
                data: response.data.data.$values
            };
        }
    } catch (error) {
        console.error('Error al obtener municipios', error.response || error);
        return { error: true, message: error.message || 'Error al obtener municipios' };
    }
}
export async function GetMunicipiosByDepto(id) {
    try {
        const response = await axioss.get(`/admin/Municipio/Departamento/${id}`);
        console.log("API Response:", response);
        // Verificar directamente si $values está presente y es un array
        if (response.status === 200 ) {
            console.log("entra aca?")
            return {
                error: false,
                data: response.data.$values
            };
        } else {
            console.log(" o aca entra?")
            console.log("Unexpected API response structure:", response.data);
            return { error: true, message: 'La respuesta no contiene los datos esperados.' };
        }
    } catch (error) {
        console.error('Error al obtener municipios', error);
        return { error: true, message: error.message || 'Error al obtener municipios' };
    }
}

export async function CreateMunicipio(data) {
    try {
        const response = await axioss.post('/admin/Municipio', data);
        if (response.status === 201) {
            return {
                error: false,
                data: response.data.data
            };
        }
    } catch (error) {
        console.error('Error al crear municipio', error.response || error);
        return { error: true, message: error.message || 'Error al crear municipio' };
    }
}

export async function UpdateMunicipio(id, data) {
    try {
        const response = await axioss.put(`/admin/Municipio/${id}`, data);
        if (response.status === 200) {
            return {
                error: false,
                data: response.data.data
            };
        }
    } catch (error) {
        console.error('Error al actualizar municipio', error.response || error);
        return { error: true, message: error.message || 'Error al actualizar municipio' };
    }
}

export async function GetMunicipioById(id) {
    try {
        const response = await axioss.get(`/admin/Municipio/${id}`);
        if (response.status === 200) {
            return {
                error: false,
                data: response.data
            };
        }
    } catch (error) {
        console.error('Error al obtener municipio', error.response || error);
        return { error: true, message: error.message || 'Error al obtener municipio' };
    }
}

export async function DeleteMunicipio(id) {
    try {
        const response = await axioss.delete(`/admin/Municipio/${id}`);
        if (response.status === 200) {
            return {
                error: false,
                data: response.data
            };
        }
    } catch (error) {
        console.error('Error al eliminar municipio', error.response || error);
        return { error: true, message: error.message || 'Error al eliminar municipio' };
    }
}