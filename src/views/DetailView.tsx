import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { usePokemon } from '../context/PokemonContext';
import type { PokemonDetail, PokemonTypeRef } from '../types/pokemon';

export default function DetailView() {
  const { name = '' } = useParams();
  const navigate = useNavigate();
  const { all, activeCollection } = usePokemon();

  const collection = activeCollection.length
    ? activeCollection
    : all.map((x: PokemonDetail) => x.name);

  const idx = collection.indexOf(name);
  const p = all.find((x: PokemonDetail) => x.name === name);

  const go = (step: number) => {
    if (!collection.length) return;
    const next = ((idx < 0 ? 0 : idx) + step + collection.length) % collection.length;
    navigate(`/pokemon/${collection[next]}`);
  };

  if (!p) return <div className="empty">Pokémon not found.</div>;

  const img = p.sprites.other?.home?.front_default || p.sprites.front_default;

  return (
    <div className="detail-container">
      <div className="toolbar">
        <Link to="/list" className="button">← Back</Link>
        <button className="button" onClick={() => go(-1)}>⟨ Prev</button>
        <button className="button" onClick={() => go(1)}>Next ⟩</button>
      </div>

      <div className="detail-flex">
        <img src={img ?? ''} alt={p.name} className="detail-img" />

        <div className="detail-box">
          <h2 className="detail-name">{p.name}</h2>
          <p><strong>Base Experience:</strong> {p.base_experience}</p>
          <p><strong>Height:</strong> {p.height}</p>
          <p><strong>Weight:</strong> {p.weight}</p>
          <p>
            <strong>Types:</strong>{' '}
            {p.types.map((t: PokemonTypeRef) => t.type.name).join(', ')}
          </p>
        </div>
      </div>
    </div>
  );
}