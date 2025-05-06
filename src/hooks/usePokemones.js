import { useState, useEffect } from 'react'
import { getApiPokemon, getInfoPokemon, getPokemons } from '../api/pokeApis'
const URL_DEFAULT = `https://pokeapi.co/api/v2/pokemon?limit=20&offset=0`

function usePokemones() {
    const [pokemones, setPokemones] = useState([])
    const [nextUrl, setNextUrl] = useState('')
    const [verMas, setVerMas] = useState(true)

    const cargarPokemons = async (url = URL_DEFAULT) => {
        try {

            const dataPokemones = await getApiPokemon(url)
            const { next, results } = dataPokemones

            const infoPokemones = []

            for (let i in results) {
                let url = results[i].url
                const poke = await getInfoPokemon(url)
                infoPokemones.push({ id: poke.id, name: poke.name, img: poke.sprites.other["official-artwork"].front_default || poke.sprites.front_default })
                //infoPokemones.push({ id: poke.id, name: poke.name, img: poke.sprites.other["dream_world"].front_default })
            }


            return { next, infoPokemones }

        } catch (error) {
            console.log(`Error al conseguir los pokemons`);
        }
    }

    const obtenerPokemones = async () => {
        const { next, infoPokemones } = await cargarPokemons()
        setPokemones(infoPokemones)
        setNextUrl(next)
    }

    const siguientesPokemones = async () => {
        const { next, infoPokemones } = await cargarPokemons(nextUrl)
        setPokemones(prev => [...prev, ...infoPokemones])
        next === null && setVerMas(false)
        setNextUrl(next)
    }

    useEffect(() => {
        obtenerPokemones()
    }, [])

    return { pokemones, siguientesPokemones, verMas }
}

export default usePokemones