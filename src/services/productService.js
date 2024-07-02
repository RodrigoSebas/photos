import axios from "axios"

const URL = import.meta.env.VITE_ENDPOINT_BASE

const obtenerProductos = async () => {
    try{
        const res = await axios.get(`${URL}/photos`)
        if(res.status === 200){
            return res.data
        }
        throw new Error("Error al obtener la data")
        //console.log(res)
    }catch (error) {
        throw error;
    }
}


const crearProducto = async (producto) => {
    try {
        const respuesta = await axios.post(`${URL}/photos`, producto);
        console.log(respuesta)
        return respuesta.data

    } catch (error) {
        throw error;
    }
}

const obtenerProductoPorId = async (id) => {
    try{
        const respuesta = await axios.get(`${URL}/photos/${id}`)
        return respuesta.data
    }catch(error){
        throw error
    }

}

const actualizarProducto = async (id, producto) => {
    try {
        const respuesta = await axios.put(`${URL}/photos/${id}`, producto);
        return respuesta.data
    } catch (error) {
        throw error
    }
}

const eliminarProducto = async (id) => {
    try {
        const respuesta = await axios.delete(`${URL}/photos/${id}`);
        console.log(respuesta)
        return respuesta.data
    } catch (error) {
        throw error;
    
    }
}




export {
    obtenerProductos,
    crearProducto,
    obtenerProductoPorId,
    actualizarProducto,
    eliminarProducto
}