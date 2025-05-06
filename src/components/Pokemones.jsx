import usePokemones from '../hooks/usePokemones'
import Cargando from './Cargando'
import './Pokemones.css'
import InfiniteScroll from 'react-infinite-scroll-component'

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

  const { pokemones, siguientesPokemones, verMas } = usePokemones()

  return (
    <InfiniteScroll
      dataLength={pokemones.length}
      next={siguientesPokemones}
      hasMore={verMas}
      loader={<Cargando />}
      endMessage={
        <h3 className='titulo' style={{ gridColumn: '1/6' }}>llegasta al final de la lista</h3>
      }
      className='pokemon-container'
    >
      {pokemones.map(pokemon => <Pokemon {...pokemon} key={pokemon.id} />)}
    </InfiniteScroll>
  )
};
