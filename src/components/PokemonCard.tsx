import { Link } from 'react-router-dom';
import type { PokemonDetail } from '../types/pokemon';

export default function PokemonCard({ p }: { p: PokemonDetail }) {
  const img = p.sprites.other?.home?.front_default || p.sprites.front_default || '';
  return (
    <Link to={`/pokemon/${p.name}`} className="card" aria-label={`Open ${p.name} details`}>
      {img && <img src={img} alt={p.name} loading="lazy" />}
      <div className="pad">
        <div className="title">{p.name}</div>
      </div>
    </Link>
  );
}