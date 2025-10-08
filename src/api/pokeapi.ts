import axios from 'axios';
import type { PokemonDetail } from '../types/pokemon';

const API = axios.create({ baseURL: 'https://pokeapi.co/api/v2' });

export async function getPokemons(limit = 50): Promise<PokemonDetail[]> {
  const list = await API.get(`/pokemon?limit=${limit}`);
  const results = list.data.results;
  const detailed = await Promise.all(results.map((r: any) => API.get(r.url)));
  return detailed.map((d) => d.data);
}