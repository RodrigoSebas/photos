import { useState, useEffect } from "react";
import ListProducts from "../components/ListProducts";
import useAxios from "../hooks/useAxios";
import { obtenerProductos, eliminarProducto } from "../services/productService";
import Swal from "sweetalert2";

const AllProductView = () => {
  //const URL = import.meta.env.VITE_ENDPOINT_BASE;

  const [data, setData] = useState([]);
  const getProductos = async () => {
    const prods = await obtenerProductos();
    setData(prods);
  };

  const handleEliminar = async (id) => {
    console.log("id", id);
    const resultadoUsuario = await Swal.fire({
      title: "Desea eliminar el producto?",
      text: "Esta accion es irreversible",
      confirmButtonText: "Si, deseo eliminarlo",
      showCancelButton: true,
      cancelButtonText: "No, no deseo eliminarlo",
    });
    const { isConfirmed, isDismissed } = resultadoUsuario;
    if (isConfirmed) {
      console.log(id)
      const resultadoEliminar = await eliminarProducto(id);
      Swal.fire({
        title: "Producto eliminado",
        text: "Se elimino correctamente.",
        icon: "success",
      });
      getProductos();
    }
  };

  useEffect(() => {
    const getProductos = async () => {
      const prods = await obtenerProductos();
      setData(prods);
    };
    getProductos();
  }, []);

  return (
    <div>
      <ListProducts products={data} handleEliminar={handleEliminar} />
    </div>
  );
};

export default AllProductView;
