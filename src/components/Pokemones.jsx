import usePokemones from '../hooks/usePokemones'
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

  const { pokemones, siguientesPokemones } = usePokemones()

  return (
    <section className='pokemon-container'>
      {pokemones.map(pokemon => <Pokemon {...pokemon} key={pokemon.id} />)}
      <button className='btn-buscar' onClick={siguientesPokemones}>Mostrar más pokemones</button>
    </section>
  )
};
