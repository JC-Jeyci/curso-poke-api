import { useState, useEffect } from 'react'
import { getInfoPokemon, getPokemons } from '../api/pokeApis'
import './Pokemones.css'

function Pokemon({ id, name, img }) {
  return (
    <div className='pokemon-card'>
      <img src={img} alt={name} className='pokemon-img' />
      <p className='pokemon-titulo'>
        <span>#{id}</span>
        <span>{name}</span>
      </p>
    </div>
  )
}

export default function Pokemones() {

  const [pokemones, setPokemones] = useState([])

  const cargarPokemons = async () => {
    try {
      const dataPokemones = await getPokemons()
      const { results } = dataPokemones

      const infoPokemones = []

      for (let i in results) {
        let url = results[i].url
        const poke = await getInfoPokemon(url)
        infoPokemones.push({ id: poke.id, name: poke.name, img: poke.sprites.other["official-artwork"].front_default })
        //infoPokemones.push({ id: poke.id, name: poke.name, img: poke.sprites.other["dream_world"].front_default })
      }

      setPokemones(infoPokemones)

    } catch (error) {
      console.log(`Error al conseguir los pokemons`);
    }
  }

  useEffect(() => {
    cargarPokemons()
  }, [])

  return (
    <section className='pokemon-container'>
      {pokemones.map(pokemon => <Pokemon {...pokemon} />)}
    </section>
  )
};
