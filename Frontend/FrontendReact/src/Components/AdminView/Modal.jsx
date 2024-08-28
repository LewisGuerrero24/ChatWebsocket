import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const Modal = ({ isOpen, onClose, title, onSubmit, usuario }) => {
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const sendData = new FormData();

  

  const initialFormData = {
    nombre: usuario?.name || "",
    email: usuario?.email || "",
    password: "",
    confirmPassword: "",
    estado: usuario
      ? usuario.suspendedAccount === 1
        ? "activo"
        : "inactivo"
      : "",
    foto: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      if (usuario) {
        setFormData({
          nombre: usuario.name,
          email: usuario.email,
          password: "",
          confirmPassword: "",
          estado: usuario.suspendedAccount === 1 ? "activo" : "inactivo",
          foto: usuario.photo ? `http://localhost:5000${usuario.photo.url}` : "",
        });
        setPreview(
          usuario.photo ? `http://localhost:5000${usuario.photo.url}` : null
        );
      }
    }
  }, [isOpen, usuario]);

  const handleAnimationEnd = () => {
    if (!isOpen) {
      setShouldRender(false);
      setFormData(initialFormData); // Limpiar el formulario solo después de la animación de salida
      
      setPreview(null);
    }
  };


  // Funcion para manejar las fotos cuando son actualizadas
  // Depurar la funcion handleChasge si no esta haciendo nada
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "foto") {
      setFormData((prevState) => ({ ...prevState, foto: files[0] }));
      handleFileChange(e);
    } else {
      setFormData((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    // Crear una vista previa de la imagen
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(selectedFile);
  };





  // Proceso interno de enviar los datos guardar 
  const handleSubmit = (e) => {
    e.preventDefault();

    if(usuario == null){
      if(formData.password !== formData.confirmPassword || 
        formData.confirmPassword == "" || 
        formData.password == "" || 
        formData.nombre == "" ||
        formData.email == "" ||
        preview == null ||
        formData.estado == ""){ 
        toast.error('Hay campos vacios o las contraseñas no coinciden', {
          position: "bottom-right",
          style: {
            background: "red",
            color: "#fff",
          },
        });
        return;
      }
    }

    if (usuario){
        if(formData.nombre == "" ||
          formData.email == "" ||
          formData.estado == "" ||
          preview == null
        ){
          toast.error('hay campos vacios', {
            position: "bottom-right",
            style: {
              background: "red",
              color: "#fff",
            },
          });
          return;
        }
    }

    const updatedFormData = {
      ...formData,
      suspendedAccount: formData.estado === "activo" ? 1 : 0,
    };
    sendData.append('name', updatedFormData.nombre)
    sendData.append('email', updatedFormData.email)
    sendData.append('password', updatedFormData.password)
    sendData.append('photo', file)
    sendData.append('suspendedAccount', updatedFormData.suspendedAccount)
    onSubmit(sendData);
  };

  if (!shouldRender) return null;

  
  return (
    <div
      className={`fixed inset-0 z-50 overflow-y-auto bg-gray-900 bg-opacity-50 ${
        isOpen ? "animate-fadeIn" : "animate-fadeOut"
      }`}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      onAnimationEnd={handleAnimationEnd}
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 transition-opacity"
          aria-hidden="true"
        ></div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div
          className={`inline-block align-bottom bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full ${
            isOpen ? "animate-slideIn" : "animate-slideOut"
          }`}
        >
          <form onSubmit={handleSubmit}>
            <div className="bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <h3
                className="text-xl leading-6 font-semibold text-gray-100 mb-4"
                id="modal-title"
              >
                {title}
              </h3>
              <div className="mt-2 space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="text-gray-300 text-sm font-medium leading-tight tracking-normal"
                  >
                    Nombre
                  </label>
                  <input
                    id="name"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    className="mt-2 text-gray-200 bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 font-normal w-full h-10 flex items-center pl-3 text-sm rounded-md"
                    placeholder="Ingrese el nombre"
                  />
                </div>


                <div>
                  <label
                    htmlFor="email"
                    className="text-gray-300 text-sm font-medium leading-tight tracking-normal"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-2 text-gray-200 bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 font-normal w-full h-10 flex items-center pl-3 text-sm rounded-md"
                    placeholder="Ingrese su correo"
                  />
                </div>

                {!usuario && (
                  <>
                    <div>
                      <label
                        htmlFor="password"
                        className="text-gray-300 text-sm font-medium leading-tight tracking-normal"
                      >
                        Contraseña
                      </label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="mt-2 text-gray-200 bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 font-normal w-full h-10 flex items-center pl-3 text-sm rounded-md"
                        placeholder="Ingrese la contraseña"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="confirmPassword"
                        className="text-gray-300 text-sm font-medium leading-tight tracking-normal"
                      >
                        Confirmar contraseña
                      </label>
                      <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="mt-2 text-gray-200 bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 font-normal w-full h-10 flex items-center pl-3 text-sm rounded-md"
                        placeholder="Confirmar la contraseña"
                      />
                    </div>
                  </>
                )}

                <div>
                  <label
                    htmlFor="photo"
                    className="text-gray-300 text-sm font-medium leading-tight tracking-normal"
                  >
                    Foto
                  </label>
                  <div className="mt-2 flex items-center">
                    <input
                      id="photo"
                      name="foto"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    <label
                      htmlFor="photo"
                      className="cursor-pointer bg-gray-700 text-gray-200 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 font-normal px-4 py-2 rounded-md text-sm transition duration-150 ease-in-out"
                    >
                      Seleccionar archivo
                    </label>

                    {preview && (
                      <div>
                        <h3>Vista previa:</h3>
                        <img
                          src={preview}
                          alt="Preview"
                          style={{ maxWidth: "200px" }}
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="estado"
                    className="text-gray-300 text-sm font-medium leading-tight tracking-normal"
                  >
                    Estado
                  </label>
                  <select
                    id="estado"
                    name="estado"
                    value={formData.estado}
                    onChange={handleChange}
                    className="mt-2 text-gray-200 bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 font-normal w-full h-10 flex items-center pl-3 pr-10 text-sm rounded-md appearance-none"
                  >
                    <option value="">Seleccione un estado</option>
                    <option value="activo">Activo</option>
                    <option value="inactivo">Inactivo</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="bg-gray-900 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="submit"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm transition duration-150 ease-in-out"
              >
                {usuario ? "Actualizar" : "Crear"}
              </button>
              <button
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-gray-700 text-base font-medium text-gray-300 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm transition duration-150 ease-in-out"
                onClick={onClose}
              >
                Cerrar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
