import React, { createContext, useContext, useEffect, useState } from 'react';
import { getPokemons } from '../api/pokeapi';
import type { PokemonDetail } from '../types/pokemon';

interface Ctx {
  all: PokemonDetail[];
  loading: boolean;
  error: string | null;
  activeCollection: string[];
  setActiveCollection: React.Dispatch<React.SetStateAction<string[]>>;
}

const PokemonContext = createContext<Ctx | undefined>(undefined);

export const PokemonProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [all, setAll] = useState<PokemonDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCollection, setActiveCollection] = useState<string[]>([]);

  useEffect(() => {
    getPokemons()
      .then((data) => setAll(data))
      .catch((e) => setError(String(e)))
      .finally(() => setLoading(false));
  }, []);

  return (
    <PokemonContext.Provider value={{ all, loading, error, activeCollection, setActiveCollection }}>
      {children}
    </PokemonContext.Provider>
  );
};

export const usePokemon = () => {
  const ctx = useContext(PokemonContext);
  if (!ctx) throw new Error('usePokemon must be used within PokemonProvider');
  return ctx;
};