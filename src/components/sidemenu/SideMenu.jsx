import React, { useEffect, useState } from 'react';
import Drawer from '@mui/material/Drawer';
import SearchIcon from '@material-ui/icons/Search';
import { IconButton, List, ListItem, TextField } from '@mui/material';
// Planta Baja
import MapaGeneral from '../../images/PlantaBaja/MapaGeneral.png';
import SalaTucuman from '../../images/PlantaBaja/PB-Tucuman.png';
import SalaTucumanCopia from '../../images/PlantaBaja/PB-Tucuman-copia.png';
import SalaEntreRios from '../../images/PlantaBaja/PB-EntreRios.png';
import SalaSanJuan from '../../images/PlantaBaja/PB-SanJuan.png';
import SalaTierraDelFuego from '../../images/PlantaBaja/PB-TierraDelFuego.png';
import SalaJujuy from '../../images/PlantaBaja/PB-Jujuy.png';
import SalaMendoza from '../../images/PlantaBaja/PB-Mendoza.png';
import SalaBuenosAires from '../../images/PlantaBaja/PB-BuenosAires.png';
import SalaSalta from '../../images/PlantaBaja/PB-Salta.png';
import SalaAlgarrobo from '../../images/PlantaBaja/PB-Algarrobo.png';
import SalaOmbu from '../../images/PlantaBaja/PB-Ombu.png';
import SalaLapacho from '../../images/PlantaBaja/PB-Lapacho.png';
import SalaCipres from '../../images/PlantaBaja/PB-Cipres.png';
import SalaSauce from '../../images/PlantaBaja/PB-Sauce.png';
import SalaJacaranda from '../../images/PlantaBaja/PB-Jacaranda.png';
import SalaCeibo from '../../images/PlantaBaja/PB-Ceibo.png';
import PBAlaA from '../../images/PlantaBaja/PB-AlaA.png';
// Primer Piso
import MapaGeneralP1 from '../../images/PrimerPiso/MapaGeneralP1.png';
import SalaArrayanes from '../../images/PrimerPiso/P1-Arrayanes.png';
import SalaElPalmar from '../../images/PrimerPiso/P1-ElPalmar.png';
import SalaValleDeLaLuna from '../../images/PrimerPiso/P1-ValleDeLaLuna.png';
import SalaLosAlerces from '../../images/PrimerPiso/P1-LosAlerces.png';
import SalaCataratas from '../../images/PrimerPiso/P1-Cataratas.png';
import SalaEsterosDelIberal from '../../images/PrimerPiso/P1-EsterosDelIbera.png';
import SalaHornero from '../../images/PrimerPiso/P1-Hornero.png';
import SalaCalandria from '../../images/PrimerPiso/P1-Calandria.png';
import SalaCondor from '../../images/PrimerPiso/P1-Condor.png';
import SalaTero from '../../images/PrimerPiso/P1-Tero.png';
import SalaColibri from '../../images/PrimerPiso/P1-Colibri.png';
import SalaGorrion from '../../images/PrimerPiso/P1-Gorrion.png';


const listItemData = [
    {
        planta: 'SubSuelo',
        salas: [
            {
                text: 'Mapa General',
                image: MapaGeneral,
                selected: false
            },
            {
                text: 'Sala SS1A (1)',
                image: '',
                selected: false
            },
            {
                text: 'Sala SS2A (2)',
                image: '',
                selected: false
            },
            {
                text: 'Sala SS1B (3)',
                image: '',
                selected: false
            },
            {
                text: 'Sala SS2B (4)',
                image: '',
                selected: false
            },
        ]
    },
    {
        planta: 'Planta Baja',
        salas: [
            {
                text: 'Mapa General',
                image: MapaGeneral,
                selected: true,
                rightSide: false
            },
            {
                text: 'Sala Tucumán',
                image: SalaTucuman,
                selected: false,
                rightSide: false
            },
            {
                text: 'Sala Tucumán copia',
                image: SalaTucumanCopia,
                selected: false,
                rightSide: false
            },
            {
                text: 'Sala Entre Rios',
                image: SalaEntreRios,
                selected: false,
                rightSide: false
            },
            {
                text: 'Sala San Juan',
                image: SalaSanJuan,
                selected: false,
                rightSide: false
            },
            {
                text: 'Sala Tierra del Fuego',
                image: SalaTierraDelFuego,
                selected: false,
                rightSide: false
            },
            {
                text: 'Sala Jujuy',
                image: SalaJujuy,
                selected: false,
                rightSide: false
            },
            {
                text: 'Sala Mendoza',
                image: SalaMendoza,
                selected: false,
                rightSide: false
            },
            {
                text: 'Sala Buenos Aires',
                image: SalaBuenosAires,
                selected: false,
                rightSide: false
            },
            {
                text: 'Sala Salta',
                image: SalaSalta,
                selected: false,
                rightSide: false
            },
            {
                text: 'Sala Algarrono',
                image: SalaAlgarrobo,
                selected: false,
                rightSide: true
            },
            {
                text: 'Sala Ombú',
                image: SalaOmbu,
                selected: false,
                rightSide: true
            },
            {
                text: 'Sala Lapacho',
                image: SalaLapacho,
                selected: false,
                rightSide: true
            },
            {
                text: 'Sala Cipres',
                image: SalaCipres,
                selected: false,
                rightSide: true
            },
            {
                text: 'Sala Sauce',
                image: SalaSauce,
                selected: false,
                rightSide: true
            },
            {
                text: 'Sala Jacaranda',
                image: SalaJacaranda,
                selected: false,
                rightSide: true
            },
            {
                text: 'Sala Ceibo',
                image: SalaCeibo,
                selected: false,
                rightSide: true
            }
        ]
    },
    {
        planta: 'Primer Piso',
        salas: [

            {
                text: 'Mapa General',
                image: MapaGeneralP1,
                selected: false,
                rightSide: false
            },
            {
                text: 'Sala Arrayanes',
                image: SalaArrayanes,
                selected: false,
                rightSide: false
            },
            {
                text: 'Sala El Palmar',
                image: SalaElPalmar,
                selected: false,
                rightSide: false
            },
            {
                text: 'Sala Valle de la Luna',
                image: SalaValleDeLaLuna,
                selected: false,
                rightSide: false
            },
            {
                text: 'Sala los Alerces',
                image: SalaLosAlerces,
                selected: false,
                rightSide: false
            },
            {
                text: 'Sala Cataratas',
                image: SalaCataratas,
                selected: false,
                rightSide: false
            },
            {
                text: 'Sala Esteros del Iberá',
                image: SalaEsterosDelIberal,
                selected: false,
                rightSide: false
            },
            {
                text: 'Sala Hornero',
                image: SalaHornero,
                selected: false,
                rightSide: true
            },
            {
                text: 'Sala Calandria',
                image: SalaCalandria,
                selected: false,
                rightSide: true
            },
            {
                text: 'Sala Condor',
                image: SalaCondor,
                selected: false,
                rightSide: true
            },
            {
                text: 'Sala Tero',
                image: SalaTero,
                selected: false,
                rightSide: true
            },
            {
                text: 'Sala Colibrí',
                image: SalaColibri,
                selected: false,
                rightSide: true
            },
            {
                text: 'Sala Gorrión',
                image: SalaGorrion,
                selected: false,
                rightSide: true
            },
        ]
    }
];
export const SideMenu = ({ isOpen, onClose, children, setImageSelected, setRightLogo }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedListItemIndex, setSelectedListItemIndex] = useState(0); // Cambio aquí
    const [classNameVertical, setClassNameVertical] = useState('');
    const [classNameHorizontal, setClassNameHorizontal] = useState('');
    const [selectedItem, setSelectedItem] = useState(null);
    const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
    // Agregar estados para la búsqueda
    const [filteredListItemData, setFilteredListItemData] = useState(listItemData);
    const [selectedParentItem, setSelectedParentItem] = useState(null);
    const [desplegado, setDesplegado] = useState(false);


    useEffect(() => {
        // Utilizamos el método find para encontrar el elemento con selected: true y obtener su propiedad image
        const selectedImage = listItemData.find((planta) =>
            planta.salas.find((sala) => sala.selected)
        )?.salas.find((sala) => sala.selected);

        if (selectedImage) {
            setImagePressed(selectedImage);
        }
    }, []);

    const handleSearch = () => {
        if (searchQuery.length > 0 && searchQuery.length < 2) {
            // Si el campo de búsqueda está vacío, mostrar todos los elementos sin filtrar
            setFilteredListItemData(listItemData);
        } else {
            // Filtrar las salas en base a la búsqueda en el campo 'text'
            const filteredData = listItemData.map((item) => {
                const filteredSalas = item.salas.filter((sala) =>
                    sala.text.toLowerCase().includes(searchQuery.toLowerCase())
                );

                return {
                    ...item,
                    salas: filteredSalas,
                };
            });

            // Filtrar las plantas que tienen salas filtradas
            const filteredPlants = filteredData.filter((item) => item.salas.length > 0);

            setFilteredListItemData(filteredPlants);
        }
    };

    // Función para manejar cambios en el campo de búsqueda
    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
        handleSearch();
    };

    const handleListItemClick = (index) => { // Cambio aquí
        setSelectedListItemIndex(index);
        setIsSideMenuOpen(false);
        setClassNameVertical(listItemData[index].classNameVertical);
        setClassNameHorizontal(listItemData[index].classNameHorizontal);
    };

    const handleToggleChildren = (parentItem, item) => {
        //  
        // if (selectedParentItem === parentItem && selectedItem === item) {
        // Si el ítem hijo ya está seleccionado, lo deseleccionamos
        //     setSelectedParentItem(null);
        //     setSelectedItem(null);
        // } else {
        // Si seleccionamos un nuevo ítem, lo establecemos como ítem seleccionado
        setImagePressed(item);
        setSelectedParentItem(parentItem);
        setSelectedItem(item);

        if (item === null && selectedParentItem?.planta === parentItem?.planta) {
            //Con esto vuelvo a contraer el menu            
            setSelectedParentItem(null);
            setDesplegado(false);
        }
        else {
            setDesplegado(true);
        }
        // }
    };

    const setImagePressed = (item) => {

        if (item !== null) {
            setImageSelected(item.image);

            if (item.rightSide)
                setRightLogo(true);
            else
                setRightLogo(false);
        }
    }

    const handleOpenSideMenu = () => {
        setIsSideMenuOpen(true);
    };

    const handleCloseSideMenu = () => {
        setIsSideMenuOpen(false);
    };

    return (
        // <Drawer anchor="right" open={isOpen} onClose={onClose}>
        <div 
        // style={{ width: '280px', marginTop: '5%' }}
        >
            <div className="buscador" 
            style={{ margin: '5%' }}>
                <TextField
                    placeholder="Buscar..."
                    value={searchQuery}
                    onChange={handleInputChange}
                    variant="outlined"
                    size="small"
                    inputProps={{
                        style: { height: '98%',width: '100%' },
                    }}
                    InputProps={{
                        endAdornment: (
                            <IconButton onClick={handleSearch}>
                                <SearchIcon />
                            </IconButton>
                        ),
                    }}
                />
            </div>
            <List style={{ marginTop: '10%' }}>
                {filteredListItemData.map((parentItem, parentIndex) => (
                    <React.Fragment key={parentIndex}>
                        <ListItem
                            button
                            onClick={() => handleToggleChildren(parentItem, null)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                fontSize: '16px',
                                fontStyle: 'oblique',
                                color: '#de0043',
                                fontWeight: 'bold',
                                paddingLeft: '10px',
                                background: selectedParentItem === parentItem ? '#D7BDE2' : 'transparent',
                            }}
                        >
                            {parentItem.planta}
                            {parentItem.salas.length > 0 && (
                                <div
                                    style={{
                                        fontSize: '18px',
                                        width: '20px',
                                        textAlign: 'center',
                                        color: '#de0043',
                                        pointerEvents: 'none',
                                    }}
                                >
                                    {selectedParentItem === parentItem && desplegado ? '▼' : '▲'}
                                </div>
                            )}
                        </ListItem>
                        {selectedParentItem === parentItem && parentItem.salas.length > 0 && (
                            // <List
                            <ul
                                style={{
                                    // marginLeft: '20px',
                                    maxHeight: '60vh',
                                    overflowY: 'auto'
                                }}>
                                {/* style={{ marginLeft: '20px' }}> */}
                                {parentItem.salas.map((item, childIndex) => (
                                    // <ListItem
                                    <li
                                        key={childIndex}
                                        button
                                        onClick={() => handleToggleChildren(parentItem, item)}
                                        style={{
                                            fontSize: '15px',
                                            lineHeight: '2rem',
                                            listStyle: 'none',
                                            fontStyle: 'oblique',
                                            color: '#de0043',
                                            background: selectedItem === item ? '#ffbece' : 'transparent',
                                        }}
                                    >
                                        {item.text}
                                    </li>
                                    // </ListItem>
                                ))}
                            </ul>
                            // </List> 
                        )}
                    </React.Fragment>
                ))}
            </List>
        </div>
        // </Drawer>

    );
};
