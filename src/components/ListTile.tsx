import { Link } from 'react-router-dom';
import type { PokemonDetail } from '../types/pokemon';

export default function ListTile({ p }: { p: PokemonDetail }) {
  const img =
    p.sprites.other?.home?.front_default ||
    p.sprites.front_default ||
    '';

  return (
    <Link to={`/pokemon/${p.name}`} className="tile" aria-label={`Open ${p.name} details`}>
      <img className="tile-thumb" src={img ?? ''} alt={p.name} loading="lazy" />
      <div className="tile-body">
        <div className="tile-title">{p.name}</div>
        <div className="tile-sub">
          <strong>Type:</strong> {p.types.map(t => t.type.name).join(', ')} ·&nbsp;
          <strong>Base Exp:</strong> {p.base_experience} ·&nbsp;
          <strong>Weight:</strong> {p.weight}
        </div>
      </div>
      <div className="tile-chevron" aria-hidden>›</div>
    </Link>
  );
}