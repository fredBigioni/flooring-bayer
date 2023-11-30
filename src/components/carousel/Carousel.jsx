import React, { useEffect, useState, useRef } from 'react';
import { Button, Card, CardMedia, Grid, Typography } from '@mui/material';
import LeftIcon from '@material-ui/icons/ChevronLeft';
import RightIcon from '@material-ui/icons/ChevronRight';
import { notification } from "antd";

export const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalTime = 5000;
  const [videoEnded, setVideoEnded] = useState(true);
  const [imageURL, setImageURL] = useState('');
  const [allItems, setAllItems] = useState([{ id: 0, type: '', src: '', alt: '' }]);
  const [items, setItems] = useState([{ type: '', src: '', alt: '' }]);
  const videoRef = useRef(null);

  // const items = [
  //   { id: 1, src: '/rotonda.mp4', type: 'video', alt: 'Rotonda', title: 'Rotonda' },
  //   { id: 2, src: '/trabajo.mp4', type: 'video', alt: 'Trabajo', title: 'Trabajo' },
  //   { id: 3, src: '/FOTO1.jpg', type: 'image', alt: 'Planta Pilar 2', title: 'Foto Planta Pilar' },
  //   { id: 4, src: '/Planta-Zarate.mp4', type: 'video', alt: 'Planta Zarate 2', title: 'Video Planta Zarate' },
  //   { id: 5, src: '/Planta-Zarate.mp4', type: 'video', alt: 'Planta Zarate 2', title: 'Video Planta Zarate' },
  //   { id: 6, src: '/Planta-Pilar.mp4', type: 'video', alt: 'Planta Pilar', title: 'Video Planta Pilar' },
  // ];

  useEffect(() => {
    // Llama a getAllMedia y luego a transform

    // if (window.cordova) {
    getAllMedia().then((arrayObejto) => {
      console.log("Operaciones completadas, ahora se llama a transform");
      transform(arrayObejto);
    });
    // }
    // else{
    //   alert("no estoy en cordova")
    // }
    // getAllMediaImages();
  }, []);
  const urlBase = 'https://home.solutica.com.ar:883/MapasBack/';
  // const urlBase = 'https://localhost:5109/';
  const urlBack = urlBase + 'api/';

  const getAllMedia = async () => {
    return new Promise(async (resolve, reject) => {
      // document.addEventListener('deviceready', async () => {
      try {

        const response = await fetch(urlBack + 'Publicity/get-all', { method: 'GET' });


        if (!response.ok) {
          console.error(`Error al descargar los archivos: ${response.statusText}`);
          return;
        }

        const fileList = await response.json();
        let arrayObject = [];
        let i = 1;

        await Promise.all(
          fileList.map(async (fileInfo) => {
            arrayObject.push({
              id: i,
              src: fileInfo.fileName,
              type: fileInfo.contentType.includes('image') ? 'image' : 'video',
              alt: ''
            });

            i++;
          })
        );

        setAllItems(arrayObject);
        console.log(`All Items:`);
        console.log(arrayObject);

        const targetDirectory = 'file:///storage/emulated/0/Download/';

        let arrayObejto = [];

        if (window.cordova) {
          await Promise.all(
            arrayObject.map(
              async (file) =>
                new Promise((resolve, reject) => {
                  console.log(`file:`);
                  console.log(file);
                  window.resolveLocalFileSystemURL(
                    targetDirectory,
                    function (dirEntry) {
                      if (file.src !== '') {
                        dirEntry.getFile(
                          file.src,
                          { create: false },
                          function (fileEntry) {
                            const imageUrl = fileEntry.toURL();
                            console.log(`imgUrl : ${imageUrl}`);
                            arrayObejto.push({
                              idParent: file.id,
                              src: imageUrl,
                              type: file.type,
                              alt: file.alt
                            });
                            resolve();
                          },
                          function (error) {
                            console.error('Error al obtener el archivo:', error);
                            reject(error);
                          }
                        );
                      } else {
                        resolve();
                      }
                    },
                    function (error) {
                      console.error('Error al resolver el directorio de destino:', error);
                      reject(error);
                    }
                  );
                })
            )
          );

          resolve(arrayObejto); // Resuelve la promesa después de que todo está completo
        }
      } catch (error) {
        console.error(`Error al descargar los archivos: ${error.message}`);
        reject(error);
      }
      // });
    });
  };

  const transform = async (arrayObejto) => {
    console.log(`arrayObejto`);
    console.log(arrayObejto);

    setAllItems(arrayObejto);
  };

  const getAllMediaImages = async () => {
    console.log("Begin getAllMediaImages");
    // if (window.cordova) {
    console.log("Begin cordova");
    document.addEventListener('deviceready', async () => {
      try {
        // const targetDirectory = 'file:///storage/emulated/0/Download/';
        const targetDirectory = window.cordova.file.externalRootDirectory + 'Download/';
        // const fileName = 'Planta-Pilar.JPG'; // Reemplaza con el nombre real del archivo que deseas recuperar

        window.resolveLocalFileSystemURL(targetDirectory, function (dirEntry) {
          console.log(`Begin resolveLocalFileSystemURL in ${targetDirectory} `);
          const dirReader = dirEntry.createReader();
          console.log(`creation of dirReader`);
          console.log(`${dirReader}`);
          dirReader.readEntries(function (entries) {
            console.log(`begin readEntries length ${entries.length}`);
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
    // }
  };

  useEffect(() => {
    const videoElement = videoRef.current;

    const handleVideoPlay = () => {
      setVideoEnded(false);
    };

    const handleVideoEnded = () => {
      setVideoEnded(true);
    };

    const handleTimeUpdate = () => {
      if (videoElement.currentTime >= videoElement.duration - 0.1) {
        setVideoEnded(true);
      }
    };

    if (videoElement) {
      videoElement.addEventListener('play', handleVideoPlay);
      videoElement.addEventListener('ended', handleVideoEnded);
      videoElement.addEventListener('timeupdate', handleTimeUpdate);
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener('play', handleVideoPlay);
        videoElement.removeEventListener('ended', handleVideoEnded);
        videoElement.removeEventListener('timeupdate', handleTimeUpdate);
      }
    };
  }, [videoRef]);

  useEffect(() => {
    const changeSlide = () => {
      if (videoEnded) {
        setActiveIndex((prevIndex) => (prevIndex + 1) % allItems.length);
      }
    };

    const interval = setInterval(changeSlide, intervalTime);

    return () => {
      clearInterval(interval);
    };
  }, [allItems.length, intervalTime, videoEnded]);
  return (
    <>
      <div className="bodyContent">
        <Grid container justifyContent="" alignItems="center" style={{ height: '95vh', backgroundColor: 'rgb(245, 245, 245, 0.8)' }}>
          <Grid item xs={12} textAlign="center" style={{ height: '90vh' }}>
            <div className="root">
              <div className="content">
                <div>
                  <div>
                    <Card>
                      <label style={{
                        position: 'absolute', color: '#FFF', zIndex: '1',
                        fontSize: '1.5rem', left: '5%', bottom: '10%', opacity: '65%'
                      }}> Toque la pantalla para salir..</label>
                      <div className={videoEnded ? 'inactive' : 'active'}>
                        {allItems[activeIndex].type === 'image' ? (
                          <CardMedia
                            component="img"
                            alt={allItems[activeIndex].alt}
                            src={allItems[activeIndex].src}
                            title={allItems[activeIndex].title}
                            controls={false}
                            style={{ height: '95vh' }}
                            autoPlay
                            loop
                          />

                        ) : (
                          <div className="videoWrapper">
                            <video ref={videoRef} src={allItems[activeIndex].src} alt={allItems[activeIndex].alt} autoPlay muted style={{ height: '89vh' }} />
                          </div>
                        )}
                      </div>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
};
