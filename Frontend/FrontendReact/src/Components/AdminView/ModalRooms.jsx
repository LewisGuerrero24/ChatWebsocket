import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const ModalRooms = ({ isOpen, onClose, title, onSubmit, room, usuariosEstudiantes, usuariosDocentes }) => {
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [adminUsers, setAdminUsers] = useState([]);
  const [authorizedUsers, setAuthorizedUsers] = useState([]);
  const sendData = new FormData();

  const initialFormData = {
    nombre: room?.name || "",
    descripcion: room?.description || "",
    UsersAdmin: room?.UsersAdmin || [],
    AuthoRizedUser: room?.AuthoRizedUser || [],
    foto: room?.photo || "",
  };

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      if (room) {
        const usersAdminParsed = room.UsersAdmin
        ? room.UsersAdmin.map(userId => ({ id: userId }))
        : [];

      const authorizedUsersParsed = room.AuthorizedUser
        ? room.AuthorizedUser.map(userId => ({ id: userId }))
        : [];
        setAdminUsers(usersAdminParsed); 
        setAuthorizedUsers(authorizedUsersParsed);

         console.log("Data: ", usersAdminParsed)

        setFormData({
          nombre: room.name,
          descripcion: room.description,
          UsersAdmin: room.UsersAdmin,
          AuthoRizedUser: room.AuthoRizedUser,
          foto: room.photo ? `http://localhost:5000${room.photo.url}` : "",
        });
        setPreview(room.photo ? `http://localhost:5000${room.photo.url}` : null);

      }
    }
  }, [isOpen, room]);

  const resetForm = () => {
    setFormData(initialFormData);
    setAdminUsers([]);
    setAuthorizedUsers([]);
    setFile(null);
    setPreview(null);
  };

  const handleAnimationEnd = () => {
    if (!isOpen) {
      setShouldRender(false);
      resetForm(); // Limpiar el formulario después de cerrar el modal
    }
  };

  const handleClose = () => {
    resetForm(); // Limpiar el formulario al cancelar
    onClose();
  };

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

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleUserSelection = (role, user) => {
    const updateSelection = (prevState, setState) => {
        
      
      const exists = prevState.some((u) => u.id === user.id);
      if (exists) {
        setState(prevState.filter((u) => u.id !== user.id));
      } else {
        setState([...prevState, user]);
      }

    };
  
    if (role === "admin") {
      updateSelection(adminUsers, setAdminUsers);
    } else if (role === "estudiante") {
      updateSelection(authorizedUsers, setAuthorizedUsers);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const updatedFormData = {
      ...formData,
      UsersAdmin: adminUsers,
      AuthoRizedUser: authorizedUsers,  
    };
  
    sendData.append("name", updatedFormData.nombre);
    sendData.append("description", updatedFormData.descripcion);
    sendData.append("UsersAdmin", JSON.stringify(updatedFormData.UsersAdmin));
    sendData.append("AuthoRizedUser", JSON.stringify(updatedFormData.AuthoRizedUser));
    sendData.append("photo", file);

    console.log("Datos Actualizados: ", updatedFormData)
  
  
    onSubmit(sendData);
    resetForm(); // Limpiar el formulario después de enviar
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
        <div className="fixed inset-0 transition-opacity" aria-hidden="true"></div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
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
                    htmlFor="descripcion"
                    className="text-gray-300 text-sm font-medium leading-tight tracking-normal"
                  >
                    Descripción
                  </label>
                  <textarea
                    id="descripcion"
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleChange}
                    className="mt-2 text-gray-200 bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 font-normal w-full h-20 flex items-center pl-3 text-sm rounded-md"
                    placeholder="Ingrese la descripción"
                  />
                </div>

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
                  <label className="text-gray-300 text-sm font-medium leading-tight tracking-normal">
                    Seleccionar Administradores
                  </label>
                  <div className="mt-2 space-y-2">
                    {usuariosDocentes.filter(u => u.rol['name'] === "docente").map((usuario) => (
                      <div key={usuario.id}>
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            className="form-checkbox text-blue-600"
                            checked={adminUsers.some((u) => u.id === usuario.id)}
                            onChange={() => handleUserSelection("admin", usuario)}
                          />
                          <span className="ml-2 text-gray-300">{usuario.name}</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-gray-300 text-sm font-medium leading-tight tracking-normal">
                    Seleccionar Estudiantes Autorizados
                  </label>
                  <div className="mt-2 space-y-2">
                    {usuariosEstudiantes.filter(u => u.rol['name'] === "estudiante").map((usuario) => (
                      <div key={usuario.id}>
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            className="form-checkbox text-blue-600"
                            checked={authorizedUsers.some((u) => u.id === usuario.id)}
                            onChange={() => handleUserSelection("estudiante", usuario)}
                          />
                          <span className="ml-2 text-gray-300">{usuario.name}</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
            <div className="bg-gray-800 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="submit"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Guardar
              </button>
              <button
                type="button"
                onClick={handleClose}
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-gray-700 text-base font-medium text-gray-300 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:w-auto sm:text-sm"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalRooms;
