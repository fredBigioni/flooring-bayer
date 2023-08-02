import React, { useRef, useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import VideoIcon from '@material-ui/icons/Videocam';
import SaveIcon from '@material-ui/icons/Save';
import './App.css';

export const Camara = () => {
    const videoRef = useRef(null);
    const [capturedImagesArray, setCapturedImagesArray] = useState([]);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [error, setError] = useState(null);


    useEffect(() => {
        const getLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        setLatitude(position.coords.latitude);
                        setLongitude(position.coords.longitude);
                    },
                    (error) => {
                        setError('Error accessing geolocation: ' + error.message);
                    }
                );
            } else {
                setError('Geolocation is not supported by this browser.');
            }
        };

        getLocation();
    }, []);


    const handleCaptureImage = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            videoRef.current.srcObject = stream;
        } catch (error) {
            console.error('Error accessing the camera:', error);
        }
    };

    const handleSaveImage = () => {
        const canvas = document.createElement('canvas');
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;

        const context = canvas.getContext('2d');
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

        canvas.toBlob((blob) => {
            // Crea una URL para la imagen capturada
            const imageUrl = URL.createObjectURL(blob);
            setCapturedImagesArray((prevArray) => [...prevArray, imageUrl]);
        }, 'image/png');
    };

    return (
        <>
            <Grid item xs={12} textAlign="center" style={{ marginBottom: '16px' }}>
                <Button variant="contained" color="primary" startIcon={<VideoIcon />} onClick={handleOpenSideMenu}>
                    Abrir Menú
                </Button>
                <Button variant="contained" color="primary" startIcon={<VideoIcon />} onClick={handleCaptureImage}>
                    Abrir Camara
                </Button>
                <div>
                    {/* Mostrar las coordenadas de la geolocalización */}
                    {latitude && longitude && (
                        <p>
                            Latitud: {latitude}, Longitud: {longitude}
                        </p>
                    )}
                    {/* Mostrar mensaje de error si lo hay */}
                    {error && <p>{error}</p>}
                </div>
            </Grid>
            <Grid item xs={12} textAlign="center">
                <video ref={videoRef} autoPlay playsInline style={{ maxWidth: '100%', border: '2px solid #ccc', borderRadius: '4px' }} />
            </Grid>
            <Grid item xs={12} textAlign="center" style={{ marginTop: '16px' }}>
                <Button variant="contained" color="secondary" startIcon={<SaveIcon />} onClick={handleSaveImage}>
                    Capturar Imagen
                </Button>
            </Grid>
            {capturedImagesArray.length > 0 && (
                <Grid item xs={12} textAlign="center" style={{ marginTop: '32px' }}>
                    <h2>Imágenes capturadas:</h2>
                    <Grid container spacing={2}>
                        {capturedImagesArray.map((imageUrl, index) => (
                            <Grid item key={index}>
                                <img src={imageUrl} alt={`Captured ${index + 1}`} style={{ width: '100px', border: '2px solid #ccc', borderRadius: '4px' }} />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            )}
        </>
    )
}
