import React, { useEffect, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import MenuIcon from '@material-ui/icons/Menu';
import { SideMenu } from './components/sidemenu';
import './App.css';
import { Carousel } from './components/carousel';
import Logo from './images/bayer.png';
import FooterLogo from './images/bayer-completo.png'; // Agrega la ruta de la imagen del logo del footer
import pba from './images/PlantaBaja/PB-AlaA.png';
import axios from 'axios';
import { Notify } from './components/notification';
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
// import { Button, Input } from '@mui/material';
import { notification } from "antd";


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
  const [carouselVisible, setCarouselVisible] = useState(true);
  const [imageSelected, setImageSelected] = useState('');
  const [imageOpacity, setImageOpacity] = useState(0); // 0: invisible, 1: visible
  const [classNameSelected, setClassNameSelected] = useState('');
  const [rightLogo, setRightLogo] = useState(false);
  const [loading, setLoading] = useState(false);

  // Esta función maneja el clic en cualquier parte de la pantalla
  const handleClick = () => {
    setCarouselVisible(false);
    // Test();
  };

  useEffect(() => {
    // Agregamos el event listener para detectar clics en cualquier parte de la pantalla
    document.addEventListener('click', handleClick);
    // document.addEventListener('click', handleClick);
    setClassNameSelected('rootContainerMapaGeneral');
    // Removemos el event listener cuando el componente se desmonta
    return () => {
      document.removeEventListener('click', handleClick);
      // handleDownloadClick();
      // document.removeEventListener('click', handleClick);
      // suscribe();
    };
  }, []);



  useEffect(() => {
    // 
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
    // Cambia la opacidad de la imagen antes de cambiar la imagen
    // setImageOpacity(0);
    const container = document.getElementById('contenedorImages');

    const nuevaRutaDeImagen = imageSelected;

    if (imageSelected?.toLowerCase().includes('mapageneral')) {
      setClassNameSelected('rootContainerMapaGeneral');
    }
    else {
      setClassNameSelected('rootContainer');
    }


    if (container !== null) {
      // alert(`url(${nuevaRutaDeImagen})`);
      // setTimeout(() => {
      //   setImageOpacity(1);

      //   setTimeout(() => {
      //     setImageOpacity(1);
      setImageOpacity(1);
      container.style.backgroundImage = `url(${nuevaRutaDeImagen})`;

      //   }, 1300);

      //   container.style.backgroundImage = `url(${pba})`;

      //   // container.style.opacity = '0'; /* Inicialmente la imagen es invisible */
      //   // container.style.transition = 'opacity 0.5s ease';
      // }, 300);


      // Luego de cambiar la imagen, establece la opacidad a 1      
    }
  };

  // const Test = async () => {
  //   try {
  //     const connection = new signalR.HubConnectionBuilder()
  //       .withUrl('https://localhost:5109/notificationHub')
  //       .configureLogging(signalR.LogLevel.Information)
  //       .build();

  //     connection.on('ReceiveNotification', (message) => {
  //       // setNotifications(prevNotifications => [...prevNotifications, message]);
  //       console.log("mensaje recibido: ", message);
  //     });

  //     await connection.start();
  //     await connection.invoke("SendNotification", "Hola como estas");
  //     // connection.start().then(() => {
  //     //     console.log('SignalR connected');
  //     // }).catch(err => console.error(err));


  //     // return () => {
  //     //     connection.stop().then(() => console.log('SignalR disconnected'));
  //     // };
  //   }
  //   catch (e) {
  //     console.log(e);
  //   }
  // }
  const [connection, setConnection] = useState(null);
  const [inputText, setInputText] = useState("");
  const [downloadFiles, setDownloadFiles] = useState(true);
  const urlBase = 'https://home.solutica.com.ar:883/MapasBack/';
  // const urlBase = 'https://localhost:5109/'; sss
  const urlBack = urlBase + 'api/';

  // con este hook instanciamos el notification-hub
  useEffect(() => {
    const connect = new HubConnectionBuilder()
      .withUrl(urlBase + "notification-hub")
      .withAutomaticReconnect()
      .build();

    setConnection(connect);
  }, []);
  //con este hook estamos a la espera de cualquier mensaje entrante
  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => {
          connection.on("ReceiveMessage", (message) => {
            notification.open({
              message: "New Notification",
              description: message,
            });

            setDownloadFiles(true);
          });
        })
        .catch((error) => console.log(error));
    }
  }, [connection]);

  useEffect(() => {
    // handleRetrieveClick();
  }, []);

  useEffect(() => {
    if (downloadFiles) {
      handleDownloadClick();
      // setDownloadFiles(false);
    }
  }, [downloadFiles])



  const handleDownloadClickWeb = async () => {
    try {
      const response = await fetch(urlBack + 'Publicity/get-all', {
        method: 'GET',
      });

      if (!response.ok) {
        console.error(`Error al descargar los archivos: ${response.statusText}`);
        return;
      }

      const fileList = await response.json();

      // Usar Promise.all para esperar que todas las descargas se completen
      await Promise.all(
        fileList.map(async (fileInfo) => {
          const fileResponse = await fetch(urlBack + `Publicity/download/${fileInfo.fileName}`);
          const blob = await fileResponse.blob();

          // Crear una URL para el blob
          const url = window.URL.createObjectURL(blob);

          // Crear un enlace temporal
          const link = document.createElement('a');
          link.href = url;
          //Para navegadores web lo siguiente funciona
          link.setAttribute('download', fileInfo.fileName);

          // Añadir el enlace al cuerpo del documento
          document.body.appendChild(link);

          // Usar la función download directamente
          link.download = fileInfo.fileName;
          link.click();

          // Limpiar el enlace después de la descarga
          document.body.removeChild(link);

          //Pruebas para descargas con el telefono el metodo de abajo funciono perfecto
          // window.location.href = urlBack + `Test/download/${fileInfo.fileName}`;

        }));
    } catch (error) {
      console.error(`Error al descargar los archivos: ${error.message}`);
    }
  };

  // const handleDownloadClick = async () => {
  //   try {
  //     const response = await fetch(urlBack + 'Test/get-all', {
  //       method: 'GET',
  //     });

  //     if (!response.ok) {
  //       console.error(`Error al descargar los archivos: ${response.statusText}`);
  //       return;
  //     }

  //     const fileList = await response.json();

  //     await Promise.all(fileList.map(async (fileInfo) => {

  //       const fileTransfer = new window.FileTransfer();

  //       const fileUrl = encodeURI(urlBack + `Test/download/${fileInfo.fileName}`);
  //       const targetPath = window.cordova.file.documentsDirectory + fileInfo.fileName;       
  //       fileTransfer.download(
  //         fileUrl,
  //         targetPath,
  //         (entry) => {
  //           // La descarga ha sido completada con éxito
  //           const msg = 'Descarga exitosa. Ruta del archivo: ' + entry.toURL();
  //           console.log(msg);
  //           notification.open({
  //             message: "Success",
  //             description: msg,
  //           });
  //         },
  //         (error) => {
  //           // Manejar errores de descarga
  //           const msg = 'Error de descarga: ' + error;
  //           console.error(msg);
  //           notification.open({
  //             message: "Error",
  //             description: msg,
  //           });
  //         },
  //         false,
  //         {
  //           headers: {
  //             // Puedes agregar headers adicionales si es necesario
  //           },
  //         }
  //       );
  //     }));

  //   } catch (error) {
  //     console.error(`Error al descargar los archivos: ${error.message}`);
  //   }
  // };

  const handleDownloadClick = async () => {
    if (window.cordova) {
      document.addEventListener('deviceready', async () => {
        try {
          console.log(`Comienzo de download`);
          const response = await fetch(urlBack + 'Publicity/get-all', {
            method: 'GET',
          });

          if (!response.ok) {
            console.log(`Error al descargar los archivos: ${response.statusText}`);
            return;
          }

          console.log(`Finalizacion de metodo GetAll de manera satisfactoria`);

          const fileList = await response.json();

          // console.log(fileList);
          // console.log(`window: ${window}`);
          // console.log(`window.cordova : ${window.cordova}`);
          // console.log(`window.cordova.file : ${window.cordova.file}`);
          // console.log(`window.cordova.file.externalRootDirectory : ${window.cordova.file.externalRootDirectory
          //   }`);

          await Promise.all(fileList.map(async (fileInfo) => {
            const fileUrl = encodeURI(urlBack + `Publicity/download/${fileInfo.fileName}`);
            const targetPath = window.cordova ? window.cordova.file.externalRootDirectory + fileInfo.fileName : '';
            // const targetPath = `/storage/emulated/0/Android/data/${fileInfo.fileName}`;
            // await console.log(`File Url: ${fileUrl}, Target Path: ${targetPath}`);
            try {
              let blob = null;
              let xhr = new XMLHttpRequest();
              xhr.open("GET", fileUrl);
              xhr.responseType = "blob";//force the HTTP response, response-type header to be blob
              xhr.onload = function () {
                blob = xhr.response;//xhr.response is now a blob object
                console.log(blob);
                const storageLocation = 'file:///storage/emulated/0/';
                // switch (window.device.platform) {
                //   case "Android":
                //     storageLocation = 'file:///storage/emulated/0/';
                //     break;
                //   case "iOS":
                //     storageLocation = window.cordova.file.documentsDirectory;
                //     break;
                // }
                const folderpath = storageLocation + "Download";
                const filename = fileInfo.fileName;
                const DataBlob = blob;
                window.resolveLocalFileSystemURL(folderpath, function (dir) {
                  // dir.getDirectory('TestFred', { create: true }, function (subDir) {
                  dir.getFile(filename, { create: true }, function (file) {
                    file.createWriter(function (fileWriter) {
                      fileWriter.write(DataBlob);
                      console.log('Download was successful');
                    }, function (err) {
                      console.log(err);
                    });
                  });

                }, function (err) {
                  console.log(err);
                  // });

                }, function (error) {
                  console.log(error);
                });
              }
              xhr.send();

              // const downloadResponse = await fetch(fileUrl);
              // const blob = await downloadResponse.blob();
              // window.resolveLocalFileSystemURL(targetPath, (dir) => {
              //   dir.createWriter((fileWriter) => {
              //     fileWriter.write(blob);
              //     const msg = 'Descarga exitosa. Ruta del archivo: ' + targetPath;
              //     console.log(msg);
              //     notification.open({
              //       message: "Success",
              //       description: msg,
              //     });
              //   }, (error) => {
              //     const msg = 'Error de escritura: ' + error;
              //     console.error(msg);
              //     notification.open({
              //       message: "Error",
              //       description: msg,
              //     });
              //   });
              // }, (error) => {
              //   const msg = 'Error al acceder al sistema de archivos: ';
              //   console.log(msg);
              //   console.log(error);
              //   notification.open({
              //     message: "Error",
              //     description: msg,
              //   });
              // });
            } catch (error) {
              const msg = 'Error de descarga: ' + error;
              console.log(msg);
              notification.open({
                message: "Error",
                description: msg,
              });
            }
          }));

        } catch (error) {
          console.error(`Error al descargar los archivos: ${error.message}`);
        }
      });
    }
  };

  const handleRetrieveClick = () => {
    if (window.cordova) {
      document.addEventListener('deviceready', async () => {
        try {
          const targetDirectory = 'file:///storage/emulated/0/Download/';
          const fileName = 'Planta-Pilar.JPG'; // Reemplaza con el nombre real del archivo que deseas recuperar

          window.resolveLocalFileSystemURL(targetDirectory, function (dirEntry) {
            // Obtener el archivo
            dirEntry.getFile(fileName, { create: false }, function (fileEntry) {
              // Obtener la URL del archivo
              const imageUrl = fileEntry.toURL();

              // Mostrar la imagen en un elemento <img>
              const imgElement = document.createElement('img');
              imgElement.src = imageUrl;

              // Añadir la imagen al DOM
              document.body.appendChild(imgElement);

              // Alternativamente, puedes usar la imagen en otras partes de tu aplicación
              // (por ejemplo, establecer la fuente de una etiqueta <img> existente)

              notification.open({
                message: "Success",
                description: 'Imagen recuperada con éxito.',
              });
            }, function (error) {
              console.error('Error al obtener el archivo:', error);
              notification.open({
                message: "Error",
                description: 'Error al obtener el archivo: ' + error,
              });
            });
          }, function (error) {
            console.error('Error al resolver el directorio de destino:', error);
            notification.open({
              message: "Error",
              description: 'Error al resolver el directorio de destino: ' + error,
            });
          });

        } catch (error) {
          console.error(`Error al recuperar el archivo: ${error.message}`);
          notification.open({
            message: "Error",
            description: 'Error al recuperar el archivo: ' + error.message,
          });
        }
      });
    }
  };

  const handleDeleteClick = () => {
    if (window.cordova) {
      document.addEventListener('deviceready', async () => {
        try {
          const targetDirectory = 'file:///storage/emulated/0/Download/';
          const fileName = 'Planta-Pilar.JPG'; // Reemplaza con el nombre real del archivo que deseas recuperar

          window.resolveLocalFileSystemURL(targetDirectory, function (dirEntry) {
            const dirReader = dirEntry.createReader();

            dirReader.readEntries(function (entries) {
              if (entries.length > 0) {
                console.log('Archivos en el directorio:');
                entries.forEach(function (entry) {
                  console.log(entry.name);
                });

                // Puedes realizar acciones adicionales con la lista de archivos aquí
                notification.open({
                  message: "Success",
                  description: 'Archivos obtenidos con éxito.',
                });
              } else {
                console.log('El directorio está vacío.');
                notification.open({
                  message: "Success",
                  description: 'El directorio está vacío.',
                });
              }
            });
              // Obtener el archivo
              // dirEntry.getFile(fileName, { create: false }, function (fileEntry) {
              //   // Eliminar el archivo
              //   fileEntry.remove(function () {
              //     console.log('Archivo eliminado con éxito.');
              //     notification.open({
              //       message: "Success",
              //       description: 'Archivo eliminado con éxito.',
              //     });
              //   }, function (error) {
              //     console.error('Error al eliminar el archivo:', error);
              //     notification.open({
              //       message: "Error",
              //       description: 'Error al eliminar el archivo: ' + error,
              //     });
              //   });
              // }, function (error) {
              //   console.error('Error al obtener el archivo:', error);
              //   notification.open({
              //     message: "Error",
              //     description: 'Error al obtener el archivo: ' + error,
              //   });
              // });
            }, function (error) {
            console.error('Error al resolver el directorio de destino:', error);
            notification.open({
              message: "Error",
              description: 'Error al resolver el directorio de destino: ' + error,
            });
          });

        } catch (error) {
          console.error(`Error al eliminar el archivo: ${error.message}`);
          notification.open({
            message: "Error",
            description: 'Error al eliminar el archivo: ' + error.message,
          });
        }
      });
    }
  };

  return (
    // <ThemeProvider theme={theme}
    // style={{ backgroundColor: 'white' }}
    // >

    <div className="container">
      {carouselVisible && (
        <div className="item-carousel">
          <Carousel style={{ zIndex: '2' }} />
        </div>
      )}
      {!carouselVisible && (
        <>
          <section className="item-0">
            {/* <div id="contenedorImages" className={`${classNameSelected} ${'show'}`}></div> */}
            {/* <div id='testigo'>
              <Button type='button' primary onClick={() => handleDeleteClick()}>Delete</Button>
            </div> */}
            <div id="contenedorImages" className='rootContainerMapaGeneral show'></div>
          </section>
          <section className='item-1'>
            <SideMenu
              isOpen={!carouselVisible}
              selectedItem={selectedItem}
              onItemSelected={handleItemSelected}
              setImageSelected={setImageSelected}// Pasamos la función que maneja la selección de elementos
              setRightLogo={setRightLogo}
            />
          </section>
        </>
      )
      }
    </div >

    // </ThemeProvider>
  );
}

export default App;
