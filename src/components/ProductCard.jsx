import { useContext } from "react"; //para poder acceder a un contexto
import { Link } from "react-router-dom";
import useAxios from "../hooks/useAxios";

const ProductCard = ({ product, handleEliminar}) => {
  //const URL = import.meta.env.VITE_ENDPOINT_BASE;
  const { nombre, descripcion, id, foto } = product;
  /*const handleEliminar = async (id) => {
    const resultado = await useAxios(`${URL}/photos/${id}`,{method:"delete"});
    console.log(resultado);
  }*/
  return (
    <div>
      <div className="bg-gray-200 p-4 rounded-md shadow-lg">
        <div className="bg-white rounded-md overflow-hidden shadow-lg max-w-md mx-auto relative">
          <img src={foto} className="w-full h-64 object-cover" />
        </div>
        <div className="p-4">
          <h4 className="text-md font-semibold mb-2">{nombre}</h4>
          <p className="text-sm text-gray-800 mb-2 truncate">{descripcion}</p>
          <div className="flex justify-end pt-2">
            <Link
              to={`/editphoto/${id}`}
              className="bg-sky-800 text-white hover:bg-sky-700 rounded-r-md px-2 py-1"
            >
              <i className="fa-solid fa-pen-to-square"></i>
            </Link>
            <button
              onClick={() => {handleEliminar(id)}}
              className="bg-sky-800 text-white hover:bg-sky-700 rounded-r-md px-2 py-1"
            >
              <i className="fa-solid fa-trash"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
