import React, { useMemo, useState, useEffect } from 'react';
import { usePokemon } from '../context/PokemonContext';
import TypeFilters from '../components/TypeFilters';
import PokemonCard from '../components/PokemonCard';
import type { PokemonDetail } from '../types/pokemon';

export default function GalleryView() {
  const { all, loading, error, setActiveCollection } = usePokemon();
  const [active, setActive] = useState<string[]>([]);

  // Unique type list for chips
  const allTypes: string[] = useMemo(() => {
    const s = new Set<string>();
    all.forEach((p: PokemonDetail) => p.types.forEach((t) => s.add(t.type.name)));
    return Array.from(s).sort();
  }, [all]);

  const toggle = (t: string) =>
    setActive((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));

  const filtered: PokemonDetail[] = useMemo(() => {
    if (!active.length) return all;
    return all.filter((p: PokemonDetail) =>
      active.every((t) => p.types.map((x) => x.type.name).includes(t))
    );
  }, [active, all]);

  // Keep collection order for DetailView prev/next cycling
  useEffect(() => {
    setActiveCollection(filtered.map((p: PokemonDetail) => p.name));
  }, [filtered, setActiveCollection]);

  if (loading) return <div className="loading">Loading Pokémon…</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div>
      <h2>Gallery View</h2>
      <div className="toolbar">
        <TypeFilters allTypes={allTypes} active={active} toggle={toggle} />
      </div>

      {filtered.length === 0 ? (
        <div className="empty">No Pokémon match those types.</div>
      ) : (
        <div className="grid">
          {filtered.map((p: PokemonDetail) => (
            <PokemonCard key={p.name} p={p} />
          ))}
        </div>
      )}
    </div>
  );
}