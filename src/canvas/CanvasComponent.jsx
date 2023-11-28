import React, { useRef, useEffect } from 'react';

const CanvasComponent = ({ alpha }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        initCanvas(ctx);
    }, [alpha]); // Vuelve a ejecutar este efecto cuando alpha cambie



    const initCanvas = (ctx) => {
        // Llama a la función para dibujar el mapa
        drawMaps(ctx);
    }


    const drawMaps = (ctx) => {
        // initialConfig(ctx, alpha);
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Limpia el lienzo antes de dibujar
        contornoYTextura(ctx);

        // alpha = ctx.globalAlpha * 0.5; // Guarda el valor actual de transparencia
        salaJujuy(ctx);
    }

    const contornoYTextura = (ctx) => {
        drawPatterns();
        // layer1/Group/Group/Group/Path // estas son las lineas que cruzan horizontal para dar textura
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(517.3, 1.0);
        ctx.lineTo(517.3, 540.0);
        ctx.lineTo(1.0, 540.0);
        ctx.lineTo(1.0, 253.0);
        ctx.lineTo(306.6, 252.7);
        ctx.lineTo(306.6, 1.8);
        ctx.lineTo(517.3, 1.0);
        ctx.closePath();
        ctx.save();
        const pattern = ctx.createPattern(document.getElementById("pattern1"), "repeat");
        ctx.transform(1.000, -0.000, -0.000, 1.000, 0.0, 0.0);
        ctx.fillStyle = pattern;
        ctx.fill();

        // layer1/Group/Group/Group/Path Esto es el contorno exterior del mapa
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(517.3, 1.0);
        ctx.lineTo(306.6, 1.8);
        ctx.lineTo(306.6, 252.7);
        ctx.lineTo(1.0, 253.0);
        ctx.lineTo(1.0, 540.0);
        ctx.lineTo(517.3, 540.0);
        ctx.lineTo(517.3, 1.0);
        ctx.closePath();
        ctx.lineWidth = 0.3;
        ctx.strokeStyle = "rgb(156, 156, 155)";
        ctx.stroke();

        // layer1/Group/Group

        // layer1/Group/Group/Group
        ctx.save();

        // layer1/Group/Group/Group/
        ctx.save();

        // layer1/Group/Group/Group
        ctx.restore();

        // layer1/Group/Group/Group/Path
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(517.3, 1.0);
        ctx.lineTo(306.6, 1.8);
        ctx.lineTo(306.6, 252.7);
        ctx.lineTo(1.0, 253.0);
        ctx.lineTo(1.0, 540.0);
        ctx.lineTo(517.3, 540.0);
        ctx.lineTo(517.3, 1.0);
        ctx.closePath();
        ctx.lineWidth = 2.0;
        ctx.strokeStyle = "rgb(156, 156, 155)";
        ctx.stroke();
    }



    const draw = (ctx) => {

        var alpha = ctx.globalAlpha;

        // layer1/Group
        ctx.save();

        // layer1/Group/Group
        ctx.save();
        ctx.globalAlpha = alpha * 0.37;

        // layer1/Group/Group/Group
        ctx.save();
        ctx.globalAlpha = alpha * 1.00;




        // // layer1/Path
        // ctx.restore();
        // ctx.restore();
        // ctx.restore();
        // ctx.beginPath();
        // ctx.moveTo(495.4, 540.0);
        // ctx.lineTo(495.4, 102.6);
        // ctx.lineWidth = 3.0;
        // ctx.strokeStyle = "rgb(237, 39, 36)";
        // ctx.stroke();
        // ctx.restore();

        // //Test
        // ctx.beginPath();
        // ctx.moveTo(295.4, 240.0);
        // ctx.lineTo(295.4, 82.6);
        // ctx.lineWidth = 3.0;
        // ctx.strokeStyle = "rgb(237, 39, 36)";
        // ctx.stroke();
        // ctx.restore();
    }

    const drawPatterns = () => {

        var pattern1 = document.getElementById("pattern1");
        var ctx1 = pattern1.getContext("2d");
        ctx1.beginPath();
        ctx1.moveTo(0.0, 79.1);
        ctx1.lineTo(79.0, 79.1);
        ctx1.lineTo(79.0, 0.0);
        ctx1.lineTo(0.0, 0.0);
        ctx1.lineTo(0.0, 79.1);
        ctx1.closePath();
        // ctx1.drawImage(document.getElementById("image1"), 0.0, 79.1);
    }

    const salaJujuy = (ctx) => {


        // layer1/Group/Path
        ctx.beginPath();
        ctx.globalAlpha = alpha;

        // ctx.moveTo(125.4, 460.9);
        // ctx.bezierCurveTo(125.9, 462.8, 128.1, 463.9, 130.4, 463.3);
        // ctx.bezierCurveTo(132.6, 462.7, 134.1, 460.8, 133.6, 458.9);
        // ctx.bezierCurveTo(133.2, 457.0, 130.9, 456.0, 128.7, 456.5);
        // ctx.bezierCurveTo(126.4, 457.1, 125.0, 459.1, 125.4, 460.9);
        // ctx.closePath();
        ctx.fillStyle = "rgb(0, 51, 153)";
        // ctx.fill();
        // ctx.lineWidth = 0.1;
        // ctx.fill();
        // ctx.strokeStyle = "rgb(0, 51, 153)";
        // ctx.stroke();
        // layer1/Group/Group

        // layer1/Group/Path // dibuja el contorno de otra de las partes (2)
        ctx.beginPath();
        ctx.moveTo(179.3, 451.6);
        ctx.bezierCurveTo(172.4, 451.6, 166.9, 446.1, 166.9, 439.3);
        ctx.bezierCurveTo(166.9, 438.5, 167.0, 437.8, 167.1, 437.2);
        ctx.lineTo(140.4, 437.2);
        ctx.lineTo(140.4, 480.5);
        ctx.lineTo(181.1, 480.5);
        ctx.lineTo(181.1, 451.4);
        ctx.bezierCurveTo(180.5, 451.5, 179.9, 451.6, 179.3, 451.6);
        ctx.closePath();
        ctx.fill();
        // ctx.strokeStyle = "rgb(198, 198, 197)";
        // ctx.stroke();

        // layer1/Group/Path 
        ctx.beginPath();
        ctx.moveTo(126.2, 437.0);
        ctx.bezierCurveTo(126.0, 437.8, 126.0, 438.6, 126.0, 439.4);
        ctx.bezierCurveTo(126.0, 446.2, 131.1, 451.8, 137.4, 451.8);
        ctx.bezierCurveTo(138.4, 451.8, 139.4, 451.6, 140.4, 451.3);
        ctx.lineTo(140.4, 480.4);
        ctx.lineTo(119.5, 480.4);
        ctx.lineTo(119.5, 437.0);
        ctx.lineTo(126.2, 437.0);
        ctx.closePath();
        ctx.lineWidth = 0.3;
        ctx.fill();
        ctx.strokeStyle = "rgb(198, 198, 197)";
        ctx.stroke();

        // layer1/Group/Path // dibuja el contorno de una de las partes de la sala (3)
        ctx.beginPath();
        ctx.moveTo(134.5, 480.5);
        ctx.bezierCurveTo(133.8, 488.5, 127.4, 494.8, 119.8, 494.8);
        ctx.bezierCurveTo(119.7, 494.8, 119.6, 494.8, 119.5, 494.8);
        ctx.lineTo(119.5, 540.9);
        ctx.lineTo(181.1, 540.9);
        ctx.lineTo(181.1, 480.5);
        ctx.lineTo(134.5, 480.5);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = "rgb(198, 198, 197)";
        ctx.stroke();
        ctx.globalAlpha = 1;

        // layer1/Group/Path
        ctx.beginPath();
        ctx.moveTo(138.1, 479.1);
        ctx.lineTo(121.9, 479.1);
        ctx.lineTo(121.9, 467.3);
        ctx.lineTo(138.1, 467.3);
        ctx.lineTo(138.1, 479.1);
        ctx.closePath();
        ctx.fillStyle = "rgb(255, 255, 255)";
        ctx.fill();
        ctx.strokeStyle = "rgb(198, 198, 197)";
        ctx.stroke();


        // layer1/Group/Group/Path //mesa redonda
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(156.3, 524.2);
        ctx.lineTo(164.8, 524.1);
        ctx.bezierCurveTo(164.9, 524.1, 165.1, 524.3, 165.1, 524.4);
        ctx.lineTo(165.1, 525.5);
        ctx.bezierCurveTo(165.1, 525.6, 165.0, 525.7, 164.8, 525.7);
        ctx.lineTo(156.3, 525.8);
        ctx.bezierCurveTo(156.2, 525.8, 156.1, 525.7, 156.1, 525.6);
        ctx.lineTo(156.1, 524.5);
        ctx.bezierCurveTo(156.1, 524.4, 156.2, 524.2, 156.3, 524.2);
        ctx.closePath();
        ctx.fillStyle = "rgb(178, 178, 178)";
        ctx.fill();
        ctx.lineWidth = 0.0;
        ctx.strokeStyle = "rgb(255, 255, 255)";
        ctx.stroke();

        // layer1/Group/Group/Path
        ctx.beginPath();
        ctx.moveTo(164.5, 522.8);
        ctx.bezierCurveTo(164.5, 522.8, 164.3, 524.0, 163.4, 524.0);
        ctx.bezierCurveTo(162.6, 524.0, 158.3, 524.1, 157.7, 524.1);
        ctx.bezierCurveTo(157.1, 524.0, 156.7, 522.9, 156.7, 522.9);
        ctx.lineTo(155.9, 518.3);
        ctx.bezierCurveTo(155.9, 518.3, 155.6, 516.8, 156.6, 516.8);
        ctx.bezierCurveTo(157.1, 516.8, 163.7, 516.7, 164.5, 516.7);
        ctx.bezierCurveTo(165.4, 516.7, 165.1, 518.4, 165.1, 518.4);
        ctx.lineTo(164.5, 522.8);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // layer1/Group/Group/Path
        ctx.beginPath();
        ctx.moveTo(155.5, 518.8);
        ctx.lineTo(156.5, 518.8);
        ctx.bezierCurveTo(156.6, 518.8, 156.8, 518.9, 156.8, 519.0);
        ctx.lineTo(156.8, 522.8);
        ctx.bezierCurveTo(156.8, 523.0, 156.7, 523.1, 156.5, 523.1);
        ctx.lineTo(155.6, 523.1);
        ctx.bezierCurveTo(155.4, 523.1, 155.3, 523.0, 155.3, 522.9);
        ctx.lineTo(155.2, 519.0);
        ctx.bezierCurveTo(155.2, 518.9, 155.4, 518.8, 155.5, 518.8);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // layer1/Group/Group/Path
        ctx.beginPath();
        ctx.moveTo(164.7, 518.7);
        ctx.lineTo(165.7, 518.6);
        ctx.bezierCurveTo(165.8, 518.6, 165.9, 518.8, 165.9, 518.9);
        ctx.lineTo(166.0, 522.7);
        ctx.bezierCurveTo(166.0, 522.9, 165.9, 523.0, 165.7, 523.0);
        ctx.lineTo(164.8, 523.0);
        ctx.bezierCurveTo(164.6, 523.0, 164.5, 522.9, 164.5, 522.7);
        ctx.lineTo(164.4, 518.9);
        ctx.bezierCurveTo(164.4, 518.8, 164.5, 518.7, 164.7, 518.7);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // layer1/Group/Group
        ctx.restore();

        // layer1/Group/Group/Path
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(156.2, 492.2);
        ctx.lineTo(164.6, 492.3);
        ctx.bezierCurveTo(164.8, 492.3, 164.9, 492.2, 164.9, 492.0);
        ctx.lineTo(164.9, 491.0);
        ctx.bezierCurveTo(164.9, 490.8, 164.8, 490.7, 164.7, 490.7);
        ctx.lineTo(156.2, 490.6);
        ctx.bezierCurveTo(156.0, 490.6, 155.9, 490.7, 155.9, 490.9);
        ctx.lineTo(155.9, 491.9);
        ctx.bezierCurveTo(155.9, 492.1, 156.0, 492.2, 156.2, 492.2);
        ctx.closePath();
        ctx.fillStyle = "rgb(178, 178, 178)";
        ctx.fill();
        ctx.lineWidth = 0.0;
        ctx.strokeStyle = "rgb(255, 255, 255)";
        ctx.stroke();

        // layer1/Group/Group/Path
        ctx.beginPath();
        ctx.moveTo(164.4, 493.6);
        ctx.bezierCurveTo(164.4, 493.6, 164.1, 492.4, 163.3, 492.4);
        ctx.bezierCurveTo(162.4, 492.4, 158.2, 492.3, 157.6, 492.4);
        ctx.bezierCurveTo(156.9, 492.4, 156.6, 493.5, 156.6, 493.5);
        ctx.lineTo(155.7, 498.1);
        ctx.bezierCurveTo(155.7, 498.1, 155.5, 499.7, 156.4, 499.7);
        ctx.bezierCurveTo(157.0, 499.7, 163.5, 499.8, 164.3, 499.8);
        ctx.bezierCurveTo(165.3, 499.8, 165.0, 498.0, 165.0, 498.0);
        ctx.lineTo(164.4, 493.6);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // layer1/Group/Group/Path
        ctx.beginPath();
        ctx.moveTo(155.4, 497.7);
        ctx.lineTo(156.3, 497.7);
        ctx.bezierCurveTo(156.5, 497.7, 156.6, 497.6, 156.6, 497.4);
        ctx.lineTo(156.6, 493.6);
        ctx.bezierCurveTo(156.6, 493.4, 156.5, 493.3, 156.4, 493.3);
        ctx.lineTo(155.4, 493.3);
        ctx.bezierCurveTo(155.3, 493.3, 155.1, 493.4, 155.1, 493.6);
        ctx.lineTo(155.1, 497.4);
        ctx.bezierCurveTo(155.1, 497.5, 155.2, 497.7, 155.4, 497.7);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // layer1/Group/Group/Path
        ctx.beginPath();
        ctx.moveTo(164.5, 497.8);
        ctx.lineTo(165.5, 497.8);
        ctx.bezierCurveTo(165.6, 497.8, 165.8, 497.7, 165.8, 497.5);
        ctx.lineTo(165.8, 493.7);
        ctx.bezierCurveTo(165.8, 493.6, 165.7, 493.4, 165.5, 493.4);
        ctx.lineTo(164.6, 493.4);
        ctx.bezierCurveTo(164.4, 493.4, 164.3, 493.5, 164.3, 493.7);
        ctx.lineTo(164.3, 497.5);
        ctx.bezierCurveTo(164.3, 497.6, 164.4, 497.8, 164.5, 497.8);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // layer1/Group/Group
        ctx.restore();

        // layer1/Group/Group/Path
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(144.3, 523.9);
        ctx.lineTo(152.8, 523.8);
        ctx.bezierCurveTo(153.0, 523.8, 153.1, 523.9, 153.1, 524.1);
        ctx.lineTo(153.1, 525.1);
        ctx.bezierCurveTo(153.1, 525.3, 153.0, 525.4, 152.8, 525.4);
        ctx.lineTo(144.4, 525.5);
        ctx.bezierCurveTo(144.2, 525.5, 144.1, 525.4, 144.1, 525.3);
        ctx.lineTo(144.1, 524.2);
        ctx.bezierCurveTo(144.1, 524.0, 144.2, 523.9, 144.3, 523.9);
        ctx.closePath();
        ctx.fillStyle = "rgb(178, 178, 178)";
        ctx.fill();
        ctx.lineWidth = 0.0;
        ctx.strokeStyle = "rgb(255, 255, 255)";
        ctx.stroke();

        // layer1/Group/Group/Path
        ctx.beginPath();
        ctx.moveTo(152.6, 522.5);
        ctx.bezierCurveTo(152.6, 522.5, 152.3, 523.7, 151.5, 523.7);
        ctx.bezierCurveTo(150.6, 523.7, 146.4, 523.8, 145.7, 523.8);
        ctx.bezierCurveTo(145.1, 523.7, 144.7, 522.6, 144.7, 522.6);
        ctx.lineTo(143.9, 518.0);
        ctx.bezierCurveTo(143.9, 518.0, 143.7, 516.4, 144.6, 516.4);
        ctx.bezierCurveTo(145.2, 516.4, 151.7, 516.4, 152.5, 516.4);
        ctx.bezierCurveTo(153.5, 516.3, 153.1, 518.1, 153.1, 518.1);
        ctx.lineTo(152.6, 522.5);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // layer1/Group/Group/Path
        ctx.beginPath();
        ctx.moveTo(143.5, 518.4);
        ctx.lineTo(144.5, 518.4);
        ctx.bezierCurveTo(144.6, 518.4, 144.8, 518.6, 144.8, 518.7);
        ctx.lineTo(144.8, 522.5);
        ctx.bezierCurveTo(144.8, 522.7, 144.7, 522.8, 144.5, 522.8);
        ctx.lineTo(143.6, 522.8);
        ctx.bezierCurveTo(143.4, 522.8, 143.3, 522.7, 143.3, 522.5);
        ctx.lineTo(143.3, 518.7);
        ctx.bezierCurveTo(143.3, 518.6, 143.4, 518.4, 143.5, 518.4);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // layer1/Group/Group/Path
        ctx.beginPath();
        ctx.moveTo(152.7, 518.3);
        ctx.lineTo(153.7, 518.3);
        ctx.bezierCurveTo(153.8, 518.3, 154.0, 518.4, 154.0, 518.6);
        ctx.lineTo(154.0, 522.4);
        ctx.bezierCurveTo(154.0, 522.6, 153.9, 522.7, 153.7, 522.7);
        ctx.lineTo(152.8, 522.7);
        ctx.bezierCurveTo(152.6, 522.7, 152.5, 522.6, 152.5, 522.4);
        ctx.lineTo(152.4, 518.6);
        ctx.bezierCurveTo(152.4, 518.5, 152.6, 518.3, 152.7, 518.3);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // layer1/Group/Group
        ctx.restore();

        // layer1/Group/Group/Path
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(144.2, 491.9);
        ctx.lineTo(152.7, 492.0);
        ctx.bezierCurveTo(152.8, 492.0, 152.9, 491.9, 152.9, 491.7);
        ctx.lineTo(152.9, 490.6);
        ctx.bezierCurveTo(152.9, 490.5, 152.8, 490.4, 152.7, 490.4);
        ctx.lineTo(144.2, 490.3);
        ctx.bezierCurveTo(144.1, 490.3, 143.9, 490.4, 143.9, 490.5);
        ctx.lineTo(143.9, 491.6);
        ctx.bezierCurveTo(143.9, 491.8, 144.0, 491.9, 144.2, 491.9);
        ctx.closePath();
        ctx.fillStyle = "rgb(178, 178, 178)";
        ctx.fill();
        ctx.lineWidth = 0.0;
        ctx.strokeStyle = "rgb(255, 255, 255)";
        ctx.stroke();

        // layer1/Group/Group/Path
        ctx.beginPath();
        ctx.moveTo(152.4, 493.3);
        ctx.bezierCurveTo(152.4, 493.3, 152.2, 492.1, 151.3, 492.1);
        ctx.bezierCurveTo(150.4, 492.1, 146.2, 492.0, 145.6, 492.0);
        ctx.bezierCurveTo(145.0, 492.1, 144.6, 493.2, 144.6, 493.2);
        ctx.lineTo(143.7, 497.8);
        ctx.bezierCurveTo(143.7, 497.8, 143.5, 499.3, 144.5, 499.3);
        ctx.bezierCurveTo(145.0, 499.4, 151.5, 499.4, 152.3, 499.4);
        ctx.bezierCurveTo(153.3, 499.4, 153.0, 497.7, 153.0, 497.7);
        ctx.lineTo(152.4, 493.3);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // layer1/Group/Group/Path
        ctx.beginPath();
        ctx.moveTo(143.4, 497.3);
        ctx.lineTo(144.3, 497.4);
        ctx.bezierCurveTo(144.5, 497.4, 144.6, 497.2, 144.6, 497.1);
        ctx.lineTo(144.7, 493.3);
        ctx.bezierCurveTo(144.7, 493.1, 144.5, 493.0, 144.4, 493.0);
        ctx.lineTo(143.4, 493.0);
        ctx.bezierCurveTo(143.3, 493.0, 143.1, 493.1, 143.1, 493.3);
        ctx.lineTo(143.1, 497.1);
        ctx.bezierCurveTo(143.1, 497.2, 143.2, 497.3, 143.4, 497.3);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // layer1/Group/Group/Path
        ctx.beginPath();
        ctx.moveTo(152.6, 497.5);
        ctx.lineTo(153.5, 497.5);
        ctx.bezierCurveTo(153.7, 497.5, 153.8, 497.3, 153.8, 497.2);
        ctx.lineTo(153.8, 493.4);
        ctx.bezierCurveTo(153.8, 493.2, 153.7, 493.1, 153.6, 493.1);
        ctx.lineTo(152.6, 493.1);
        ctx.bezierCurveTo(152.5, 493.1, 152.3, 493.2, 152.3, 493.4);
        ctx.lineTo(152.3, 497.2);
        ctx.bezierCurveTo(152.3, 497.3, 152.4, 497.5, 152.6, 497.5);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // layer1/Group/Path
        ctx.restore();
        ctx.beginPath();
        ctx.moveTo(167.1, 501.3);
        ctx.lineTo(167.1, 515.3);
        ctx.lineTo(143.5, 515.3);
        ctx.lineTo(143.5, 501.3);
        ctx.lineTo(167.1, 501.3);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();



        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.moveTo(179.3, 451.6);
        ctx.bezierCurveTo(172.4, 451.6, 166.9, 446.1, 166.9, 439.3);
        ctx.bezierCurveTo(166.9, 438.5, 167.0, 437.8, 167.1, 437.2);
        ctx.lineTo(140.4, 437.2);
        ctx.lineTo(140.4, 480.5);
        ctx.lineTo(181.1, 480.5);
        ctx.lineTo(181.1, 451.4);
        ctx.bezierCurveTo(180.5, 451.5, 179.9, 451.6, 179.3, 451.6);
        ctx.closePath();
        ctx.fillStyle = "rgb(0, 51, 153)";
        ctx.fill();

        // layer1/Group/Path
        ctx.beginPath();
        ctx.moveTo(126.2, 437.0);
        ctx.bezierCurveTo(126.0, 437.8, 126.0, 438.6, 126.0, 439.4);
        ctx.bezierCurveTo(126.0, 446.2, 131.1, 451.8, 137.4, 451.8);
        ctx.bezierCurveTo(138.4, 451.8, 139.4, 451.6, 140.4, 451.3);
        ctx.lineTo(140.4, 480.4);
        ctx.lineTo(119.5, 480.4);
        ctx.lineTo(119.5, 437.0);
        ctx.lineTo(126.2, 437.0);
        ctx.closePath();
        ctx.fill();

        // layer1/Group/Path
        ctx.beginPath();
        ctx.moveTo(134.5, 480.5);
        ctx.bezierCurveTo(133.8, 488.5, 127.4, 494.8, 119.8, 494.8);
        ctx.bezierCurveTo(119.7, 494.8, 119.6, 494.8, 119.5, 494.8);
        ctx.lineTo(119.5, 540.9);
        ctx.lineTo(181.1, 540.9);
        ctx.lineTo(181.1, 480.5);
        ctx.lineTo(134.5, 480.5);
        ctx.closePath();
        ctx.fill();
        ctx.restore();


        // layer1/Group/Group

        // layer1/Group/Group/Path
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(149.7, 475.2);
        ctx.lineTo(144.6, 468.4);
        ctx.bezierCurveTo(144.5, 468.3, 144.3, 468.3, 144.2, 468.4);
        ctx.lineTo(143.4, 469.0);
        ctx.bezierCurveTo(143.3, 469.1, 143.2, 469.3, 143.3, 469.4);
        ctx.lineTo(148.5, 476.1);
        ctx.bezierCurveTo(148.6, 476.2, 148.7, 476.3, 148.8, 476.2);
        ctx.lineTo(149.7, 475.5);
        ctx.bezierCurveTo(149.8, 475.4, 149.8, 475.3, 149.7, 475.2);
        ctx.closePath();
        ctx.fillStyle = "rgb(178, 178, 178)";
        ctx.fill();
        ctx.lineWidth = 0.0;
        ctx.strokeStyle = "rgb(255, 255, 255)";
        ctx.stroke();

        // layer1/Group/Group/Path
        ctx.beginPath();
        ctx.moveTo(145.8, 467.8);
        ctx.bezierCurveTo(145.8, 467.8, 145.0, 468.7, 145.5, 469.4);
        ctx.bezierCurveTo(146.1, 470.1, 148.6, 473.5, 149.0, 474.0);
        ctx.bezierCurveTo(149.4, 474.4, 150.5, 474.0, 150.5, 474.0);
        ctx.lineTo(154.7, 471.9);
        ctx.bezierCurveTo(154.7, 471.9, 156.0, 471.1, 155.5, 470.4);
        ctx.bezierCurveTo(155.1, 469.9, 151.1, 464.7, 150.7, 464.1);
        ctx.bezierCurveTo(150.1, 463.3, 148.9, 464.6, 148.9, 464.6);
        ctx.lineTo(145.8, 467.8);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // layer1/Group/Group/Path
        ctx.beginPath();
        ctx.moveTo(154.5, 472.4);
        ctx.lineTo(154.0, 471.7);
        ctx.bezierCurveTo(153.9, 471.5, 153.7, 471.5, 153.6, 471.6);
        ctx.lineTo(150.5, 473.9);
        ctx.bezierCurveTo(150.4, 474.0, 150.4, 474.2, 150.5, 474.3);
        ctx.lineTo(151.1, 475.1);
        ctx.bezierCurveTo(151.2, 475.2, 151.3, 475.2, 151.5, 475.1);
        ctx.lineTo(154.5, 472.8);
        ctx.bezierCurveTo(154.6, 472.7, 154.6, 472.6, 154.5, 472.4);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // layer1/Group/Group/Path
        ctx.beginPath();
        ctx.moveTo(149.0, 465.1);
        ctx.lineTo(148.4, 464.4);
        ctx.bezierCurveTo(148.3, 464.2, 148.1, 464.2, 148.0, 464.3);
        ctx.lineTo(145.0, 466.6);
        ctx.bezierCurveTo(144.8, 466.7, 144.8, 466.9, 144.9, 467.0);
        ctx.lineTo(145.5, 467.8);
        ctx.bezierCurveTo(145.6, 467.9, 145.8, 467.9, 145.9, 467.8);
        ctx.lineTo(148.9, 465.5);
        ctx.bezierCurveTo(149.0, 465.4, 149.1, 465.3, 149.0, 465.1);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // layer1/Group/Group
        ctx.restore();

        // layer1/Group/Group/Path
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(170.1, 475.9);
        ctx.lineTo(176.9, 470.8);
        ctx.bezierCurveTo(177.1, 470.7, 177.2, 470.8, 177.3, 470.9);
        ctx.lineTo(177.9, 471.8);
        ctx.bezierCurveTo(178.0, 471.9, 178.0, 472.0, 177.9, 472.1);
        ctx.lineTo(171.1, 477.2);
        ctx.bezierCurveTo(171.0, 477.2, 170.8, 477.2, 170.7, 477.1);
        ctx.lineTo(170.1, 476.2);
        ctx.bezierCurveTo(170.0, 476.1, 170.0, 476.0, 170.1, 475.9);
        ctx.closePath();
        ctx.fillStyle = "rgb(178, 178, 178)";
        ctx.fill();
        ctx.lineWidth = 0.0;
        ctx.strokeStyle = "rgb(255, 255, 255)";
        ctx.stroke();

        // layer1/Group/Group/Path
        ctx.beginPath();
        ctx.moveTo(176.0, 469.9);
        ctx.bezierCurveTo(176.0, 469.9, 176.5, 471.0, 175.8, 471.5);
        ctx.bezierCurveTo(175.1, 472.0, 171.7, 474.6, 171.2, 474.9);
        ctx.bezierCurveTo(170.6, 475.2, 169.7, 474.5, 169.7, 474.5);
        ctx.lineTo(166.3, 471.3);
        ctx.bezierCurveTo(166.3, 471.3, 165.2, 470.2, 166.0, 469.6);
        ctx.bezierCurveTo(166.4, 469.3, 171.7, 465.4, 172.3, 465.0);
        ctx.bezierCurveTo(173.1, 464.4, 173.8, 466.0, 173.8, 466.0);
        ctx.lineTo(176.0, 469.9);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // layer1/Group/Group/Path
        ctx.beginPath();
        ctx.moveTo(166.3, 471.9);
        ctx.lineTo(167.0, 471.3);
        ctx.bezierCurveTo(167.2, 471.2, 167.3, 471.3, 167.4, 471.4);
        ctx.lineTo(169.7, 474.5);
        ctx.bezierCurveTo(169.8, 474.6, 169.8, 474.8, 169.6, 474.8);
        ctx.lineTo(168.9, 475.4);
        ctx.bezierCurveTo(168.7, 475.5, 168.6, 475.5, 168.5, 475.4);
        ctx.lineTo(166.2, 472.3);
        ctx.bezierCurveTo(166.1, 472.2, 166.1, 472.0, 166.3, 471.9);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // layer1/Group/Group/Path
        ctx.beginPath();
        ctx.moveTo(173.7, 466.4);
        ctx.lineTo(174.4, 465.9);
        ctx.bezierCurveTo(174.5, 465.8, 174.7, 465.8, 174.8, 465.9);
        ctx.lineTo(177.1, 469.0);
        ctx.bezierCurveTo(177.2, 469.1, 177.1, 469.3, 177.0, 469.4);
        ctx.lineTo(176.3, 470.0);
        ctx.bezierCurveTo(176.1, 470.0, 176.0, 470.0, 175.9, 469.9);
        ctx.lineTo(173.6, 466.8);
        ctx.bezierCurveTo(173.5, 466.7, 173.5, 466.5, 173.7, 466.4);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // layer1/Group/Path
        ctx.restore();
        ctx.beginPath();
        ctx.moveTo(159.6, 468.4);
        ctx.bezierCurveTo(164.4, 468.6, 168.5, 464.9, 168.8, 460.1);
        ctx.bezierCurveTo(169.1, 455.3, 165.4, 451.2, 160.6, 450.9);
        ctx.bezierCurveTo(155.7, 450.6, 151.6, 454.3, 151.4, 459.2);
        ctx.bezierCurveTo(151.1, 464.0, 154.8, 468.1, 159.6, 468.4);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = "rgb(198, 198, 197)";
        ctx.stroke();

    }

    return (
        <div style={{position: 'fixed', top: '40px', left: '100px'}}>
            <canvas ref={canvasRef} width={800} height={900}></canvas>
        </div>
    );
};

export default CanvasComponent;
