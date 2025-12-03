import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ExplorerService {
  // Busca lista de Pokémons
  async getPokemons(limit = 20, offset = 0) {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
      return response.data;
    } catch (error) {
      console.error(error);
      return { error: 'Falha ao buscar dados na PokéAPI' };
    }
  }

  // Busca detalhes de um Pokémon específico
  async getPokemonDetails(name: string) {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const data = response.data;
      
      // Retorna apenas dados essenciais para o front
      return {
        name: data.name,
        image: data.sprites.front_default,
        height: data.height,
        weight: data.weight,
        abilities: data.abilities.map((a: any) => a.ability.name),
        types: data.types.map((t: any) => t.type.name),
      };
    } catch (error) {
      return { error: 'Pokémon não encontrado' };
    }
  }
}