import React, { useMemo, useState, useEffect } from 'react';
import { usePokemon } from '../context/PokemonContext';
import SearchBar from '../components/SearchBar';
import SortControls from '../components/SortControls';
import TypeFilters from '../components/TypeFilters';
import ListTile from '../components/ListTile';
import type { PokemonDetail } from '../types/pokemon';

export default function ListView() {
  const { all, loading, error, setActiveCollection } = usePokemon();

  // Search + Sort
  const [q, setQ] = useState<string>('');
  const [sortKey, setSortKey] = useState<'name' | 'base_experience'>('name');
  const [dir, setDir] = useState<'asc' | 'desc'>('asc');

  // Extra filters
  const [activeTypes, setActiveTypes] = useState<string[]>([]);
  const [minExp, setMinExp] = useState<number | ''>('');
  const [maxWeight, setMaxWeight] = useState<number | ''>('');

  // All unique types (for filter chips)
  const allTypes: string[] = useMemo(() => {
    const s = new Set<string>();
    all.forEach((p: PokemonDetail) => p.types.forEach((t) => s.add(t.type.name)));
    return Array.from(s).sort();
  }, [all]);

  const toggleType = (t: string) =>
    setActiveTypes((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));

  const filtered: PokemonDetail[] = useMemo(() => {
    const needle = q.trim().toLowerCase();

    let res = all
      // search by name
      .filter((p: PokemonDetail) => p.name.toLowerCase().includes(needle))
      // type filter (all selected types must be present)
      .filter((p: PokemonDetail) =>
        activeTypes.length === 0
          ? true
          : activeTypes.every((t) => p.types.map((tt) => tt.type.name).includes(t))
      )
      // min base exp
      .filter((p: PokemonDetail) => (minExp === '' ? true : p.base_experience >= minExp))
      // max weight
      .filter((p: PokemonDetail) => (maxWeight === '' ? true : p.weight <= maxWeight));

    // sort
    res.sort((a: PokemonDetail, b: PokemonDetail) => {
      const A = sortKey === 'name' ? a.name : a.base_experience;
      const B = sortKey === 'name' ? b.name : b.base_experience;
      const cmp = A < B ? -1 : A > B ? 1 : 0;
      return dir === 'asc' ? cmp : -cmp;
    });

    return res;
  }, [all, q, activeTypes, minExp, maxWeight, sortKey, dir]);

  // Keep collection order for DetailView prev/next cycling
  useEffect(() => {
    setActiveCollection(filtered.map((p: PokemonDetail) => p.name));
  }, [filtered, setActiveCollection]);

  if (loading) return <div className="loading">Loading Pokémon…</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div>
      <h2>List View</h2>

      {/* Bigger search bar + sort */}
      <div className="toolbar">
        <SearchBar value={q} onChange={setQ} placeholder="Search Pokémon by name…" />
        <SortControls sortKey={sortKey} setSortKey={setSortKey} dir={dir} setDir={setDir} />
      </div>

      {/* Extra filters: Type, Min Base Exp, Max Weight */}
      <div className="toolbar">
        <TypeFilters allTypes={allTypes} active={activeTypes} toggle={toggleType} />
        <div className="row">
          <label className="label">
            Min Base Exp
            <input
              className="input smallnum"
              type="number"
              min={0}
              value={minExp}
              onChange={(e) => setMinExp(e.target.value === '' ? '' : Number(e.target.value))}
            />
          </label>
          <label className="label">
            Max Weight
            <input
              className="input smallnum"
              type="number"
              min={0}
              value={maxWeight}
              onChange={(e) => setMaxWeight(e.target.value === '' ? '' : Number(e.target.value))}
            />
          </label>
        </div>
      </div>

      {/* List tiles */}
      {filtered.length === 0 ? (
        <div className="empty">No results match those filters.</div>
      ) : (
        <div className="list">
          {filtered.map((p: PokemonDetail) => (
            <ListTile key={p.name} p={p} />
          ))}
        </div>
      )}
    </div>
  );
}