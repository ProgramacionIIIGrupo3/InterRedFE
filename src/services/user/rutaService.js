import axios from "../../utils/admin/axios"; 

export async function GetRutas(origen, fin){
    try{
        const response = await axios.get(`/Ruta/ruta/${origen}/${fin}?numeroDeRutas=5`);
        console.log(response)
        if(response.status === 200){
            return{
                error: false,
                data: response.data.rutas.$values
            }   
        }
    }catch(error){
        console.error('Error al obtener rutas', error.response || error);
        return { error: true, message: error.message || 'Error al rutas' };
    }
}

export async function GetTop10Cercanos(){
    try{
        const response = await axios.get(`/Ruta/Top10Cercanos`);
        if(response.status === 200){
            return {
                error: false,
                data: response.data.$values
            }
        }
    }catch(error){
        console.error('Error al obtener rutas', error.response || error);
        return { error: true, message: error.message || 'Error al rutas' };       
    }
}

export async function GetTop10Lejanos(){
    try{
        const response = await axios.get(`/Ruta/Top10Lejanos`);
        if(response.status === 200){
            return {
                error: false,
                data: response.data.$values
            }
        }
    }catch(error){
        console.error('Error al obtener rutas', error.response || error);
        return { error: true, message: error.message || 'Error al rutas' };   
    }
}
