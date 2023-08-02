import React, { useEffect, useState } from 'react';
import Drawer from '@mui/material/Drawer';
import SearchIcon from '@material-ui/icons/Search';
import { IconButton, List, ListItem, TextField } from '@mui/material';
import MapaGeneral from '../../images/entrada-pb-vacio.png';
import SalaPB1A from '../../images/SalaPB1A.png';
import SalaPB2A from '../../images/SalaPB2A.png';
import SalaPB3A from '../../images/SalaPB3A.png';

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
                selected: true
            },
            {
                text: 'Sala PB1A (5)',
                image: SalaPB1A,
                selected: false
            },
            {
                text: 'Sala PB2A (6)',
                image: SalaPB2A,
                selected: false
            },
            {
                text: 'Sala PB3A (7)',
                image: SalaPB3A,
                selected: false
            },
            {
                text: 'Sala PB4A (8)',
                image: '',
                selected: false
            },
            {
                text: 'Sala PB1B (9)',
                image: '',
                selected: false
            },
            {
                text: 'Sala PB2B (10)',
                image: '',
                selected: false
            },
            {
                text: 'Sala PB3B (11)',
                image: '',
                selected: false
            },
            {
                text: 'Sala PB4b (12)',
                image: '',
                selected: false
            },
        ]
    },
    {
        planta: 'Primer Piso',
        salas: [

            {
                text: 'Mapa General',
                image: MapaGeneral,
                selected: false
            },
            {
                text: 'Sala PP1A (13)',
                image: '',
                selected: false
            },
            {
                text: 'Sala PP2A (14)',
                image: '',
                selected: false
            },
        ]
    }
];
export const SideMenu = ({ isOpen, onClose, children, setImageSelected }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedListItemIndex, setSelectedListItemIndex] = useState(0); // Cambio aquí
    const [classNameVertical, setClassNameVertical] = useState('');
    const [classNameHorizontal, setClassNameHorizontal] = useState('');
    const [selectedItem, setSelectedItem] = useState(null);
    const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
    // Agregar estados para la búsqueda
    const [filteredListItemData, setFilteredListItemData] = useState(listItemData);
    const [selectedParentItem, setSelectedParentItem] = useState(null);



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
        if (searchQuery === '') {
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
        // debugger;
        // if (selectedParentItem === parentItem && selectedItem === item) {
        // Si el ítem hijo ya está seleccionado, lo deseleccionamos
        //     setSelectedParentItem(null);
        //     setSelectedItem(null);
        // } else {
        // Si seleccionamos un nuevo ítem, lo establecemos como ítem seleccionado
        setImagePressed(item);
        setSelectedParentItem(parentItem);
        setSelectedItem(item);
        // }
    };

    const setImagePressed = (item) => {

        if (item !== null) {
            setImageSelected(item.image);
        }

    }

    const handleOpenSideMenu = () => {
        setIsSideMenuOpen(true);
    };

    const handleCloseSideMenu = () => {
        setIsSideMenuOpen(false);
    };

    return (
        <Drawer anchor="right" open={isOpen} onClose={onClose}>
            <div style={{ width: '255px', marginTop: '5%' }}>
                <div className="buscador" style={{ margin: '10px' }}>
                    <TextField
                        placeholder="Buscar..."
                        value={searchQuery}
                        onChange={handleInputChange}
                        variant="outlined"
                        size="small"
                        inputProps={{
                            style: { height: '100%', padding: '6px 8px' },
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
                                        ▼
                                    </div>
                                )}
                            </ListItem>
                            {selectedParentItem === parentItem && parentItem.salas.length > 0 && (
                                <List style={{ marginLeft: '20px' }}>
                                    {parentItem.salas.map((item, childIndex) => (

                                        <ListItem
                                            key={childIndex}
                                            button
                                            onClick={() => handleToggleChildren(parentItem, item)}
                                            style={{
                                                fontSize: '14px',
                                                fontStyle: 'oblique',
                                                color: '#de0043',
                                                background: selectedItem === item ? '#ffbece' : 'transparent',
                                            }}
                                        >
                                            {item.text}
                                        </ListItem>
                                    ))}
                                </List>
                            )}
                        </React.Fragment>
                    ))}
                </List>
            </div>
        </Drawer>

    );
};
