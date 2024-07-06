import React, { useEffect, useState } from "react";
import tokenUtils from "../Hooks/utils";
import { useNavigate } from "react-router-dom";
import NavAdmin from "./AdminView/NavAdmin";
import logoutUsers from "../Helpers/logoutUsers";

const DashboardAdmin = () => {
  const isLoggedIn = tokenUtils.checkIfIsLoggedIn();
  const user = tokenUtils.getLoggedInUserId();
  const navigate = useNavigate();
  const [lastActive, setLastActive] = useState(new Date());



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

  return (
    <>
      {isLoggedIn && (
        <>
          <div class="bg-gray-900 min-h-screen flex items-center justify-center">
            <div class="bg-gray-800 flex-1 flex flex-col space-y-5 lg:space-y-0 lg:flex-row lg:space-x-10 max-w-6xl sm:p-6 sm:my-2 sm:mx-4 sm:rounded-2xl">
              <NavAdmin handleLogout={handleLogout} />

              <div class="flex-1 px-2 sm:px-0">
                <div class="mb-10 sm:mb-0 mt-10 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  <div class="group bg-gray-900/30 py-20 px-4 flex flex-col space-y-2 items-center cursor-pointer rounded-md hover:bg-gray-900/40 hover:smooth-hover">
                    <a
                      class="bg-gray-900/70 text-white/50 group-hover:text-white group-hover:smooth-hover flex w-20 h-20 rounded-full items-center justify-center"
                      href="#"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-10 w-10"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="1"
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                    </a>
                    <a
                      class="text-white/50 group-hover:text-white group-hover:smooth-hover text-center"
                      href="#"
                    >
                      Create group
                    </a>
                  </div>
                  <div class="relative group bg-gray-900 py-10 sm:py-20 px-4 flex flex-col space-y-2 items-center cursor-pointer rounded-md hover:bg-gray-900/80 hover:smooth-hover">
                    <img
                      class="w-20 h-20 object-cover object-center rounded-full"
                      src="https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80"
                      alt="code"
                    />
                    <h4 class="text-white text-2xl font-bold capitalize text-center">
                      Code
                    </h4>
                    <p class="text-white/50">83 members</p>
                    <p class="absolute top-2 text-white/20 inline-flex items-center text-xs">
                      43 Online{" "}
                      <span class="ml-2 w-2 h-2 block bg-green-500 rounded-full group-hover:animate-pulse"></span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default DashboardAdmin;
