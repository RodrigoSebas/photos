import { useState } from "react"
import { crearProducto } from "../services/productService";
import { useNavigate } from "react-router-dom";
import { uploadFile } from "../services/storageService";
import { nameFileUUID } from "../utils/utils";
import FormProduct from "../components/FormProduct";
//sweetalert2

import Swal from "sweetalert2";

let imagen;

const CreateProductView = () => {
    const [values, setValues] = useState({
        nombre:"",
        descripcion:"",
        foto:"https://loremflickr.com/640/480/fashion",
        
    });

    //navigate es una funcion
    const navigate = useNavigate();

    const handleValues = (ev) => {
        console.log(ev.target.name);
        const nombrePropiedad = ev.target.name;
        const valorPropiedad = ev.target.value;
        const newProduct = {
            ...values,
            [nombrePropiedad]:valorPropiedad
        }
        setValues(newProduct)
    }

    const handleSubmit = async (ev) => {
        //prevenir la accion por defecto
        ev.preventDefault();
        //const resultado = await crearProducto(values);
        const {nombre, descripcion, precio} = values;
        if(nombre==="" || descripcion==="" || precio==0) {
            Swal.fire({
                title: "Faltan campos por llenar",
                text: "Verifique el formulario",
                icon:"error"
            })
            return;
        }
        const loading = Swal.fire({
            title: "Creando producto",
            text: "Espere por favor...",
            icon:"info"
        })


        const urlImagen = await uploadFile(imagen);
        
        let nuevoProducto = {
            ...values
        }
        if(urlImagen !== ""){
            nuevoProducto.foto = urlImagen;
        }

        const resultado = await crearProducto(nuevoProducto)
        loading.close()
        await Swal.fire({
            title:"Producto creado!",
            text: `${values.nombre} se creo exitosamente`,
            icon: "success"
        })
        //navegacion , va a hacer esto luego de sweetalert2
        navigate("/")
        console.log(values)
    }

    const handleImage = (ev) => {
        //console.log(ev.target.files[0]);
        imagen = ev.target.files[0];
        //const resName = nameFileUUID(imagen.name)
        //console.log(resName)

    }

  return (
    <FormProduct handleValues={handleValues} handleImage={handleImage} handleSubmit={handleSubmit} values={values} title="Crear Producto"/>
  )
}

export default CreateProductView