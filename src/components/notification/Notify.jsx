import React, { useEffect, useState } from 'react';
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
// import { Button, Input } from '@mui/material';
import { Button, Input, notification } from "antd";

export const Notify = () => {
  const [connection, setConnection] = useState(null);
  const [inputText, setInputText] = useState("");
  const urlBase = 'https://home.solutica.com.ar:883/MapasBack/';
  // const urlBase = 'https://localhost:5109/';
  const urlBack = urlBase + 'api/';
  useEffect(() => {
    const connect = new HubConnectionBuilder()
      .withUrl(urlBase + "notification-hub")
      .withAutomaticReconnect()
      .build();

    setConnection(connect);
  }, []);

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
            handleDownloadClick();
          });
        })
        .catch((error) => console.log(error));
    }
  }, [connection]);

  const sendMessage = async () => {
    if (connection) {
      await connection.send("SendMessage", inputText);
    }
    setInputText("");
  };

  const handleDownloadClick = async () => {
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
      await Promise.all(fileList.map(async (fileInfo) => {
        const fileResponse = await fetch(urlBack + `Publicity/download/${fileInfo.fileName}`);
        const blob = await fileResponse.blob();

        // Crear una URL para el blob
        const url = window.URL.createObjectURL(blob);

        // Crear un enlace temporal
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileInfo.fileName);

        // Añadir el enlace al cuerpo del documento
        document.body.appendChild(link);

        // Usar la función download directamente
        link.download = fileInfo.fileName;
        link.click();

        // Limpiar el enlace después de la descarga
        document.body.removeChild(link);
      }));
    } catch (error) {
      console.error(`Error al descargar los archivos: ${error.message}`);
    }
  };

  return (
    <>
      <Input
        value={inputText}
        onChange={(input) => {
          setInputText(input.target.value);
        }}
      />
      <Button onClick={sendMessage} type="primary">
        Send
      </Button>
    </>
  );
};