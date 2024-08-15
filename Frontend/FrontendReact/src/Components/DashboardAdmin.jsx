import React, { useEffect, useState } from "react";
import tokenUtils from "../Hooks/utils";
import { useNavigate } from "react-router-dom";
import NavAdmin from "./AdminView/NavAdmin";
import logoutUsers from "../Helpers/logoutUsers";
import ElectionCard from "./ElectionCards";
import EstudiantesContent from "./AdminView/EstudiantesContent";
import ProfesoresContent from "./AdminView/ProfesoresContent ";
import GruposContent from "./AdminView/GruposContent";
import cantidadUsarios from "../Helpers/listadoUsers";

const DashboardAdmin = () => {
  const isLoggedIn = tokenUtils.checkIfIsLoggedIn();
  const user = tokenUtils.getLoggedInUserId();
  const navigate = useNavigate();
  const [lastActive, setLastActive] = useState(new Date());
  const [selectedCard, setSelectedCard] = useState(null);
  const [cantUser, setCantUser] = useState({});

  const fetchEstudiantes = async () => {
    try {
      const response = await cantidadUsarios();
      setCantUser(response);
      console.log(cantUser);
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    fetchEstudiantes();
  }, []);


  const handleUserChange = () => {
    fetchEstudiantes(); 
  };


  useEffect(() => {

    const interval = setInterval(() => {
      if (isLoggedIn && new Date() - lastActive >= 2 * 60 * 1000) {
        logoutUsers(setLastActive, navigate);
      }
    }, 1000);

    const handleInteraction = () => {
      setLastActive(new Date());
    };

    // Agregar listeners de eventos al document
    document.addEventListener("mousemove", handleInteraction);
    document.addEventListener("keypress", handleInteraction);

    return () => {
      clearInterval(interval);
      // Eliminar los listeners de eventos al desmontar el componente
      document.removeEventListener("mousemove", handleInteraction);
      document.removeEventListener("keypress", handleInteraction);
    };
  }, [isLoggedIn, lastActive, navigate]);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const handleLogout = () => {
    logoutUsers(setLastActive, navigate);
  };

  const usersContext = () =>{
    setSelectedCard(null);
    renderContent();
  }

  const handleCardClick = (title) => {
    setSelectedCard(title);
  };

  const renderContent = () => {
    if (selectedCard) {
      switch (selectedCard) {
        case 'Estudiantes':
          return <EstudiantesContent onUserChange={handleUserChange} />;
        case 'Profesores':
          return <ProfesoresContent onUserChange={handleUserChange} />;
        case 'Grupos':
          return <GruposContent />;
        default:
          return null;
      }
    }


    // Si no hay tarjeta seleccionada, muestra las tarjetas originales
    return (
      <div className="mb-10 sm:mb-0 mt-10 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <ElectionCard
          imgSrc="https://www.questionpro.com/blog/wp-content/uploads/2018/08/Encuestas-estudiantes.jpg"
          title="Estudiantes"
          members={cantUser.estudiante}
          onClick={handleCardClick}
        />
        <ElectionCard
          imgSrc="https://images.ecestaticos.com/Xg4lK7IufEiYj5ZH3zivHw78erk=/0x62:1251x769/1338x752/filters:fill(white):format(jpg)/f.elconfidencial.com%2Foriginal%2F47a%2Fc1d%2Ff66%2F47ac1df669dd66d669d59e33a479f6bd.jpg"
          title="Profesores"
          members={cantUser.docente}
          onClick={handleCardClick}
        />
        <ElectionCard
          imgSrc="https://edutk.imss.gob.mx/pluginfile.php/576216/course/overviewfiles/BLANKARTE_impressive_mind_blowing_professional_photograph_for_e_b2427f1c-d68a-4302-b967-ca8515e058d9.png"
          title="Grupos"
          members="0"
          onClick={handleCardClick}
        />
      </div>
    );
  };


  return (
    <>
      {isLoggedIn && (
        <>
          <div className="bg-gray-900 min-h-screen flex items-center justify-center">
            <div className="bg-gray-800 flex-1 flex flex-col space-y-5 lg:space-y-0 lg:flex-row lg:space-x-10 max-w-6xl sm:p-6 sm:my-2 sm:mx-4 sm:rounded-2xl">
              <NavAdmin handleLogout={handleLogout} userContext={usersContext}/>
              <div className="flex-1 px-2 sm:px-0">{renderContent()}</div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default DashboardAdmin;
