export interface PokemonTypeRef {
  slot: number;
  type: { name: string; url: string };
}

export interface PokemonDetail {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  types: PokemonTypeRef[];
  sprites: {
    front_default: string;
    other?: { home?: { front_default: string } };
  };
}