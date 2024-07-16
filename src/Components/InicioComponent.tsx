// // src/Hooks/useInicioComponent.js
// import { useState, useEffect } from 'react';
// import ImagenCarrucel1 from '../IMG/promotional.png';
// import Martillo from '../IMG/martillo.png'
// import Taladro from '../IMG/taladro.png';

// const useInicioComponent = () => {
//     const [currentSlide, setCurrentSlide] = useState(0);
//     const [currentGroup, setCurrentGroup] = useState(0);
//     const [tipoProductos, setTipoProductos] = useState<string>('nuevos');

//     const images = [
//         {
//             src: ImagenCarrucel1,
//             title: 'Nueva colección de herramientas',
//             subtitle: 'Tendencias en 2024',
//             description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in justo.',
//             buyLink: 'https://example.com/comprar1'
//         },
//         {
//             src: ImagenCarrucel1,
//             title: 'Nueva colección de herramientas2',
//             subtitle: 'Tendencias en 2024',
//             description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in justo.',
//             buyLink: 'https://example.com/comprar1'
//         },
//         {
//             src: ImagenCarrucel1,
//             title: 'Nueva colección de herramientas3',
//             subtitle: 'Tendencias en 2024',
//             description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in justo.',
//             buyLink: 'https://example.com/comprar1'
//         },
//     ];

//     const carrucel2 = [
//         { src: Martillo, title: 'Title 1', subtitle: 'Subtitle 1', description: 'Description 1', buyLink: '#1' },
//         { src: Martillo, title: 'Title 2', subtitle: 'Subtitle 2', description: 'Description 2', buyLink: '#2' },
//         { src: Martillo, title: 'Title 3', subtitle: 'Subtitle 3', description: 'Description 3', buyLink: '#3' },
//         { src: Martillo, title: 'Title 4', subtitle: 'Subtitle 4', description: 'Description 4', buyLink: '#4' },
//         { src: Martillo, title: 'Title 5', subtitle: 'Subtitle 5', description: 'Description 5', buyLink: '#5' },
//         { src: Martillo, title: 'Title 6', subtitle: 'Subtitle 6', description: 'Description 6', buyLink: '#6' },
//         { src: Martillo, title: 'Title 7', subtitle: 'Subtitle 7', description: 'Description 7', buyLink: '#7' },
//         { src: Martillo, title: 'Title 8', subtitle: 'Subtitle 8', description: 'Description 8', buyLink: '#8' },
//         { src: Martillo, title: 'Title 9', subtitle: 'Subtitle 1', description: 'Description 1', buyLink: '#1' },
//         { src: Martillo, title: 'Title 10', subtitle: 'Subtitle 2', description: 'Description 2', buyLink: '#2' },
//         { src: Martillo, title: 'Title 11', subtitle: 'Subtitle 3', description: 'Description 3', buyLink: '#3' },
//         { src: Martillo, title: 'Title 12', subtitle: 'Subtitle 4', description: 'Description 4', buyLink: '#4' },
//         { src: Martillo, title: 'Title 13', subtitle: 'Subtitle 5', description: 'Description 5', buyLink: '#5' },
//         { src: Martillo, title: 'Title 14', subtitle: 'Subtitle 6', description: 'Description 6', buyLink: '#6' },
//         { src: Martillo, title: 'Title 15', subtitle: 'Subtitle 7', description: 'Description 7', buyLink: '#7' },
//         { src: Martillo, title: 'Title 16', subtitle: 'Subtitle 8', description: 'Description 8', buyLink: '#8' },
//     ];

//     const nextSlide = () => {
//         setCurrentSlide((prevSlide) => (prevSlide === images.length - 1 ? 0 : prevSlide + 1));
//     };

//     const nextGroup = () => {
//         setCurrentGroup((prevGroup) => (prevGroup + 4) % carrucel2.length);
//     };

//     const prevGroup = () => {
//         setCurrentGroup((prevGroup) => (prevGroup - 4 + carrucel2.length) % carrucel2.length);
//     };

//     useEffect(() => {
//         const interval = setInterval(() => {
//             nextSlide();
//         }, 6000);

//         return () => clearInterval(interval);
//     },);

//     const handleChangeTipoProductos = (tipo: string) => { // Especificamos el tipo de 'tipo' como string
//         setTipoProductos(tipo);
//     };

//     const obtenerProductosSegunTipo = () => {
//         switch (tipoProductos) {
//             case 'nuevos':
//                 return [
//                     { src: Taladro, nombre: 'Comfort Handy Craft', precio: '42.00' },
//                     { src: Taladro, nombre: 'Comfort Handy Craft', precio: '42.00' },
//                     { src: Taladro, nombre: 'Comfort Handy Craft', precio: '42.00' },
//                 ];
//             case 'masVendidos':
//                 return [
//                     { src: Taladro, nombre: 'Más vendido 1', precio: '50.00' },
//                     { src: Taladro, nombre: 'Más vendido 2', precio: '55.00' },
//                     { src: Taladro, nombre: 'Más vendido 3', precio: '60.00' },
//                 ];
//             case 'destacados':
//                 return [
//                     { src: Taladro, nombre: 'Destacado 1', precio: '70.00' },
//                     { src: Taladro, nombre: 'Destacado 2', precio: '75.00' },
//                     { src: Taladro, nombre: 'Destacado 3', precio: '80.00' },
//                 ];
//             case 'oferta':
//                 return [
//                     { src: Taladro, nombre: 'Oferta 1', precio: '30.00' },
//                     { src: Taladro, nombre: 'Oferta 2', precio: '35.00' },
//                     { src: Taladro, nombre: 'Oferta 3', precio: '40.00' },
//                 ];
//             default:
//                 return [];
//         }
//     };

    

//     return { currentSlide, images, currentGroup, carrucel2, nextGroup, prevGroup, handleChangeTipoProductos, obtenerProductosSegunTipo};
// };

// export default useInicioComponent;

import React from "react";

function nombrefuncion() {
    return (
        <div> Hola mundo</div>
    )
}

export default nombrefuncion;