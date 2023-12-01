import React, { useState, useEffect } from 'react';
// import { useHistory } from 'react-router-dom';

export const InactivityRedirect = ({ getBackToCarousel }) => {
  const [inactiveTime, setInactiveTime] = useState(0);
  // const history = useHistory();

  useEffect(() => {
    // Función para manejar la inactividad
    const handleInactivity = () => {
      setInactiveTime(prevInactiveTime => prevInactiveTime + 1);

      // Redirigir a otro componente después de 30 segundos de inactividad
      if (inactiveTime > 10) {
        getBackToCarousel(true);
      }
    };

    // Configurar el temporizador para comprobar la inactividad cada segundo
    const intervalId = setInterval(handleInactivity, 1000);

    // Limpiar el temporizador al desmontar el componente
    return () => clearInterval(intervalId);
    // }, [inactiveTime, history]);
  }, [inactiveTime]);

  // Restablecer el tiempo de inactividad cuando hay actividad
  const handleActivity = () => {
    setInactiveTime(0);
  };

  useEffect(() => {
    // Configurar manejadores de eventos para cualquier actividad relevante
    const addEventListeners = () => {
      document.addEventListener('touchstart', handleActivity, false);
      document.addEventListener('touchmove', handleActivity, false);
      document.addEventListener('touchend', handleActivity, false);
      document.addEventListener('keydown', handleActivity, false);
    };

    addEventListeners();

    // Limpiar los manejadores de eventos al desmontar el componente
    return () => {
      document.removeEventListener('touchstart', handleActivity, false);
      document.removeEventListener('touchmove', handleActivity, false);
      document.removeEventListener('touchend', handleActivity, false);
      document.removeEventListener('keydown', handleActivity, false);
    };
  }, []);

  return (
    <div>
      {/* Contenido de tu componente */}
      {/* <p>Tiempo de inactividad: {inactiveTime} segundos</p> */}
    </div>
  );
};


