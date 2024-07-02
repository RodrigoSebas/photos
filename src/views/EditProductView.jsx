import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  obtenerProductoPorId,
  actualizarProducto,
} from "../services/productService";
import FormProduct from "../components/FormProduct";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { uploadFile } from "../services/storageService";

let imagen;

const EditProductView = () => {
  const [values, setValues] = useState({
    nombre: "",
    descripcion: "",
    foto: "https://loremflickr.com/640/480/fashion"
  });

  //useparams es un objeto, con los parametros del link, se puede desestructurar
  const { id } = useParams();

  const navigate = useNavigate();

  const handleValues = (ev) => {
    console.log(ev.target.name);
    const nombrePropiedad = ev.target.name;
    const valorPropiedad = ev.target.value;
    const newProduct = {
      ...values,
      [nombrePropiedad]: valorPropiedad,
    };
    setValues(newProduct);
  };

  const handleSubmit = async (ev) => {
    //prevenir la accion por defecto
    ev.preventDefault();
    //const resultado = await crearProducto(values);
    const { nombre, descripcion, precio } = values;
    if (nombre === "" || descripcion === "" || precio == 0) {
      Swal.fire({
        title: "Faltan campos por llenar",
        text: "Verifique el formulario",
        icon: "error",
      });
      return;
    }
    const loading = Swal.fire({
      title: "Actualizando producto",
      text: "Espere por favor...",
      icon: "info",
    });

    let urlImagen = "";
    if (imagen !== undefined) {
      urlImagen = await uploadFile(imagen);
    }

    let nuevoProducto = {
      ...values,
    };
    if (urlImagen !== "" && imagen !== undefined) {
      nuevoProducto.foto = urlImagen;
    }

    const resultado = await actualizarProducto(id, nuevoProducto);
    loading.close();
    await Swal.fire({
      title: "Producto actualizado!",
      text: `${values.nombre} se actualizo exitosamente`,
      icon: "success",
    });
    //navegacion , va a hacer esto luego de sweetalert2
    navigate("/");
    console.log(values);
  };

  const handleImage = (ev) => {
    //console.log(ev.target.files[0]);
    imagen = ev.target.files[0];
    //const resName = nameFileUUID(imagen.name)
    //console.log(resName)
  };

  useEffect(() => {
    const getProduct = async () => {
      try {
        const resultado = await obtenerProductoPorId(id);
        setValues(resultado);
      } catch (error) {
        console.log(error);
      }
    };
    getProduct();
  }, []);

  return (
    <FormProduct
      handleValues={handleValues}
      handleImage={handleImage}
      handleSubmit={handleSubmit}
      values={values}
      title={"Editar Producto"}
    />
  );
};

export default EditProductView;
