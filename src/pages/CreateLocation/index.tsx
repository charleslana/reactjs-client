import React, {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {Link} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';
import {Map, TileLayer, Marker} from 'react-leaflet';
import {LeafletMouseEvent} from 'leaflet';
import api from "../../services/api";
import logo from "../../assets/logo.svg";
import './styles.css';

interface Item {
    id: number;
    title: string;
    image_url: string;
}

const CreateLocation: React.FC = () => {
    const [items, setItems] = useState<Item[]>([]);

    const [selectedMapPosition, setSelectedMapPosition] = useState<[number, number]>([0,0]);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        whatsapp: '',
        city: '',
        uf: ''
    });

    const [selectedItems, setSelectedItems] = useState<number[]>([]);

    useEffect(() => {
        api.get('items').then(response => {
            setItems(response.data);
        });
    }, []);

    function handleMapClick(event: LeafletMouseEvent): void {
        setSelectedMapPosition([
            event.latlng.lat,
            event.latlng.lng
        ]);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>){
        const {name, value} = event.target;
        setFormData({...formData, [name]: value});
    }

    function handleSelectItem(id: number) {
        const alreadySelected = selectedItems.findIndex(item => item === id);
        if(alreadySelected >= 0) {
            const filteredItems = selectedItems.filter(item => item !== id);
            setSelectedItems(filteredItems);
        }
        else {
            setSelectedItems([...selectedItems, id]);
        }
    }

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        const {name, email, whatsapp, city, uf} = formData;
        const [latitude, longitude] = selectedMapPosition;
        const items = selectedItems;

        const data = {
            name,
            email,
            whatsapp,
            city,
            uf,
            latitude,
            longitude,
            items
        };
        console.log(items);


        await api.post('locations', data);
    }

    return (
        <div id="page-create-location">
            <div className="content">
                <header>
                    <img src={logo} alt="Coleta Seletiva"/>
                    <Link to="/">
                        <FiArrowLeft />
                        Voltar para home
                    </Link>
                </header>

                <form onSubmit={handleSubmit}>
                    <h1>Cadastro do <br /> local de coleta</h1>

                    <fieldset>
                        <legend>
                            <h2>Dados</h2>
                        </legend>
                        <div className="field">
                            <label htmlFor="name">Nome da entidade</label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="field-group">
                            <div className="field">
                                <label htmlFor="email">E-mail</label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="field">
                                <label htmlFor="whatsapp">Whatsapp</label>
                                <input
                                    type="text"
                                    name="whatsapp"
                                    id="whatsapp"
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                    </fieldset>

                    <fieldset>
                        <legend>
                            <h2>Endereço</h2>
                            <span>Marque o endereço no Mapa</span>
                        </legend>
                        <Map center={[-19.8157,-43.9542]} zoom={14} onClick={handleMapClick}>
                            <TileLayer attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                       url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
                            <Marker position={selectedMapPosition} />
                        </Map>
                        <div className="field-group">
                            <div className="field">
                                <label htmlFor="city">Cidade</label>
                                <input
                                    type="text"
                                    name="city"
                                    id="city"
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="field">
                                <label htmlFor="uf">Estado</label>
                                <input
                                    type="text"
                                    name="uf"
                                    id="uf"
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                    </fieldset>

                    <fieldset>
                        <legend>
                            <h2>Itens coletados</h2>
                            <span>Você pode marcar um ou mais itens</span>
                        </legend>
                        <ul className="items-grid">
                            {items.map(item => (
                                <li
                                    key={item.id}
                                    onClick={() => handleSelectItem(item.id)}
                                    className={selectedItems.includes(item.id) ? 'selected' : ''}
                                >
                                    <img src={item.image_url} alt={item.title} />
                                </li>
                            ))}
                        </ul>
                    </fieldset>

                    <button type="submit">
                        Cadastrar local de coleta
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CreateLocation;