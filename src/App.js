import React, { useEffect, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import MenuIcon from '@material-ui/icons/Menu';
import { SideMenu } from './components/sidemenu';
import './App.css';
import { Carousel } from './components/carousel';
import Logo from './images/bayer.png';

const theme = createTheme({
  palette: {
    primary: {
      main: '#f4a460',
    },
    secondary: {
      main: '#d2b48c',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
});

const App = () => {
  // Estado para almacenar la imagen seleccionada
  const [selectedItem, setSelectedItem] = useState(null);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [carouselVisible, setCarouselVisible] = useState(true);
  const [imageSelected, setImageSelected] = useState('');

  // Esta función maneja el clic en cualquier parte de la pantalla
  const handleClick = () => {
    setCarouselVisible(false);
  };

  useEffect(() => {
    // Agregamos el event listener para detectar clics en cualquier parte de la pantalla
    document.addEventListener('click', handleClick);

    // Removemos el event listener cuando el componente se desmonta
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  useEffect(() => {
    // debugger;
    // if (imageSelected !== '' && imageSelected !== undefined)
      getImageForItem();
    // else
    //   setImageSelected('./images/entrada-pb-vacio.png');

  }, [imageSelected])

  // Función para manejar la selección de elementos en el SideMenu
  const handleItemSelected = (item) => {
    setSelectedItem(item); // Actualizamos el estado con el elemento seleccionado
    setCarouselVisible(true); // Mostramos el Carousel cuando se selecciona un elemento
  };

  // Ruta de la imagen correspondiente a cada elemento seleccionado
  const getImageForItem = (item) => {
    const elementos = document.getElementsByClassName('rootContainer');

    const nuevaRutaDeImagen = imageSelected;
    // debugger;
    for (let i = 0; i < elementos.length; i++) {
      elementos[i].style.backgroundImage = `url(${nuevaRutaDeImagen})`;
    }
  };

  return (
    <ThemeProvider theme={theme} style={{ backgroundColor: 'white' }}>
      <div className='navbar'>
        <Grid container style={{ height: '100%', alignItems: 'center' }}>
          <Grid item xs={6} sm={3} style={{ height: '100%' }}>
            <img src={Logo} alt="Logo" style={{ height: '80%', padding: '3%' }} />
          </Grid>
          <Grid item xs={6} sm={9} style={{ display: 'flex', justifyContent: 'flex-end', height: '100%' }}>
          </Grid>
        </Grid>
      </div>

      <Grid container style={{ height: '90vh', backgroundColor: '#f5f5f5' }}>
        <Grid item xs={9}>
          <div id='contenedorImages' className='rootContainer' style={{ width: '100%', height: '100%' }}>
          </div>
        </Grid>
        <Grid item xs={3}>
          <SideMenu
            isOpen={!carouselVisible}
            selectedItem={selectedItem}
            onItemSelected={handleItemSelected}
            setImageSelected={setImageSelected}// Pasamos la función que maneja la selección de elementos
          />
        </Grid>
        {carouselVisible && (
          <div className="">
            <Carousel style={{ zIndex: '2' }} />
          </div>
        )}
      </Grid>
    </ThemeProvider>
  );
}

export default App;
