const FormProduct = ({ handleValues, handleImage, handleSubmit, values, title}) => {
    return (
      <div className="container pt-4">
          <h1 className="mb-4 font-medium text-4xl ms-4">
              {title}
          </h1>
  
          <form onSubmit={handleSubmit}>
  
          <div className="mb-3">
              <label className="mb-2" htmlFor="nombre">Nombre:</label>
              <input type="text" className="border border-gray-300 py-3 px-4 rounded-lg" id="nombre" placeholder="nombre" name="nombre" value={values.nombre} onChange={handleValues}/>
          </div>
  
  
          <div className="mb-3 flex align-middle">
              <label className="mb-2" htmlFor="descripcion">
                  Descripcion:
              </label>
              <textarea className="border border-gray-300 py-3 px-4 rounded-lg" id="descripcion" name="descripcion" value={values.descripcion} onChange={handleValues}></textarea>
  
          </div>
  

          <div className="mb-3">
              <label className="mb-2 mt-2" htmlFor="imagen">Foto</label>
              <input type="file" 
              className=""
              onChange={handleImage}/>
          </div>
  
          <button type="submit" className="bg-sky-800 px-4 py-3 text-white">{title}</button>
          </form>
      </div>
    )
  }
  
  export default FormProduct