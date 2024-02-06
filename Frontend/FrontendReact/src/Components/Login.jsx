import React, { useState } from 'react'




const Login = () => {
 // Estados para manejar los valores del formulario
 const [username, setUsername] = useState('');
 const [password, setPassword] = useState('');

 // Función para manejar el envío del formulario
 const handleSubmit = (event) => {
   event.preventDefault();
   
   console.log('Nombre de Usuario:', username);
   console.log('Contraseña:', password);
 };

  return (
    <>
    <div  className='form-login'>
    <h4>Formulario de Inicio de Sesión</h4>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre de Usuario:
          </label>
          <div>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          </div>
        
        <label>
          Contraseña:
          </label>

        <div>
        <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
         
        <button type="submit">Iniciar Sesión</button>
      </form>  
    </div>
    
    </>
  )
}

export default Login
