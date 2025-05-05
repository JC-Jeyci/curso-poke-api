import axios from 'axios'

// Configuración de la instancia de Axios
const api = axios.create({
    baseURL: 'https://pokeapi.co/api/v2',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getPokemons = async () => {
    const response = await api.get(`/pokemon?limit=20&offset=0`);
    return response.data;
}

export const getInfoPokemon = async (url) => {
    const response = await axios.get(`${url}`)
    return response.data;
}

